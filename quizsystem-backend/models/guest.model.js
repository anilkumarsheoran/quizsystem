
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quest = new Schema({
    name: {type: String},
    email: String,
    contactno: {type: String},
    quiz : String,
    score: Number,
    totalQuestion:Number,
    correctCount : Number,
    feedback: String,
    questions: [{question:String,useranswer:String,answer:Boolean}],
},{collection:'guest'})

const GuestModel = mongoose.model('GuestModel', Quest);

module.exports =  GuestModel