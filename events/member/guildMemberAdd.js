const { MessageEmbed } = require("discord.js");
const welcomeSetupData = require("../../models/welcomeSetup.js")

module.exports = (client) => {
    client.on("guildMemberAdd", async(member) => { 

        welcomeSetupData.findOne({GuildID: member.guild.id}, async (e, data) => {
            if(!data) return interaction.reply({content: "The data for this system is outdated"});    
    
            const channel = member.guild.channels.cache.get(data.Channel);
            
            member.roles.add(data.Role);

            const Embed = new MessageEmbed()
                .setColor("#e9c5c5")
                .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL({dynamic: true, size: 512})})
                .setThumbnail(member.user.avatarURL({dynamic: true, size: 512}))
                .setDescription(`Bienvenue ${member} sur **${member.guild.name}**!\n\`Compte Crée:\` <t:${parseInt(member.user.createdTimestamp / 1000)}:R>\n\`Latest Member Count:\` **${member.guild.memberCount}**`)
                .setFooter({text: `ID: ${member.user.id}`})
    
            channel.send({ embeds:[Embed] });
        });
    });
};

// const { MessageEmbed } = require("discord.js");
// const { welcomeChannel, welcomeRole } = require('../../config.json')

// module.exports = (client) => {
//     const channelId = welcomeChannel; // welcome channel
//     client.on("guildMemberAdd", (member) => {

//         const channel = member.guild.channels.cache.get(channelId);

//         member.roles.add(welcomeRole); //role for joining

//         const embed = new MessageEmbed();

//         embed
//             .setColor("#e9c5c5")
//             .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL({dynamic: true, size: 512})})
//             .setThumbnail(member.user.avatarURL({dynamic: true, size: 512}))
//             .setDescription(`Bienvenue ${member} sur **${member.guild.name}**!\n\`Compte Crée:\` <t:${parseInt(member.user.createdTimestamp / 1000)}:R>\n\`Latest Member Count:\` **${member.guild.memberCount}**`)
//             .setFooter({text: `ID: ${member.user.id}`})

//         channel.send({embeds: [embed]});
//     });
// };
