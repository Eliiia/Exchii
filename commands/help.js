const Discord = require("discord.js")
const fs = require("fs")

const botInfo = require("../json/info.json")
const modules = require("../modules.js")

module.exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`Help!`)
        .setColor(botInfo.colour)
    
    if(args.length == 1) { // if it's just "help" on its own
        let bot = 0, games = 0, currency = 0, config = 0, misc = 0, dev = 0, all = 0
        
        client.commands.forEach(command => {
            switch(command.info.category.toLowerCase()) {
                case "bot": {bot++; break}
                case "games": {games++; break}
                case "currency": {currency++; break}
                case "config": {config++; break}
                case "misc": {misc++; break}
                case "developer": {dev++; break}
                default: modules.messageGreg(client, `Hey Graggot you fuck you forgot to put a category on one of your commands specifically this one: ${command.info.name} (or like you forgot to add a new category to help)`)
            }
            all++
        })

        embed
            .setFooter(`Total commands: ${all}`)
            .addFields(
                { name: `🤖 Bot`, value: `*${botInfo.prefix}help bot*\n${bot} commands\nInformation`, inline: true},
                { name: `🕹️ Games`, value: `*${botInfo.prefix}help games*\n${games} commands\nGames`, inline: true},
                { name: `💸 Currency`, value: `*${botInfo.prefix}help currency*\n${currency} commands\nMoniesss!!!`, inline: true},
                { name: `⚙️ Config`, value: `*${botInfo.prefix}help config*\n${config} commands\nConfiguration!`, inline: true},
                { name: `❓ Misc.`, value: `*${botInfo.prefix}help misc*\n${misc} commands\nMiscellaneous`, inline: true},
                { name: `🦸 Support`, value: `Need more help????\nJoin us [here](https://discord.com/invite/QQQfNvgGaE/)!`, inline: true}
            )
        
        if(botInfo.developers.includes(message.author.id)) embed.addField(`🍉 Developer`, `${dev} commands\nIf you can see this you're extra cool :)`)
    }
    else {
        let cat = args[1].toLowerCase()

        if(!["bot","games","currency","config","misc"].includes(cat)) return "cat";

        embed.setDescription(`These are all the commands in the ${cat} category!! :)\nIf you need more help, feel free to join us [here](https://discord.com/invite/QQQfNvgGaE/)`)

        client.commands.forEach(command => {
            if(cat == command.info.category.toLowerCase()) {
                embed.addField(`${botInfo.prefix}${command.info.name}`, command.info.description)
            }
        })
    }
    
    message.channel.send({embed})
}

module.exports.info = {
    name: "help",
    description: "Shows all the commands I have!",
    aliases: [],
    category: "Bot",
    permission: "Public"
}