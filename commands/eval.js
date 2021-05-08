const Discord = require("discord.js")
const fs = require("fs")

const changelog = require("../json/changelog.json")
const botInfo = require("../json/info.json")
const usage = require("../json/usage.json")
const modules = require("../modules.js")

module.exports.run = (client, message, args) => {  
    args = modules.getArgs(args)

    result = eval(args)

    // method 1 of how to embeds:
    /*let embed = new Discord.RichEmbed()
        .setColor(botinfo.colour)
        .setFields(
            {name: "Code:", value: `\`\`\`${args}\`\`\``},
          
          {name: "Result:", value: `\`\`\`${result}\`\`\``}
        )*/
    
    // method 2 of how to do embeds:
    message.channel.send({embed: {
        color: botInfo.colour,
        fields: [{
            name: "Code:",
            value: `\`\`\`js\n${args}\`\`\``
        },
        {
            name: "Result:", 
            value: `\`\`\`js\n${result}\`\`\``
        }]
    }})
    
    /* without embeds:
    * message.channel.send(`Code:\`\`\`js\n${args}\`\`\`Result:\`\`\`${result}\`\`\``)
    */
}

module.exports.info = {
    name: "eval",
    description: "Allows epik developers to run epik commands!!",
    aliases: [], 
    category: "Developer",
    permission: "Developer" 
}