var GuestQuizModel = require('../models/guestQuiz.model')
var express = require('express');
var router = express.Router();

const app = express();

// router.get('/:id', function(req, res, next) {
//     GuestModel.findById(req.params.id).then((doc)=> {
//       res.status(200);
//       res.json(doc);
//       })
//   });

router.post('/',(req,res) => {
  var quest ={
    //   name: req.body.name,
    //   email: req.body.email,
    //   contactno: req.body.contactno,
      quiz:req.body.quiz,
      score:req.body.score,
      totalQuestion:req.body.totalQuestion,
      attemptedQuestion:req.body.attemptedQuestion,
      question:req.body.question,
      useranswer:req.body.useranswer,
  }
  
  var data = GuestQuizModel(quest)
  data.save(function(err,obj){
      if(err){
          res.status(500).send();
      }else{
          res.send(obj)
      }
  });
})


module.exports = router;
