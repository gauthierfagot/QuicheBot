const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");

module.exports = {
    name: "remove-warn",
    description: "Supprime un warn par id",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "warnid",
            description: "WarnId que tu veux supprimer",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const warnId = interaction.options.getString("warnid");

        const data = await warnModel.findById(warnId);

        if(!data) 
            return interaction.followUp({ 
                embeds: [new MessageEmbed()
                    .setColor("#e9c5c5")
                    .setDescription(
                        `${warnId} ce n'est pas une valide id !`,
            )]});

        data.delete();

        const user = interaction.guild.members.cache.get(data.userId);
        return interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(`Vous avez supprimé 1 des warn de ${user}`)
        ]});
    },
};
