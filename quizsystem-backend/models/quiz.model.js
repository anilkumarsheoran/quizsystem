
const mongoose = require('mongoose');
const QuestionModel = require('./questions.model')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quiz = new Schema({
    name: {type: String},
    purpose: {type: String},
    questions : [{ type: mongoose.Schema.Types.ObjectId,ref:'QuestionModel'}]
},{collection:'quiz'})

const QuizModel = mongoose.model('QuizModel', Quiz);

module.exports =  QuizModel