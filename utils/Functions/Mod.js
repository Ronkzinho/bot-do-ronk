module.exports = class Mod{
    constructor(client){
    }
    async ban(member, guild, author, reason){

    }
    async unban(member, guild, author){

    }
    async banbot(member, user, author, reason, type){
        if(user.banBot.isBanned){
            return { error: "Este usuário já está banido!" }
        }
        user.banBot = {
            isBanned: true,
            author: author.id,
            reason
        }
        user.save()
        if(type === 2){
            member.send(`Você foi banido de usar o bot pelo <@${author.id}>, ${(reason !== null) ? "pelo motivo: " + reason : "sem motivo aparente!"}`)
        }
        return { sucess: true }
    }
    async unbanbot(member, user, author, type){
        if(!user.banBot.isBanned){
            return { error: "Este usuário não está banido!" }
        }
        user.banBot = {
            isBanned: false,
            reason: null,
            author: null
        }
        user.save()
        if(type === 2){
            member.send(`Você foi desbanido de usar o bot pelo <@${author.id}>`)
        }
        return { sucess: true }
    }
}