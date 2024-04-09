const { Client, CommandInteraction } = require("discord.js");
const warnModel = require("../../models/warnModel");

module.exports = {
    name: "warns",
    description: "warn un utilisateur",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "target",
            description: "utilisateur que tu veux warn",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "raison de ce warn", 
            type: "STRING", 
            required: true,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const user = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason");

        new warnModel({
            userId: user.id,
            guildId: interaction.guildId,
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        }).save();

        user.send(`Tu as été warn sur ${interaction.guild.name} pour ${reason}`).catch(console.log);

        interaction.followUp({ content: `${user} a été warn pour ${reason}` });
    },
};