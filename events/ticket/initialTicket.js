const { MessageEmbed, ButtonInteraction, MessageActionRow, MessageButton} = require("discord.js");
const dataBase = require("../../models/ticketModel");
const ticketSetupData = require("../../models/ticketSetup")
const client = require("../../index");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    const { guild, member, customId } = interaction;

    const Data = await ticketSetupData.findOne({GuildID: guild.id});
    if(!Data) return;

    if(!Data.Buttons.includes(customId)) return;


    const ID = Math.floor(Math.random() * 90000) +  10000;

    await guild.channels.create(`${customId + "-" + ID}`, {
        type: "GUILD_TEXT",
        parent: Data.Category,
        permissionOverwrites: [
            {
                id: member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
                id: Data.Everyone,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
                id: Data.Handlers,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
        ],
    }).then(async(channel) => {
        await dataBase.create({
            GuildID: guild.id,
            MemberID: member.id,
            TicketID: ID,
            ChannelID: channel.id,
            Closed: false,
            Locked: false,
            Type: customId,
        });

        const Embed = new MessageEmbed()
        .setAuthor({name: `${guild.name} | Ticket: ${ID}`, iconURL: guild.iconURL({ dynamic: true})})
        .setDescription("Please wait patiently for a response from the Staff team, in the mean while, describe your issue in as much detail as possible.")
        .setFooter({ text: "The buttons below are Staff Only Buttons."});

        const Buttons = new MessageActionRow()
        Buttons.addComponents(
            new MessageButton()
                .setCustomId("close")
                .setLabel("Save & Close Ticket")
                .setStyle("PRIMARY")
                .setEmoji("💾"),
            new MessageButton()
                .setCustomId("lock")
                .setLabel("Lock")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
            new MessageButton()
                .setCustomId("unlock")
                .setLabel("Unlock")
                .setStyle("SUCCESS")
                .setEmoji("🔓")
        );

        channel.send({ 
            embeds:[Embed], 
            components: [Buttons] 
        });
        await channel
        .send({ content: `${member} here is your ticket`})
        .then((m) => {
            setTimeout(() => {
                m.delete().catch(() => {})
            }, 1 * 5000);
        });

        interaction.reply({content: `${member} your ticket has been created: ${channel}`, ephemeral: true});
    });
});




// const { MessageEmbed, ButtonInteraction, MessageActionRow, MessageButton} = require("discord.js");
// const dataBase = require("../../models/ticketModel");
// const {PARENTID, EVERYONEID} = require("../../config.json");
// const client = require("../../index");

// client.on("interactionCreate", async (interaction) => {
//     if (!interaction.isButton()) return;
//     const { guild, member, customId } = interaction;
//     if(!["player", "bug", "other"].includes(customId)) return;

//     const ID = Math.floor(Math.random() * 90000) +  10000;

//     await guild.channels.create(`${customId + "-" + ID}`, {
//         type: "GUILD_TEXT",
//         parent: PARENTID,
//         permissionOverwrites: [
//             {
//                 id: member.id,
//                 allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
//             },
//             {
//                 id: EVERYONEID,
//                 deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
//             },
//         ],
//     }).then(async(channel) => {
//         await dataBase.create({
//             GuildID: guild.id,
//             MemberID: member.id,
//             TicketID: ID,
//             ChannelID: channel.id,
//             Closed: false,
//             Locked: false,
//             Type: customId,
//         });

//         const Embed = new MessageEmbed()
//         .setAuthor(`${guild.name} | Ticket: ${ID}`, guild.iconURL({ dynamic: true}))
//         .setDescription("Please wait patiently for a response from the Staff team, in the mean while, describe your issue in as much detail as possible.")
//         .setFooter("The buttons below are Staff Only Buttons.");

//         const Buttons = new MessageActionRow()
//         Buttons.addComponents(
//             new MessageButton()
//                 .setCustomId("close")
//                 .setLabel("Save & Close Ticket")
//                 .setStyle("PRIMARY")
//                 .setEmoji("💾"),
//             new MessageButton()
//                 .setCustomId("lock")
//                 .setLabel("Lock")
//                 .setStyle("SECONDARY")
//                 .setEmoji("🔒"),
//             new MessageButton()
//                 .setCustomId("unlock")
//                 .setLabel("Unlock")
//                 .setStyle("SUCCESS")
//                 .setEmoji("🔓")
//         );

//         channel.send({ embeds:[Embed], components: [Buttons] });
//         await channel.send({ content: `${member} here is your ticket`}).then((m) => {
//             setTimeout(() => {
//                 m.delete().catch(() => {})
//             }, 1* 5000);
//             });
//         interaction.followUp({content: `${member} your ticket has been created: ${channel}`, ephemeral: true});
//     });
// });

