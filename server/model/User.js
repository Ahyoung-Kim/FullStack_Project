const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    validate: [
      function(password){
        if(password && password.length > 6){
          return true
        } else {
          console.log('비밀번호 8자 이하 오류')
          return false;
        }
      }
    ]
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

// 회원가입 시 비밀번호 암호화
// .pre()를 통해 해당 스키마에 데이터가 저장(.save)되기 전 수행할 작업들
userSchema.pre('save', function(next) {
  var user = this;

  // 비번 변경될 때만 해싱작업 처리
  if(user.isModified('password')){
    // salt: 공격자가 암호를 유추할 수 없도록, 평문 데이터에 뿌려넣는 의미없는 데이터
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err){
        return next(err);
      }

      // 생성된 salt 값과 비밀번호를 인자로 넘겨줌
      // hash 생성
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err){
          return next(err);
        }
        
        // hash 값을 user.password에 저장
        user.password = hash
        next()    // save() 처리
      })
    })
  } else {
    next();
  }
}, {});

// 로그인 시 비밀번호 암호화 -> 디비에 저장된 비밀번호와 비교
userSchema.methods.comparePassword = function(plainPassword, cb){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err){
      return cb(err);
    }
    cb(null, isMatch)   // err은 null, isMatch는 true
  })
}

module.exports = mongoose.model('User', userSchema);