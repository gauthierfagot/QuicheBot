const { model, Schema } = require("mongoose")

module.exports = model(
    "tickets", 
    new Schema({
    GuildID: String,
    MemberID: [String],
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    Locked: Boolean,
    Type: String,
    })
);