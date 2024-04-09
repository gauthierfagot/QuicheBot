const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = {
    name: "timeout",
    description: "timeout un membre",
    userPermissions: ["MODERATE_MEMBERS"],
    options: [
        {
            name: "member",
            description: "membre à timeout",
            type: "USER",
            required: true
        },
        {
            name: "time",
            description: "durée du timeout",
            type: "STRING",
            required: false
        },
        {
            name: "reason",
            description: "raison du timeout",
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
        const time = interaction.options.getString("time") || "14d";
        const reason = interaction.options.getString("reason") || "Aucun raison spécifiée.";
        const user = interaction.guild.members.cache.get(member.id);

        const timeInMs = ms(time);
        if (!timeInMs)
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("#e9c5c5")
                    .setDescription( 
                        "Veuillez indiquer une durée valide !",
            )]});
                
        if(member.roles.highest.position >= interaction.member.roles.highest.position) 
        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription( 
                    "Tu ne peux pas agir sur cet utilisateur car son rôle est supérieur au tien.",
        )]});

        await member.send(`Tu as été timeout pendant ${time} du serveur ***"${interaction.guild.name}"***  | |  **Raison**: \`${reason}\` `,
        );

        user.timeout(timeInMs, reason);
        interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(
                    `${member} a été timeout pendant ${time} | ||${member.id}|| **Raison**: \`${reason}\``,
        )]});
    },
};