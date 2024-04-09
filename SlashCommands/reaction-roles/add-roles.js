const rrModel = require("../../models/reactionRoles")
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "add-role",
    description: "Add a custom reaction role",
    userPermissions: ['MANAGE_ROLES'],
    options: [
        {
            name: "role",
            description: "Role to be assigned",
            type: "ROLE",
            required: true
        },
        {
            name: "description",
            description: "Description of this role",
            type: "STRING",
            required: false
        },
        {
            name: "emoji",
            description: "Emoji for this role",
            type: "STRING",
            required: false
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const role = interaction.options.getRole("role");
        const roleDescription = interaction.options.getString("description") || null;
        const roleEmoji = interaction.options.getString("emoji") || null;

        if (role.position >= interaction.guild.me.roles.highest.position) 
            return interaction.followUp(
                "Je ne peux pas assigner un role qui est au dessus ou égale à moi"
        );

        const guildData = await rrModel.findOne({ guildId: interaction.guildId });

        const newRole = {
            roleId: role.id,
            roleDescription,
            roleEmoji,
        }

        if(guildData) {
            const roleData = guildData.roles.find((x) => x.roleId === role.id)

            if(roleData) {
                roleData = newRole;
            } else {
                guildData.roles = [...guildData.roles, newRole]
            }

            await guildData.save()
        } else {
            await rrModel.create({
                guildId: interaction.guildId,
                roles: newRole
            })
        }

        interaction.followUp(`Création d'un nouveau rôle: ${role.name}`)
    }
};
