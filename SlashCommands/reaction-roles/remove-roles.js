const rrModel = require("../../models/reactionRoles")
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "remove-role",
    description: "Remove a custom reaction role",
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
            name: "role",
            description: "Role to be removed",
            type: "ROLE",
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const role = interaction.options.getRole("role");

        const guildData = await rrModel.findOne({
            guildId: interaction.guildId
        });

        if (!guildData)
            return interaction.followUp(
                "Il n'y a pas de rôles sur ce serveur!"
            );

        const guildRoles = guildData.roles;

        const findRole = guildRoles.find((x) => x.roleId === role.id);

        if (!findRole) 
            return interaction.followUp("Ce rôle n'est pas ajouté à la liste des rôles de réaction");
        
        const filteredRoles = guildRoles.filter((x) => x.roleId !== role.id)
        guildData.roles = filteredRoles;

        await guildData.save();

        interaction.followUp(`Suppression du rôle: ${role.name}`);

    }
};
