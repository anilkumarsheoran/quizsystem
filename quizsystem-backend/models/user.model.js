
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    name: {type: String},
    username: {type: String, index: true},
    email: String,
    password: {type: String},
    role: String
},{collection:'user'})

const UserModel = mongoose.model('UserModel', User);

module.exports =  UserModel