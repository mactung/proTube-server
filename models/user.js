const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    dob: String,
    ava: String,
    bio: String,
});

module.exports = mongoose.model('User', userSchema);