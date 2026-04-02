const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
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
        required: false,
        default: 0
    },
    servingSize: {
        type: Number,
        required: false,
        default: 0
    },
    steps: [{
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)