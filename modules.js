const fs = require("fs")

const userinfo = require("./json/userinfo.json")

module.exports.getArgs = (args) => {
    delete args[0]
    args = args.join(" ")
    args = args.split("")
    delete args[0]
    return args = args.join("")
}

module.exports.countLines = (filePath) => {
    // function copied from https://stackoverflow.com/questions/12453057/node-js-count-the-number-of-lines-in-a-file
    var contents = fs.readFileSync(filePath)
    return contents.toString().split('\n').length - 1
};

module.exports.countFileSize = (filePath) => {
    // returns in KB 
    return fs.statSync(filePath).size/1000
}

module.exports.messageGreg = (client, content) => {
    client.users.cache.get("257482333278437377").send(content)
}

module.exports.registerUser = (id) => {
    if(userinfo[id].balances) return
    userinfo[id] = {}
    userinfo[id].balances = {}
}