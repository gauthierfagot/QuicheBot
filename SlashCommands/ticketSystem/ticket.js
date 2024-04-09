const { MessageEmbed, CommandInteraction, Client} = require("discord.js");
const dataBase = require("../../models/ticketModel");

module.exports = {
    name: "ticket",
    description: "Ticket Actions",
    userPermissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Add or Remove a member form this ticket.",
            require: true,
            choices: [ 
                { name: "Add", value: "add" }, 
                { name: "Remove", value: "remove" },
            ],
        },
        {
            name: "member",
            description: "Select member",
            type: "USER",
            require: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        const { guildId, options, channel } = interaction;

        const Action = options.getString("action");
        const Member = options.getUser("member");

        const Embed = new MessageEmbed();

        switch(Action) {
            case "add":
                dataBase.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                        return interaction.followUp({
                            embeds: [Embed
                                .setColor("#e9c5c5")
                                .setDescription("⛔️ | This channel is not tried with a ticket.")
                            ],
                        });
                    if (docs.MemberID.includes(Member.id))
                        return interaction.followUp({
                            embeds: [Embed
                                .setColor("#e9c5c5")
                                .setDescription("⛔️ | This member is already added to this ticket.")
                            ],
                            ephemeral: true,
                        });
                    docs.MemberID.push(Member.id);

                    channel.permissionOverwrites.edit(Member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true,
                    });
                    interaction.followUp({ 
                        embeds: [Embed
                            .setColor("#e9c5c5")
                            .setDescription(`✅ | ${Member} has been added to this ticket.`)
                        ],
                    });
                    docs.save();
                }
            );
                break;
            case "remove":
                dataBase.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
                    if (err) throw err;
                    if (!docs)
                        return interaction.followUp({
                            embeds: [Embed
                                .setColor("#e9c5c5")
                                .setDescription("⛔️ | This channel is not tried with a ticket.")
                            ],
                        });
                    if (!docs.MemberID.includes(Member.id))
                        return interaction.followUp({
                            embeds: [Embed
                                .setColor("#e9c5c5")
                                .setDescription("⛔️ | This member is not in this ticket.")
                            ],
                            ephemeral: true,
                        });
                    docs.MemberID.remove(Member.id);

                    channel.permissionOverwrites.edit(Member.id, {
                        VIEW_CHANNEL: false,
                    });
                    interaction.followUp({ 
                        embeds: [Embed
                            .setColor("#e9c5c5")
                            .setDescription(`✅ | ${Member} has been removed from this ticket.`)
                        ],
                    });
                    docs.save();
                }
            );
                break;
        }
    },
};


// const { MessageEmbed, CommandInteraction, Client} = require("discord.js");
// const dataBase = require("../../models/ticketModel");

// module.exports = {
//     name: "ticket",
//     description: "Ticket Actions",
//     userPermissions: ["ADMINISTRATOR"],
//     options: [
//         {
//             name: "action",
//             type: "STRING",
//             description: "Add or Remove a member form this ticket.",
//             require: true,
//             choices: [ 
//                 { name: "Add", value: "add" }, 
//                 { name: "Remove", value: "remove" },
//             ],
//         },
//         {
//             name: "member",
//             description: "Select member",
//             type: "USER",
//             require: true,
//         },
//     ],
//     /**
//      * @param {Client} client
//      * @param {CommandInteraction} interaction
//      * @param {String[]} args
//      */
//     run: async(client, interaction, args) => {
//         const { guildId, options, channel } = interaction;

//         const Action = options.getString("action");
//         const Member = options.getUser("member");

//         const Embed = new MessageEmbed();

//         switch(Action) {
//             case "add":
//                 dataBase.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
//                     if (err) throw err;
//                     if (!docs)
//                         return interaction.followUp({
//                             embeds: [Embed
//                                 .setColor("#e9c5c5")
//                                 .setDescription("⛔️ | This channel is not tried with a ticket.")
//                             ],
//                         });
//                     if (docs.MemberID.includes(Member.id))
//                         return interaction.followUp({
//                             embeds: [Embed
//                                 .setColor("#e9c5c5")
//                                 .setDescription("⛔️ | This member is already added to this ticket.")
//                             ],
//                             ephemeral: true,
//                         });
//                     docs.MemberID.push(Member.id);

//                     channel.permissionOverwrites.edit(Member.id, {
//                         SEND_MESSAGES: true,
//                         VIEW_CHANNEL: true,
//                         READ_MESSAGE_HISTORY: true,
//                     });
//                     interaction.followUp({ 
//                         embeds: [Embed
//                             .setColor("#e9c5c5")
//                             .setDescription(`✅ | ${Member} has been added to this ticket.`)
//                         ],
//                     });
//                     docs.save();
//                 }
//             );
//                 break;
//             case "remove":
//                 dataBase.findOne({ GuildID: guildId, ChannelID: channel.id }, async (err, docs) => {
//                     if (err) throw err;
//                     if (!docs)
//                         return interaction.followUp({
//                             embeds: [Embed
//                                 .setColor("#e9c5c5")
//                                 .setDescription("⛔️ | This channel is not tried with a ticket.")
//                             ],
//                         });
//                     if (!docs.MemberID.includes(Member.id))
//                         return interaction.followUp({
//                             embeds: [Embed
//                                 .setColor("#e9c5c5")
//                                 .setDescription("⛔️ | This member is not in this ticket.")
//                             ],
//                             ephemeral: true,
//                         });
//                     docs.MemberID.remove(Member.id);

//                     channel.permissionOverwrites.edit(Member.id, {
//                         VIEW_CHANNEL: false,
//                     });
//                     interaction.followUp({ 
//                         embeds: [Embed
//                             .setColor("#e9c5c5")
//                             .setDescription(`✅ | ${Member} has been removed from this ticket.`)
//                         ],
//                     });
//                     docs.save();
//                 }
//             );
//                 break;
//         }
//     },
// };