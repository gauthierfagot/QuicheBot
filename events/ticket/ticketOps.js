const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const dataBase = require("../../models/ticketModel");
const ticketSetupData = require("../../models/ticketSetup");
const client = require("../../index");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    const { guild, channel, customId, member } = interaction;

    if(!["close", "lock", "unlock"].includes(customId)) return;
    
    const ticketSetup = await ticketSetupData.findOne({GuildID: guild.id});
    if(!ticketSetup) return interaction.reply({content: "The data for this system is outdated"});

    if(!member.roles.cache.find((r) => r.id === ticketSetup.Handlers)) 
        return interaction.reply({ content: "You cannot use these buttons."});

    const Embed = new MessageEmbed()
        .setColor("#e9c5c5");

    dataBase.findOne({ ChannelID: channel.id }, async(err, docs) => {
        if(err) throw err;
        if(!docs) 
            return interaction.reply({
                content: "No data was found related to this ticket, please delete manual.",
                ephemeral: true,
            });
        switch(customId) {
            case "lock":
                if(docs.Locked == true)
                    return interaction.reply({ 
                        content: "The ticket is already locked",
                        ephemeral: true,
                    });
                await dataBase.updateOne({ ChannelID: channel.id }, { Locked: true });
                Embed.setDescription("🔒 | This ticket is now locked for reviewing.");

                docs.MemberID.forEach((m) => {
                    channel.permissionOverwrites.edit(m, {
                        SEND_MESSAGES: false,
                    });
                });

                interaction.reply({ embeds: [Embed] });
                break;
            case "unlock":
                if(docs.Locked == false)
                    return interaction.reply({ 
                        content: "The ticket is already unlocked",
                        ephemeral: true,
                    });
                await dataBase.updateOne({ ChannelID: channel.id }, { Locked: false });
                Embed.setDescription("🔓 | This ticket is now unlocked.");

                docs.MemberID.forEach((m) => {
                    channel.permissionOverwrites.edit(m, {
                        SEND_MESSAGES: true,
                    });
                });

                interaction.reply({ embeds: [Embed] });
                break;
            case "close":
                if(docs.Closed == true)
                    return interaction.reply({
                        content: "Ticket is already close please wait for it to get deleted",
                        ephemeral: true,
                    });
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`,
                });
                await dataBase.updateOne({ ChannelID: channel.id }, { Closed: true });

                const MEMBER = guild.members.cache.get(docs.MemberID);
                const Message = await guild.channels.cache.get(ticketSetup.Transcripts).send({
                    embeds: [
                        Embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`),
                    ],
                    files: [attachment],
                });
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `The transcript is now saved [TRANSCRIPT](${Message.url})`
                        ),
                    ],
                });
                const data = await dataBase.findOne({TicketID: docs.TicketID});

                setTimeout(() => {
                    channel.delete()
                    data.delete()
                }, 10 * 1000);
        }
    });
});


// const { ButtonInteraction, MessageEmbed } = require("discord.js");
// const { createTranscript } = require("discord-html-transcripts");
// const { transcriptsID } = require("../../config.json");
// const dataBase = require("../../models/ticketModel");
// const client = require("../../index");

// client.on("interactionCreate", async (interaction) => {
//     if (!interaction.isButton()) return;
//     const { guild, channel, customId, member } = interaction;

//     if(!["close", "lock", "unlock"].includes(customId)) return;
    
//     if(!member.permissions.has("ADMINISTRATOR")) 
//     return interaction.reply({ content: "You cannot use these buttons."});

//     const Embed = new MessageEmbed()
//         .setColor("#e9c5c5");

//     dataBase.findOne({ ChannelID: channel.id }, async(err, docs) => {
//         if(err) throw err;
//         if(!docs) 
//             return interaction.reply({
//                 content: "No data was found related to this ticket, please delete manual.",
//                 ephemeral: true,
//             });
//         switch(customId) {
//             case "lock":
//                 if(docs.Locked == true)
//                     return interaction.reply({ 
//                         content: "The ticket is already locked",
//                         ephemeral: true,
//                     });
//                 await dataBase.updateOne({ ChannelID: channel.id }, { Locked: true });
//                 Embed.setDescription("🔒 | This ticket is now locked for reviewing.");
//                 channel.permissionOverwrites.edit(docs.MemberID, {
//                     SEND_MESSAGES: false,
//                 });
//                 interaction.reply({ embeds: [Embed] });
//                 break;
//             case "unlock":
//                 if(docs.Locked == false)
//                     return interaction.reply({ 
//                         content: "The ticket is already unlocked",
//                         ephemeral: true,
//                     });
//                 await dataBase.updateOne({ ChannelID: channel.id }, { Locked: false });
//                 Embed.setDescription("🔓 | This ticket is now unlocked.");
//                 channel.permissionOverwrites.edit(docs.MemberID, { 
//                     SEND_MESSAGES: true,
//                 });
//                 interaction.reply({ embeds: [Embed] });
//                 break;
//             case "close":
//                 if(docs.Closed == true)
//                     return interaction.reply({
//                         content: "Ticket is already close please wait for it to get deleted",
//                         ephemeral: true,
//                     });
//                 const attachment = await createTranscript(channel, {
//                     limit: -1,
//                     returnBuffer: false,
//                     fileName: `${docs.Type} - ${docs.TicketID}.html`,
//                 });
//                 await dataBase.updateOne({ ChannelID: channel.id }, { Closed: true });

//                 const MEMBER = guild.members.cache.get(docs.MemberID);
//                 const Message = await guild.channels.cache.get(transcriptsID).send({
//                     embeds: [
//                         Embed.setTitle(`Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`),
//                     ],
//                     files: [attachment],
//                 });
//                 interaction.reply({
//                     embeds: [
//                         Embed.setDescription(
//                             `The transcript is now saved [TRANSCRIPT](${Message.url})`
//                         ),
//                     ],
//                 });

//                 setTimeout(() => {
//                     channel.delete()
//                 }, 10 * 1000);
//         }
//     });
// });