const { model, Schema } = require("mongoose");

module.exports = model(
    "welcomesetup", 
    new Schema({
    GuildID: String,
    Channel: String,
    Role: String,
    })
);