const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");
const moment = require("moment");

module.exports = {
    name: "warnings",
    description: "Affiche tous les warn d'un utilisateur",
    options: [
        {
            name: "target",
            description: "utilisateur pour lequel tu souhaites afficher les warn",
            type: "USER",
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
        const userWarnings = await warnModel.find({
            userId: user.id,
            guildId: interaction.guildId,
        });

        if(!userWarnings?.length)
            return interaction.followUp({
                content: `${user} n'a pas de warn sur ce serveur`,
            });

            const embedDescription = userWarnings.map((warn) => {
                const moderator = interaction.guild.members.cache.get(
                    warn.moderatorId
                );
                return [
                    `warnId: ${warn._id}`,
                    `Modérateur: ${moderator || "a quitté"}`,
                    `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
                    `Raison: ${warn.reason}`,
                ].join("\n");
            })
            .join("\n\n");

        const embed = new MessageEmbed()
            .setTitle(`Warn de ${user.tag}`)
            .setDescription(embedDescription)
            .setColor("#e9c5c5");

        interaction.followUp({ embeds: [embed] });
    },
};