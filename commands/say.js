const botInfo = require("../json/info.json")
const modules = require("../modules.js")

module.exports.run = (client, message, args) => {
    message.channel.send(modules.getArgs(args))

    if(!message.deletable) return;
    message.delete().catch(console.error);
}

module.exports.info = {
    name: "say",
    description: "Makes me say something!",
    aliases: [],
    category: "Misc",
    permission: "Public"
}