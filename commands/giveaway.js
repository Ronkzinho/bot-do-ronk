require("dotenv/config")
const axios = require("axios")
const { command } = require("../utils");

module.exports = class extends command{
    constructor(name, client){
        super(name, client)
        this.name = "giveaway"
        this.aliases = ["sorteio"]
    }
    async run({ message, args }){
        axios.default.get(`https://api.streamelements.com/kappa/v2/giveaways/${process.env.STREAMELEMENTS_ID}`).then(({ data }) => {
            var giveaway = data.active
            if(!giveaway){
                return message.channel.send("Nenhum sorteio está rolando!")
            }
            message.channel.send(`${giveaway.title}, este é o sorteio que está rolando!`, { 
                files: [
                    giveaway.preview
                ]
             })
        })
    }
}