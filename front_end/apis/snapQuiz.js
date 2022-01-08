import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
})

export default {
  createQuiz: function(courseID, quiz) {
    return instance.post('course/' + courseID + '/quiz', quiz)
      .then(result => result.data)
      .catch(error => console.log(error));
  },

  getQuiz: function(courseID, quizID) {
    return instance.get('course/' + courseID + '/quiz/' + quizID)
      .then(result => result.data)
      .catch(error => console.log(error));
  },

  getAllQuizzes: function(courseID) {
    return instance.get('course/' + courseID + '/quizzes')
  }
}
