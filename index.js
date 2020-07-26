require("dotenv/config")
var BotDoRonk = require("./client")

var client = new BotDoRonk()

client.login(process.env.TOKEN)