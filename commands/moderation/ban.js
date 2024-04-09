const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ban",
    description: "ban un membre",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "target",
            description: "target à ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "raison du ban",
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

        await target.send(`Tu as été banni par, ${interaction.guild.name}, raison: ${reason} `);

        target.ban({reason});

        interaction.followUp({ content: `Baned ${target.user.tag} avec succès ! raison: ${reason}`,
        });
    },
};