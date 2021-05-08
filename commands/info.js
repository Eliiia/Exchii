const Discord = require("discord.js")
const fs = require("fs")

const botInfo = require("../json/info.json")
const usage = require("../json/usage.json")
const modules = require("../modules.js")

module.exports.run = (client, message, args) => {
    mostUsedCommand = ""
    n = 0
    for(const element in usage.global) {
        if(element == "total") continue
        if(usage.global[element] > n) {
            mostUsedCommand = element
            n = usage.global[element]
        }
    }

    // bot.js
    botLines = modules.countLines("./bot.js")
    botSize = modules.countFileSize("./bot.js"); 

    // commands
    let commandLines = 0
    let commandSize = 0
    fs.readdirSync("./commands/").forEach(file => {
        commandLines += modules.countLines(`./commands/${file}`)
        commandSize += modules.countFileSize(`./commands/${file}`)
    })

    // data
    dataLines = 0
    dataSize = 0
    fs.readdirSync("./json/").forEach(file => {
        dataLines += modules.countLines(`./json/${file}`)
        dataSize += modules.countFileSize(`./json/${file}`)
    })

    let dateSince = (new Date() - botInfo.startedAt).toString() + "ms" 

    let embed = new Discord.MessageEmbed()
        .setTitle(`Bot Info!`)
        .setColor(botInfo.colour)
        .setFooter(`To view changes do ${botInfo.prefix}viewchangelog!!!! :)`)
        .addFields(
            { name: `Creator`, value: botInfo.developers[0].tag, inline: true },
            { name: `Servers`, value: client.guilds.cache.size, inline: true },
            { name: `Users`, value: client.users.cache.size, inline: true },
            { name: `Channels`, value: client.channels.cache.size, inline: true },
            { name: `Commands Used`, value: `${usage.global.total}`, inline: true },
            { name: `Most Used Commands`, value: `${botInfo.prefix}${mostUsedCommand} (${n} uses)`, inline: true },
            { name: `Size/Lines of Code (Main bot)`, value: `${botLines} lines (${botSize}KB)`, inline: true },
            { name: `Size/Lines of Code (Commands)`, value: `${commandLines} lines (${commandSize}KB)`, inline: true },
            { name: `Size/Lines of Data Stored`, value: `${dataLines} lines (${dataSize}KB)`, inline: true },
            { name: `Last Restart`, value: `${botInfo.startedAt}\nOnline for ${dateSince}!`, inline: true }
        )

    message.channel.send(embed)
}

module.exports.info = {
    name: "info",
    description: `Gives chu info about me!!!`,
    aliases: [],
    category: "Bot",
    permission: "Public"
}