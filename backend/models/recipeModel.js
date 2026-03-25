const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [{
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: false,
        default: ''
    },
    have: {
        type: Boolean,
        default: false
    }
}],
    instructions: {
        type: String,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    servingSize: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)