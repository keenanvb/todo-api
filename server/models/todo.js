let mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo schema
const TodoSchema = new Schema({
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
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
});

//Todo model
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = {Todo}


