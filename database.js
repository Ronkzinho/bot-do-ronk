require("dotenv")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

var UserSchema = new mongoose.Schema({
    _id: String,
    botRoles: [],
    twitchName: {
        default: null,
        type: String
    },
    banBot: {
        reason:{
            default: null,
            type: String
        },
        isBanned:{
            default: false,
            type: Boolean
        },
        author:{
            default: null,
            type: String
        }
    }
})

module.exports.Users = mongoose.model("User", UserSchema)