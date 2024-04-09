const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");


module.exports = {
    name: "help",
    description: "help commande pour le bot",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const emojis = {
            info: 'ℹ️',
            moderation: '🔨',
            fun: '🎲'
        }

        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) =>
            `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name || "...",
                        description: cmd.description || "...",
                    };
                });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new MessageEmbed().setDescription(
            "Veuillez choisir une catégorie dans le menu déroulant"
        );

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder("Veuillez choisir une catégorie")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: emojis[cmd.directory.toLowerCase()] || null,
                            };
                        })
                    )
            ),
        ];

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction) => 
            interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
        });

        collector.on("collect", (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryEmbed = new MessageEmbed()
                .setTitle(`${directory} commandes`)
                .setDescription("Voici la liste des commandes")
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        };
                    })
                );

            interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on("end", () => {
            initialMessage.edit({ components: components(true) });
        });
    },
};