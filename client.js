const { Client, Collection } = require("discord.js")
const { Functions } = require("./utils")
const { readdirSync, statSync } = require('fs')
var database = require("./database")

module.exports = class BotDoRonk extends Client{
    constructor(options = {}){
        super(options)
        this.commands = new Collection()
        this.mod = new Functions.Mod()
        this.db = database
        this.initializeEvents('./events')
        this.initializeCommands('./commands')
    }
    initializeCommands (path) {
        readdirSync(path).forEach(file => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    const Command = require(filePath)
                    const commandName = file.replace(/.js/g,'').toLowerCase()
                    const command = new Command(commandName, this)
                    this.commands.set(commandName, command)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeCommands(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
    initializeEvents (path) {
        readdirSync(path).forEach(file => {
            try {
                let filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    let Listener = require(filePath)
                    this.on(file.replace(/.js/g, ''), Listener)
                } else if (statSync(filePath).isDirectory()) {
                    this.initializeEvents(filePath)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
}
