const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const moment = require("moment");

const flags = {
	DISCORD_EMPLOYEE: '<:discordemployee:931530420800061530>',
	DISCORD_PARTNER: '<:discordpartner:929651430682402819>',
	BUGHUNTER_LEVEL_1: '<:discordbughunterlv1:929651431496118302>',
	BUGHUNTER_LEVEL_2: '<:discordbughunterlv2:929651431219298324>',
	HYPESQUAD_EVENTS: '<:discordhypesquad:929651430820810792>',
	HOUSE_BRAVERY: '<:discordbravery:929651430535606302>',
	HOUSE_BRILLIANCE: '<:discordbrillance:929651430682402816>',
	HOUSE_BALANCE: '<:discordbalance:929651431093448704>',
	EARLY_SUPPORTER: '<:discordearlysupporter:929651430523011133>',
	VERIFIED_BOT: '<:bottag:929651431613554728>',
	VERIFIED_DEVELOPER: '<:bot_developer:929650907665297408>'
};

module.exports = {
    name: "userinfo",
    description: "Affiche les information de l'utilisateur choisie",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "member",
            description: "Utilisateur",
            type: "USER",
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.options.getMember("member") || interaction.member
        const activities = member.presence?.activities || []

        let badge = member.user.flags.toArray()
        let badges = badge.length ? badge.map(f => flags[f]).join(" ") : "No Badges";

        const focusActivity = activities.find(x => x.assets)
        const embed = new MessageEmbed()
        .setAuthor({name: member.user.tag, iconURL: member.user.displayAvatarURL()})
        .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
        .setThumbnail(focusActivity ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : member.user.displayAvatarURL())
        .setDescription(activities.map((x, i) => `**${x.type}**: \`${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}\``).join("\n"))
        .addField("Rejoins le", member.joinedAt.toLocaleString(), true)
        .addField("Compte crée le", member.user.createdAt.toLocaleString(), true)
        .addField("Autres Informations", [
            `Pseudo Discord: \`${member.displayName}\``,
            `Badges: ${badges}`,
            `Roles: ${member.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`,
            `Booster: \`${member.premiumSince ? 'depuis ' + member.premiumSince.toLocaleString() : 'Nope'}\``
        ].join("\n"))

        return interaction.followUp({ embeds: [embed] })
	},


    //     interaction.followUp({ 
    //         embeds: [new MessageEmbed()
    //             .setColor(`#e9c5c5"`)
    //             .setAuthor({ name: `Avatar de ${target.user.tag}`, iconURL:`${target.user.avatarURL({dynamic: true, size: 512})}`})
    //             .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
    //             .addFields(
    //                 {name: "ID", value: `${target.user.id}`},
    //                 {name: "Roles", value: `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`},
    //                 {name: "Rejoins le serveur", value: `${moment(target.member.joinedAt).format("MMMM Do YYYY, h:mm:ss")}\n**-** ${moment(target.joinedAt).startOf("day").fromNow()}`},
    //                 {name: "Compte crée", value: `${moment(target.user.createdAt).format("MMMM Do YYYY, h:mm:ss")}\n**-** ${moment(target.createdAt).startOf("day").fromNow()}`},
    //             )
    //     ]});
    // },
};
