const Discord = require("discord.js")
const { command } = require("../utils");

module.exports = class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "avatar"
        this.aliases = ["av", "a"]
    }
    async run({ message, args }){
        let user = args[0] ? message.mentions.users.first() ? message.mentions.users.first() : this.client.users.cache.get(args.join(' ')) ? this.client.users.cache.get(args.join(' ')) : this.client.users.cache.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.cache.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) : this.client.users.cache.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) ? this.client.users.cache.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) : message.guild.members.cache.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()) ? message.guild.members.cache.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()).user : message.guild.members.cache.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) ? message.guild.members.cache.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).user : this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) ? this.client.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) : message.author : message.author
        let avatar = user.displayAvatarURL()
        if (avatar.endsWith(".gif") || avatar.endsWith(".png")) {
            avatar = `${user.displayAvatarURL}?size=2048`
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar de ${user.user.username}`)
        .setDescription(`[Baixar imagem](${avatar})`)
        .setImage(`${avatar}`)
        .setColor('36393E')
        message.channel.send(embed)
    }
}