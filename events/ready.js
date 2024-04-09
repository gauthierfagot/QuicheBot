const client = require("../index");
const welcome = require("./member/guildMemberAdd.js");

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`);
    client.user.setActivity("Ma bitch aime la quiche", {type: "LISTENING"})

    welcome(client);
});


// const client = require("../../index.js");
// const { COLOR, GUILDID } = require("../../config.js");
// const { MessageEmbed } = require("discord.js");

// module.exports = async (client, message) => {
//     const serverOne = client.guilds.cache.get(GUILDID);
//     let fetched = serverOne.roles.cache.get('970379120758382612').members.map(m => m.user)
//     const channelOne = serverOne.channels.cache.get("970375075444449280");
//     const mess = await channelOne.send({
//         embeds: [
//             new MessageEmbed()
//                 .setColor(COLOR)
//                 .setAuthor(
//                     `🔹｜Membres: `)
//                 .setDescription(fetched.join("\n"))
//         ],
//     })
//     setInterval(() => {
//         let fetched = serverOne.roles.cache.get('970379120758382612').members.map(m => m.user)
//         mess.edit({
//             embeds: [
//                 new MessageEmbed()
//                     .setColor(COLOR)
//                     .setAuthor(
//                         `🔹｜Membres: `)
//                     .setDescription(fetched.join("\n"))
//             ],
//         })
//     }, 10000);
// };

