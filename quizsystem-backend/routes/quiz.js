var QuizModel = require('../models/quiz.model')
var express = require('express');
var router = express.Router();

const app = express();

router.get('/', function(req, res, next) {
  QuizModel.find().populate('questions').then((doc)=> {
    res.status(200);
    res.json(doc);
    })
});

router.get('/:id', function(req, res, next) {
    QuizModel.findById(req.params.id).populate('questions',"-answer").then((doc)=> {
      res.status(200);
      res.json(doc);
      })
  });

router.post('/add',(req,res) => {
  var quiz ={
    name: req.body.name,
    purpose: req.body.purpose,
    questions: req.body.questions
  }
  var data = QuizModel(quiz)
  data.save(function(err,obj){
      if(err){
          res.status(500).send();
      }else{
          QuizModel.findOne({name:obj.name})
          .populate('questions')
          .exec(function(error, questions) {
            res.send(questions)
           // console.log(JSON.stringify(questions, null, "\t"))
          })
        // res.send(obj)
      }
  });
})

router.delete('/delete/:id',(req,res) => {
  var quizId= req.params.id;
  QuizModel.findByIdAndRemove(quizId, (err, quiz) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Question successfully deleted",
        id: quizId
    };
    return res.status(200).send(response);
    });
})

router.put('/:id',(req,res) => {
    var quizId= req.params.id;
    QuizModel.findByIdAndUpdate(
        quizId,
        req.body,
        {new: true},
        (err, obj) => {
            if (err) return res.status(500).send(err);
            return res.send("Successful");
        }
    )
  })

module.exports = router;
