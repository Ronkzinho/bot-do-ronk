const { command } = require("../utils")
var axios = require("axios")

module.exports = class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "ronkpoints"
        this.aliases = ["rp"]
    }
    async run({ message, args }){
        var user = args[0] ? args.join(" ").replace(" ", "_") : message.author.username
        axios.default.get(`https://api.streamelements.com/kappa/v2/points/${process.env.STREAMELEMENTS_ID}/${user.toLocaleLowerCase()}`).then(res => {
            var streamelementsUser = res.data
            message.channel.send(`${streamelementsUser.username} tem ${streamelementsUser.points} ronkpoints e está ná ${streamelementsUser.rank}ª posição no ranking!`)
        }).catch((onrejected) => {
            if(onrejected.response.data.statusCode === 404){
                return message.channel.send("Usuário não encontrado!")
            }
            else{
                message.channel.send(onrejected.response.data.error)
            }
        })
    }
}