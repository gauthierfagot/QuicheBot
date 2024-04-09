const ms = require("ms");

module.exports = {
    name: "clear",
    description: "Supprime les messages",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "amount",
            description: "Quantité de mesasges à supprimer",
            type: "INTEGER",
            require: true,
        },
    ],
    run: async (client, interaction) => {
        const amount = interaction.options.getInteger("amount");

        if( amount > 100) 
            return interaction.followUp({
                content : "La quantité maximale de messages que tu peux supprimer est 100 messages",
            });
        
        const messages = await interaction.channel.messages.fetch({ 
            limit: amount + 1,
        });

        const filtered = messages.filter(
            (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
        );

        await interaction.channel.bulkDelete(filtered)

        interaction.channel.send({ 
            content: `${filtered.size - 1} messages ont été supprimés`,
        })
        .then((msg) => {
            setTimeout(() => msg.delete(), ms("5 seconds"));
        });
    },
};