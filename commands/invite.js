const Discord = require("discord.js")

const botInfo = require("../json/info.json")
const modules = require("../modules.js")

module.exports.run = (client, message, args) => {
    // https://discord.com/oauth2/authorize?client_id=834152608058572861&scope=bot&permissions=85065

    message.channel.send({embed: {
        color: botInfo.colour,
        fields: [{
            name: "Invite meee!!",
            value: `You can invite me [here](https://discord.com/oauth2/authorize?client_id=834152608058572861&scope=bot&permissions=85065)! :)`
        }]
    }})
}

module.exports.info = {
    name: "invite",
    description: "Lets you invite me! :)",
    aliases: [],
    category: "Bot",
    permission: "Public"
}