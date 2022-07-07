const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  },
  password: {
    type: String,
    validate: [
      function(password){
        return password && password.length > 6;
      },
      "비밀번호 길이가 6보다 커야합니다."
    ]
  },
  age: Number,
  created: {
    type: Date,
    default: Date.now
  },
  array: [],
  arrayString: [String]
})