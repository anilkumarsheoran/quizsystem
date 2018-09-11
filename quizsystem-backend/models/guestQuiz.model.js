
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QuestQuiz = new Schema({
    // name: {type: String},
    // email: String,
    // contactno: {type: String},
    userid: String,
    quiz : String,
    score: Number,
    totalQuestion:Number,
    attemptedQuestion : Number,
    questions: [{question:String,useranswer:String}],
},{collection:'guestquiz'})

const GuestModel = mongoose.model('GuestQuizModel', QuestQuiz);

module.exports =  GuestModel