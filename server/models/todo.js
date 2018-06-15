let mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo schema
const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//Todo model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo}


