const botInfo = require("../json/info.json")
const modules = require("../modules.js")

let responses = ["It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
]

module.exports.run = (client, message, args) => { 
    message.channel.send(responses[Math.floor(Math.random()*responses.length)]);
}

module.exports.info = {
    name: "8ball",
    description: "Tells you your fortune! This is honestly only here for testing, but have fun.",
    aliases: [],
    category: "Games",
    permission: "Public"
}