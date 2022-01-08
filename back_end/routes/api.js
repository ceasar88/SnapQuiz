const express = require('express');
const router = express.Router();
const database = require('./../database');
const rk = require('./../redisKey');

router.get('/', (req, res) => {
  res.send('Hello Api');
});

router.get('/course/:courseID/quiz/:quizID', (req, res) => {
  var courseID = req.params.courseID;
  var quizID = req.params.quizID;

  database.hgetAsync(rk('course', courseID, 'quiz'), quizID)
    .then(quiz => {
      res.send(quiz);
    })
    .catch(onError);
})

router.post('/course/:courseID/quiz', (req, res) => {
  var courseID = req.params.courseID;
  var quiz = JSON.stringify(req.body);
  var quizID;

  database.incrAsync(rk('course', courseID, 'quizID'))
    .then(result => {
      quizID = result;
      return database.hsetAsync(rk('course', courseID, 'quiz'), quizID, quiz);
    })
    .then(result => {
      res.send(JSON.stringify({quizID: quizID}))
    })
})

router.get('/course/:courseID/quizzes', (req, res) => {
  var courseID = req.params.courseID;

  database.hgetall(rk('course', courseID, 'quiz'))
})


function onError(error) {
  console.log(error);
}


module.exports = router;
