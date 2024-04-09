const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if (file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
    });

    
    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));


    //loading of Slash Commands
    client.on("ready", async () => {
    	const guilds = await client.guilds.fetch()
        guilds.forEach(async(g) => {
            g = await g.fetch()
    		g.commands.set(arrayOfSlashCommands)
        })
    })
    client.on("guildCreate", async (g) => {
    	g.commands.set(arrayOfSlashCommands)
    })
};

// Permission commands for single guild

// client.on("ready", async () => {
//     const guild = client.guilds.cache.get(guildID); // Register for a single guild
//     // Register for all the guilds the bot is in
//     // await client.application.commands.set(arrayOfSlashCommands);
//     await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
//         const getRoles = (commandName) => {
//             const permissions = arrayOfSlashCommands.find(x => x.name === commandName).userPermissions;

//             if(!permissions) return null;
//             return guild.roles.cache.filter(
//                 (x) => x.permissions.has(permissions) && !x.managed
//             );
//         };

//         const fullPermissions = cmd.reduce((accumulator, x) => {
//             const roles = getRoles(x.name);
//             if(!roles) return accumulator;

//             const permissions = roles.reduce((a, v) => {
//                 return [
//                     ...a,
//                     {
//                         id: v.id,
//                         type: "ROLE",
//                         permission: true,
//                     },
//                 ];
//             }, []);

//             return [
//                 ...accumulator,
//                 {
//                     id: x.id,
//                     permissions,
//                 },
//             ];
//         }, []);

//         guild.commands.permissions.set({ fullPermissions });
//     });
// });


    // // Permission commands
    // client.on("ready", async () => {
    //     client.guilds.cache.forEach((g) => {
    //         g.commands.set(arrayOfSlashCommands).then((cmd) => {
    //             const getRoles = (commandName) => {
    //                 const permissions = arrayOfSlashCommands.find(x => x.name === commandName).userPermissions;
    
    //                 if(!permissions) return null;
    //                 return g.roles.cache.filter(
    //                     (x) => x.permissions.has(permissions) && !x.managed
    //                 );
    //             };
    
    //             const fullPermissions = cmd.reduce((accumulator, x) => {
    //                 const roles = getRoles(x.name);
    //                 if(!roles) return accumulator;
    
    //                 const permissions = roles.reduce((a, v) => {
    //                     return [
    //                         ...a,
    //                         {
    //                             id: v.id,
    //                             type: "ROLE",
    //                             permission: true,
    //                         },
    //                     ];
    //                 }, []);
    
    //                 return [
    //                     ...accumulator,
    //                     {
    //                         id: x.id,
    //                         permissions,
    //                     },
    //                 ];
    //             }, []);
    
    //             g.commands.permissions.set({ fullPermissions });
    //         });
    //     });
    // });