var GuestModel = require('../models/guest.model')
var QuestionModel = require('../models/questions.model')
var express = require('express');
var router = express.Router();

const app = express();

router.get('/:id', function(req, res, next) {
    GuestModel.findById(req.params.id).then((doc)=> {
      res.status(200);
      res.json(doc);
      })
  });

router.post('/',(req,res) => {
  var quest ={
      name: req.body.name,
      email: req.body.email,
      contactno: req.body.contactno,
      quiz:req.body.quiz
  }
  var data = GuestModel(quest)
  data.save(function(err,obj){
      if(err){
          res.status(500).send();
      }else{
          res.send(obj)
      }
  });
})

router.put('/update/:id',(req,res) => {
    var userId= req.params.id;
    // req.body.questions.map((item,index)=>{
    //     let data 
        QuestionModel.findById(req.body.questions.questionId).select('answer').exec(function(err, txs) {
             data = txs.answer[0];
             
             if( data === req.body.questions.useranswer ){
                
                req.body.questions.answer = true;
               // console.log('dddddddddd',data, req.body.questions);
            }else{
                req.body.questions.answer = false
            }
            GuestModel.findByIdAndUpdate(
                userId,
                { $push: req.body },
                //req.body,
                {new: true},
                (err, obj) => {
                    if (err) return res.status(500).send(err);
                    return res.send(obj);
                }
            )
    });
    // })
    // .then(console.log('pppppppp',req.body))
    //console.log('ggggggggg',req.body)
   
    // GuestModel.findByIdAndUpdate(
    //     userId,
    //     { $push: req.body },
    //     //req.body,
    //     {new: true},
    //     (err, obj) => {
    //         if (err) return res.status(500).send(err);
    //         return res.send(obj);
    //     }
    // )
  })

  router.put('/feedback/:id',(req,res) => {
    var userId= req.params.id;
    GuestModel.findByIdAndUpdate(
        userId,
        req.body,
        //req.body,
        {new: true},
        (err, obj) => {
            if (err) return res.status(500).send(err);
            return res.send(obj);
        }
    )
})


module.exports = router;
