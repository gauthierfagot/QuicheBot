const Discord = require('discord.js')
const { Client, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: "8b",
    description: "8ball commande",
    options: [
        {
            name: "question",
            description: "Question à proposer",
            type: "STRING",
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
     run: async(client, interaction, args) => {

        const question = interaction.options.getString("question");

        if (!question)
        return interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setAuthor({name: `🎱 ${interaction.author.username}`})
                .setColor("#e9c5c5")
                .setDescription('Veuillez poser une question complète !')
        ]});    

        const replies = ["yes.", "Outlook seems good.", "yus", "of course.", "Yes – definitely.", "no.", "Better not tell you now.", "Outlook is not so good..", "nah", "never", "Cannot predict now.", "I dont know.", "I dont know *yet*...", "not a chance.", "I think so.", "only for today!", "not for today c:", "sadly yes..", "sadly no..", "maybe!", "ask again.. later.."];
        
        const result = Math.floor((Math.random() * replies.length));

        interaction.followUp({ 
            embeds: [new MessageEmbed()
                .setAuthor({name: `🎱 ${interaction.user.tag}`})
                .setColor("#e9c5c5")
                .addField("Question", question)
                .addField("Réponse", replies[result])
        ]});
    }
}