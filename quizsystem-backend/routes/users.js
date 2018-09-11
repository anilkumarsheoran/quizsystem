//import UserModel from '../models/user.model'
var UserModel = require('../models/user.model')
var express = require('express');
var router = express.Router();

const app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res) => {
  var user ={
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
  }
  var data = UserModel(user)
  data.save(function(err,obj){
      if(err){
          res.status(500).send();
      }else{
          res.send(obj)
      }
  });
})

router.post('/login',(req,res) => {
  var password= req.body.password;
  var email = req.body.email;
  var logintimeStamp = req.body.logintimeStamp;
  UserModel.findOne({email: email, password: password, logintimeStamp:logintimeStamp},function(err,obj){
      if(err){
          res.status(500).send();
      } else{
          if(!obj){
              res.status(404).send();
          }else{
              res.send(obj)
              res.status(200).send();
          }
      }
  })
})

module.exports = router;
