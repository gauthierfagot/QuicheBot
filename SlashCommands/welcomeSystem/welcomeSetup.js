const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton, Client} = require("discord.js");
const { findOneAndUpdate } = require("mongoose");

const dataBase = require("../../models/welcomeSetup.js");

module.exports = {
    name: "welcomesetup",
    description: "Setup your welcome message",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        { 
            name: "channel", 
            description: "Select the ticket creation channel", 
            required: true, 
            type: "CHANNEL" ,
            channelTypes: ["GUILD_TEXT"],
        },
        { 
            name: "role", 
            description: "Select the ticket's role", 
            required: true, 
            type: "ROLE",
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {

        const { guild, options } = interaction;

        try { 
            const Channel = options.getChannel("channel");
            const Role = options.getRole("role");

            await dataBase.findOneAndUpdate(
                { GuildID: guild.id }, 
                { 
                    Channel: Channel.id, 
                    Role: Role.id,
                },
                {
                    new: true,
                    upsert: true,
                },
            );

            const Embed = new MessageEmbed()
            .setDescription("✅ | Le welcomeSetup a été effectué avec succès.")
            .setColor("#e9c5c5")


            interaction.followUp({ embeds: [Embed] });

        } catch (err) {
            const errEmbed = new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(`⛔️ | Une erreur s'est produite lors de la mise en place de votre système de tickets.`
                );
                console.log(err)
            interaction.followUp({ embeds: [errEmbed] });
        }
    },
};