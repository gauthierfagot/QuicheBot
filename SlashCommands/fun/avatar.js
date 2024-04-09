const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Affiche l'avatar de l'utilisateur choisie",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "member",
            description: "Utilisateur",
            type: "USER",
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const member = interaction.options.getMember("member");

        interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setColor(`#e9c5c5`)
                .setAuthor({ name: `Avatar de ${member.user.tag}`})
                .setImage(member.displayAvatarURL({dynamic: true}))
                .setFooter({ text: `Demandé Par ${interaction.user.tag}`})
        ]});
    },
};
