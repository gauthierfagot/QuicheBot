const rrModel = require("../../models/reactionRoles")
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "panel",
    description: "Reaction role panel",
    userPermissions: ['MANAGE_ROLES'],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {

        const guildData = await rrModel.findOne({
            guildId: interaction.guildId
        });

        if (!guildData?.roles.length)
            return interaction.followUp(
                "There is no roles inside of this server!"
            );
        
        const options = guildData.roles.map((x) => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDescription || "No description",
                emoji: x.roleEmoji
            };
        });

        const panelEmbed = new MessageEmbed()
            .setTitle(`Please select a role below`)
            .setColor("#e9c5c5");

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("reaction-roles")
                    .setMaxValues(1)
                    .addOptions(options)
            )
        ];
        interaction.followUp("sup")
        interaction.channel.send({ embeds: [panelEmbed], components });
    }
};
