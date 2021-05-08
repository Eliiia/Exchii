const botInfo = require("../json/info.json")
const modules = require("../modules.js")

module.exports.run = (client, message, args) => {
    message.channel.send("Gambling bad!! Go :(")
}

module.exports.info = {
    name: "gamble",
    description: "Allows you to do BAD gambling!!! :(",
    aliases: [],
    category: "Games",
    permission: "Public"
}