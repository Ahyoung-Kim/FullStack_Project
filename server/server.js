const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = 4000;
import { DBURI } from './config/key';

// Model
const User = require('./model/User');
const Post = require('./model/Post')
const Comment = require('./model/Comment')

const mongoose = require('mongoose');

// mongoose의 connection 메소드를 변수 db에 할당
let db = mongoose.connection;
// db 연결 실패 시
db.on('error', console.error);
// db 연결 성공 시
db.once('open', () => {
  console.log('MongoDB is connected');
})

// mongodb cluster와 연결
mongoose.connect(DBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send({ success: true })
})

// User 등록
app.post('/register', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})