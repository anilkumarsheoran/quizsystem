
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Questions = new Schema({
    question: {type: String},
    timelimit: String,
    options: [{value: String,correct:Boolean}],
    answer: [String]
},{collection:'questions'})

const QuestionModel = mongoose.model('QuestionModel', Questions);

module.exports =  QuestionModel