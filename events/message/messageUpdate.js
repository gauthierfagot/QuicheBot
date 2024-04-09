// const { MessageEmbed, Message, WebhookClient } = require("discord.js");

// module.exports = {
//     name: "messageUpdate",
//     /**
//      * @param {Message} oldMessage
//      * @param {Message} newMessage
//      */
//      run: async (oldMessage, newMessage) => {
//         if(oldMessage.author.bot) return;

//         if(oldMessage.content === newMessage.content) return;

//         const Count = 1950;

//         const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
//         const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");

//         const Log = new MessageEmbed()
//         .setColor('AQUA')
//         .setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n
//         **Original**:\n ${Original} \n **Edited**:\n ${Edited}`.slice("0", "4096"))
//         .setFooter(`Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`);

//         new WebhookClient({url: "https://discord.com/api/webhooks/950493206305472583/0WuBWniHUDW7p3E7Ns2X43MLOBXqF_UIcyib0jY3bOxOqVo2ox72B4kx6QCyiyKjiv_Y"}
//         ).send({embeds: [Log]}).catch((err) => console.log(err));

//     }
// }

