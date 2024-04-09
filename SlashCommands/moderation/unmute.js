// const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

// module.exports = {
//     name: "unmute",
//     description: "Unmute l'utilisateur choisie",
//     userPermissions: ["ADMINISTRATOR"],
//     options: [
//         {
//             name: "member",
//             description: "Utilisateur à unmute",
//             type: "USER",
//             required: true,
//         },
//     ],

//     /**
//      * 
//      * @param {Client} client 
//      * @param {CommandInteraction} interaction 
//      * @param {String[]} args 
//      */
//     run: async(client, interaction, args) => {
//         const member = interaction.options.getMember("member");

//         if(!member.roles.cache.get("942558930373054504")) //Id du role Mute
//         return interaction.followUp({ 
//             embeds: [new MessageEmbed()
//                 .setColor("#e9c5c5")
//                 .setDescription(
//                     "L'utilisateur n'est pas mute.",
//         )]});
        
//         member.roles.remove("942558930373054504");

//         interaction.followUp({ 
//             embeds: [new MessageEmbed()
//                 .setColor("#e9c5c5")
//                 .setDescription(
//                     `${member} a été unmute !`,
//         )]});
//     },
// };