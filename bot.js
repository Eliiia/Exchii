const Discord = require("discord.js")
const chalk = require("chalk")
const Enmap = require("enmap")
const fs = require("fs")

const botInfo = require("./json/info.json")
const usage = require("./json/usage.json")

const client = new Discord.Client()
client.commands = new Enmap()

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(chalk.grey(`Attempting to load command ${commandName}.`));
        client.commands.set(commandName, props);
    });
});

client.on("ready", () => {
    //client.channels.cache.get("836010603016749116").messages.cache.get("836269221146525777").edit()

    client.setInterval(() => {
        
    }, 300000)

    client.user.setActivity(`${botInfo.prefix}help | Hi :).`, {type: `PLAYING`}).catch((e) => {console.error(chalk.red(`Error when setting status:\n${e}`))})

    botInfo["startedAt"] = new Date();
    console.log(chalk.green(`\nLogged in as ${client.user.tag}.`))
})

client.on("message", message => {
    if(message.channel.type == "dm") client.channels.cache.get("702903582193746040").send(`New DM from <@${message.author.id}>: \`\`\`${message.content}\`\`\``)

    if(message.author.bot) return "fuck you"
    if(!(message.content.startsWith(botInfo.prefix) || message.content.startsWith(`<@${client.user.id}>`))) return;

    //client.users.cache.get("257482333278437377").send(`New message!\n\`\`\`${message.author.tag}:\n${message.content}\`\`\``)

    let args = message.content.split(" ");

    if(message.content.startsWith(botInfo.prefix)) args[0].slice(botInfo.prefix.length);

    const command = args[0].slice(botInfo.prefix.length, args[0].length);
    const cmd = client.commands.get(command);

    if(cmd) {
        if(cmd.info.permission == "Developer" && !botInfo.developers.includes(message.author.id)) {
            message.channel.send(`Why are you trying to run this? Hmm?`)
            return console.log(chalk.yellow(`${message.author.tag} just tried to do ${botInfo.prefix}${command} but failed! This command only for you! :)`) + chalk.cyan(`\n  Arguments: ${args.join(" ")}`));
        }
        else {
            try {
                cmd.run(client, message, args);
                console.log(chalk./*hex("#0000c0")*/blue.bold(`${message.author.tag} executed ${command}.`)+chalk.cyan(`\n  Arguments: ${args.join(" ")}`));

                usage.global.total++
                if(!usage.global[command]) usage.global[command] = 1
                else usage.global[command]++

                if(!usage[message.author.id]) {usage[message.author.id] = {}; usage[message.author.id].total = 1}
                else usage[message.author.id].total++
                
                if(!usage[message.author.id][command]) usage[message.author.id][command] = 1
                else usage[message.author.id][command]++

                fs.writeFileSync("./json/usage.json", JSON.stringify(usage, null, 4))
            }
            catch(e) {
                message.channel.send(`Error!!!!\nIt's:\n\n\`\`\`${e}\`\`\``);
                console.log(chalk.red(`An error has occcured!\n  User: ${message.author.tag} (${message.author.id})\n  Command used: ${command}\n  Error: ${e}`));
            }
        }
    }
})

client.login(botInfo.token)



// client.channels.cache.get("702903582193746040").send