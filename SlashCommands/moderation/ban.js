const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban un utilisateur",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "member",
            description: "Utilisateur à ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Raison du ban",
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
        const member = interaction.options.getMember("member");
        const reason = interaction.options.getString("reason") || "Aucun raison spécifiée.";

        if(member.roles.highest.position >= interaction.member.roles.highest.position) 
        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription( 
                    "Tu ne peux pas agir sur cet utilisateur car son rôle est supérieur au tien.",
        )]});

        await member.send(`Tu as été banni du serveur ***"${interaction.guild.name}"***  | |  **Raison**: \`${reason}\` `,
        );

        member.ban({reason});
        
        interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(
                    `${member} a été ban | ||${member.id}|| **Raison**: \`${reason}\``,
        )]});
    },
};