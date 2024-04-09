const randomPuppy = require('random-puppy');
const { Client, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: "meme",
    description: "meme commande",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        try {

            const subReddits = ["meme", "memes", "funny"]
            const random = subReddits[Math.floor(Math.random() * subReddits.length)]
    
            const img = await randomPuppy(random)
    
            interaction.followUp({ 
                embeds: [new MessageEmbed()
                    .setColor(`#e9c5c5`)
                    .setImage(img)
                    .setTitle(`Your **meme** has been granted. All the way from r/${random}`)
                    .setURL(`https://www.reddit.com/r/${random}`)
            ]});

        } catch (err) {
            const errEmbed = new MessageEmbed()
                .setColor("#e9c5c5")
                .setDescription(`⛔️ | Une erreur s'est produite.`
                );
                console.log(err)
            interaction.followUp({ embeds: [errEmbed] });
        }
    }
}