const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");

module.exports = {
    name: "warn",
    description: "warn un utilisateur",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "member",
            description: "Utilisateur que tu veux warn",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Raison de ce warn", 
            type: "STRING", 
            required: true,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser("member");
        const reason = interaction.options.getString("reason");

        new warnModel({
            userId: user.id,
            guildId: interaction.guildId,
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        }).save();

        user.send(`Tu as été warn sur le serveur ***${interaction.guild.name}***  | |  **Raison**: \`${reason}\` `).catch(console.log);

        interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(
                    `${user} a été warn   | |  **Raison**: \`${reason}\` `,
        )]});  
    },
};