// const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
// const ms = require("ms");

// module.exports = {
//     name: "mute",
//     description: "Mute l'utilisateur choisie",
//     userPermissions: ["MUTE_MEMBERS"],
//     options: [
//         {
//             name: "member",
//             description: "Utilisateur à mute",
//             type: "USER",
//             required: true,
//         },
//         {
//             name: "reason",
//             description: "Raison du mute",
//             type: "STRING",
//             required: false,
//         },
//         {
//             name: "preset-time",
//             description: "Fournie une heure prédéfinie",
//             type: "STRING",
//             required: false,
//             choices: [
//                 {
//                     name: "1 hour",
//                     value: "1h",
//                 },
//                 {
//                     name: "1 day",
//                     value: "1d",
//                 },
//                 {
//                     name: "5 seconds",
//                     value: "5s",
//                 },
//             ]
//         },
//         {
//             name: "custom-time",
//             description: "Fournie une heure personnalisée (1s/1h/1d)",
//             type: "STRING",
//             required: false,
//         }
//     ],

//     /**
//      * 
//      * @param {Client} client 
//      * @param {CommandInteraction} interaction 
//      * @param {String[]} args 
//      */
//     run: async(client, interaction, args) => {
//         const member = interaction.options.getMember("member");
//         const reason= interaction.options.getString("reason") || "Aucune raison spécifiée.";
//         const time = interaction.options.getString("preset-time") || interaction.options.getString("custom-time") || "14d";

//         if(!interaction.guild.roles.cache.get("942558930373054504"))//Id du role Mute
//         return interaction.followUp({ 
//             embeds: [new MessageEmbed()
//                 .setColor("#e9c5c5")
//                 .setDescription(
//                     "Le role mute n'existe pas.",
//         )]});
        
//         await member.roles.add("942558930373054504")
//         setTimeout(async () => {
//             if(!member.roles.cache.has("942558930373054504")) return;
//             await member.roles.remove("942558930373054504")
//         }, (ms(time)))

//         interaction.followUp({ 
//             embeds: [new MessageEmbed()
//                 .setColor("#e9c5c5")
//                 .setDescription(
//                     `${member} a été mute pour ${time} | ||${member.id}|| raison: \`${reason}\``, 
//         )]});
//     },
// };