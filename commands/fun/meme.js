const randomPuppy = require('random-puppy');
const { Client, MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "meme",
    description: "meme commande",
    /**
     * @param {Client} client
     * @param {Message} message
     */
     run: async (client, message, args) => {
        const subReddits = ["meme", "funny", "Animemes", "AnimeMemes", "GoodAnimemes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        const embed = {embeds: [new MessageEmbed()
                .setColor(`#e9c5c5`)
                .setImage(img)
                .setTitle(`Your **meme** has been granted. All the way from r/${random}`)
                .setURL(`https://www.reddit.com/r/${random}`)]};

        message.channel.send(embed)
    }
}