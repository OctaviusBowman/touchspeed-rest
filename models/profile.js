const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    mistakes: {
        type: Number,
        default: 0
    },
    time: {
        type: Number,
        default: 30
    },
    words: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', profileSchema)