const { command } = require("../utils")

module.exports = class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "ping"
        this.allowDm = true
    }
    async run({ message, args }) {
        var msg = await message.channel.send("Ping?")
        msg.edit(`Pong! ${(msg.createdAt - message.createdAt)}ms`)
    }
}