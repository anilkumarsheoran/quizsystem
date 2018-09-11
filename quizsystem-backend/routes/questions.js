var QuestionModel = require('../models/questions.model')
var express = require('express');
var router = express.Router();

const app = express();

router.get('/', function(req, res, next) {
  QuestionModel.find().then((doc)=> {
    res.status(200);
    res.json(doc);
    })
});

router.post('/add',(req,res) => {
  var questions ={
    question: req.body.question,
    answer: req.body.answer,
    timelimit: req.body.timelimit,
    options: req.body.options
  }
  var data = QuestionModel(questions)
  data.save(function(err,obj){
      if(err){
          res.status(500).send();
      }else{
          res.send(obj)
      }
  });
})

router.delete('/delete/:id',(req,res) => {
  var questionId= req.params.id;
  QuestionModel.findByIdAndRemove(questionId, (err, question) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Question successfully deleted",
        id: questionId
    };
    return res.status(200).send(response);
    });
})

router.put('/:id',(req,res) => {
    var questionId= req.params.id;
    QuestionModel.findByIdAndUpdate(
        questionId,
        req.body,
        {new: true},
        (err, obj) => {
            if (err) return res.status(500).send(err);
            return res.send("Successful");
        }
    )
  })

module.exports = router;
