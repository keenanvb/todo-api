let mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// User model
let User = mongoose.model('User', userSchema);

module.exports = {User}

