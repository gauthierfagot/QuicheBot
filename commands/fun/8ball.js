const Discord = require('discord.js')
const { Client, MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "8b",
    description: "8ball commande",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args 
     */
     run: async (client, message, args) => {
        const nope = {embeds: [new MessageEmbed()
            .setAuthor(`🎱 ${message.author.username}`)
            .setColor("#e9c5c5")
            .setDescription('Veuillez poser une question complète !')]};

        if(!args[0]) return message.channel.send(nope)

        const replies = ["yes.", "Outlook seems good.", "yus", "of course.", "Yes – definitely.", "no.", "Better not tell you now.", "Outlook is not so good..", "nah", "never", "Cannot predict now.", "I dont know.", "I dont know *yet*...", "not a chance.", "I think so.", "only for today!", "not for today c:", "sadly yes..", "sadly no..", "maybe!", "ask again.. later.."];
        
        const result = Math.floor((Math.random() * replies.length));
        const question = args.slice().join(" ");

        const embed = {embeds: [new MessageEmbed()
        .setAuthor(`🎱 ${message.author.username}`)
        .setColor("#e9c5c5")
        .addField("Question", question)
        .addField("Réponse", replies[result])]};

        message.channel.send(embed)
    }
}