const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "unban",
    description: "unban un membre",
    userPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: "userid",
            description: "userid que tu veux unban",
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
        const userId = interaction.options.getString("userid");

        interaction.guild.members.unban(userId).then((user) => {
            interaction.followUp({
                content: `${user.tag} a été unban de ce serveur !`,
            });
        })
        .catch(() => {
            interaction.followUp({ 
                content: "Veuillez spécifier un id valide",
            });
        });
    },
};