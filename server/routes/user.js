const express = require('express');
const router = express.Router();
const User = require('../model/User');

// 유저 로그인
router.post('/login', async(req, res) => {
  const user = await User.findOne({ email : req.body.email })
  if(!user) {
      res.send({ success : false, error : 1 })
      return
  }

  user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
          res.send({ success : false, error : 1 })
          return
      }

      res.send({
        success: true,
        user_info: {
          user_id: user._id,
          user_name: user.name
        }
      })
  })
})

// 유저 회원가입
router.post('/register', async(req, res, next) => {
  const checkUser = await User.findOne({ email: req.body.email });

  // 이미 존재하는 이메일이라면 success: false
  if(checkUser){
    console.log('이미 존재하는 이메일')
    res.send({ success: false })
    return;
  }

  const user = new User();
  const { name, email, password } = req.body;

  user.name = name;
  user.email = email;
  user.password = password;

  user.save((err) => {
    if(err){
      return res.status(400).send(err);
    } else {
      return res.status(201).send({
        success: true
      })
    }
  })
})

module.exports = router;