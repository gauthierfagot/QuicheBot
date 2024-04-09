const { Client, CommandInteraction } = require("discord.js");
const warnModel = require("../../models/warnModel");

module.exports = {
    name: "remove-warn",
    description: "supprime un warn utilisant une id",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "warnid",
            description: "warnId que tu veux supprimer",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const warnId = interaction.options.getString("warnid");

        const data = await warnModel.findById(warnId);

        if(!data) 
            return interaction.followUp({ 
                content: `${warnId} ce n'est pas une valide id !`,
            });

        data.delete();

        const user = interaction.guild.members.cache.get(data.userId);
        return interaction.followUp({ content: `Vous avez supprimé 1 des warn de ${user}`});
    },
};