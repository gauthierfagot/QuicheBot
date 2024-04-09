const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick un utilisateur",
    userPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: "member",
            description: "Utilisateur à kick",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Raison du kick",
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
        const reason = interaction.options.getString("reason") || "Aucune raison spécifiée.";

        if(member.roles.highest.position >= interaction.member.roles.highest.position) 
        return interaction.followUp({
            embeds: [new MessageEmbed().setColor("#e9c5c5").setDescription( 
                "Tu ne peux pas agir sur cet utilisateur car son rôle est supérieur au tien.",
        )]});

        await member.send(`Tu as été kick du serveur ***"${interaction.guild.name}"***  | |  **Raison**: \`${reason}\` `);

        member.kick(reason);

        interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(
                    `${member} a été kick | ||${member.id}|| **Raison**: \`${reason}\``,
        )]});
    },
};