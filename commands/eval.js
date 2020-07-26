const { command } = require("../utils")
module.exports = class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "eval"
        this.aliases = ["e", "execute"]
    }
    async run({ message, args }){
        if(message.author.id !== "370007502643003403") return
        try{
            var result = await eval(args.join(' '))
            message.channel.send(`${result}.`)
        }catch(error){
            return message.channel.send(error)
        }
    }
}