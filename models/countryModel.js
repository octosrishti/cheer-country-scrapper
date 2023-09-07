const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const CountryModel = mongoose.model('Country', countrySchema)

module.exports = CountryModel