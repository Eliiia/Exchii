const botInfo = require("../json/info.json")
const modules = require("../modules.js")
const market = require("../json/market.json")

module.exports.run = (client, message, args) => {

    if(args.length == 1) { // if it's just "deposit" on its own with no arguments
        message.channel.send({embed: {
            title: "Deposit monies!",
            description: `To deposit a specific currency, run \`${botInfo.prefix}deposit <currency_name>\``,
            color: botInfo.colour,
            fields: [{
                name: "Supported by the developer",
                value: ``,
                inline: true
            }]
        }})
    }
}

module.exports.info = {
    name: "deposit",
    description: "Allows you to deposit moneysss in!!",
    aliases: [],
    category: "Currency",
    permission: "Public"
}