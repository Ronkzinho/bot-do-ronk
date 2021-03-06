const { command } = require("../utils");

module.exports = class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "unbanbot",
        this.aliases = ["ubb", "unbotban"]
    }
    async run({ message, args }){
        if(message.author.id !== "370007502643003403" && !user.botRoles.some(role => ["subowner", "developer"].includes(role))) return
        message.delete()
        var member = this.client.users.cache.get(args[0]) || message.mentions.users.first()
        if(!member) return
        var user = await this.client.db.Users.findById(member.id) ? await this.client.db.Users.findById(member.id) : await this.client.db.Users.create({ _id: member.id })
        var msg = await message.channel.send(`Você tem certeza que deseja desbanir(de usar o bot) o membro ${member.username}?`)
        await msg.react("✅")
        await msg.react("☑️")
        await msg.react("❌")
        var collection = await msg.createReactionCollector((reaction, user) => ["✅", "☑️", "❌"].includes(reaction.emoji.name) && user.id === message.author.id, { max: 1, time: 30000 })
        collection.on("collect", async (reaction) => {
            if(reaction.emoji.name !== "❌"){
                var res = await this.client.mod.unbanbot(member, user, message.author, 2)
                if(res.error){
                    msg.delete()
                    return message.channel.send(res.error)
                }
                msg.delete()
                message.channel.send(`${member.username} foi desbanido de usar o bot!`).then(m => m.delete({ timeout: 5000 }))
            }
            else{
                msg.edit("Ok...")
                message.delete()
                return msg.delete(5000)
            }
        })
    }
}