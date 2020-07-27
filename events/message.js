module.exports = async function (message) {
    var prefix = "<>"
    if(message.author.bot) return
    if(!message.content.startsWith(prefix)) return
    var args = message.content.slice(prefix.length).trim().split(/ +/g)
    var command = args.shift().toLowerCase()

    try {
        var commandRun = this.commands.find(c => c.name === command || c.aliases.includes(command))
        if(commandRun) {
            if(commandRun.allowDm !== true){
                if(message.channel.type === "dm") return
            }
            user = await this.db.Users.findById(message.author.id) ? await this.db.Users.findById(message.author.id) : await this.db.Users.create({ _id: message.author.id })
            if(user.banBot.isBanned){
                return message.channel.send(`Você foi banido de usar comandos do bot pelo ${this.users.cache.get(user.banBot.author).username}, ${user.banBot.reason ? "pelo motivo: " + user.banBot.reason : "sem motivo aparente!"}`)
            }
            commandRun.process({ message, args, prefix , user })
        }
        else{
            message.react("❔")
            var collector = await message.createReactionCollector((reaction, user) => reaction.emoji.name === "❔" && user.id === message.author.id, { max: 1, time: 30000 }) 
            collector.on('collect', () => {
                return message.channel.send(`O comando \`${prefix + command}\` não existe!`)
            })
            collector.on("end", () => { return })
        }
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') return;
        console.error(err)
    }
}