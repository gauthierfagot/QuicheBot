const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban un utilisateur",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "userid",
            description: "Userid que tu veux unban",
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
        const userId = interaction.options.getString("userid");

        interaction.guild.members.unban(userId).then((user) => {
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("#e9c5c5")
                    .setDescription(
                        `${user.tag} a été unban de ce serveur !`,
            )]});  
        })
        .catch(() => {
            interaction.followUp({ 
                embeds: [new MessageEmbed()
                    .setColor("#e9c5c5")
                    .setDescription(
                        "Veuillez spécifier un id valide.",
            )]});  
        });
    },
};