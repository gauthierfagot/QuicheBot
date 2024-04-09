const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "kick",
    description: "kick un membre",
    userPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: "target",
            description: "target à kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "raison du kick",
            type: "STRING",
            required: false
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason provided";

        if(target.roles.highest.position >= interaction.member.roles.highest.position) 
        return interaction.followUp({
            content: "Tu ne peux pas agir sur cet utilisateur car son rôle est supérieur au tien",
        });

        await target.send(`Tu as été kick par, ${interaction.guild.name}, raison: ${reason} `);

        target.kick(reason);

        interaction.followUp({ content: `Kicked ${target.user.tag} avec succès ! raison: ${reason}`,
        });
    },
};