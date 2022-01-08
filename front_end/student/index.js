//Import bootstrap
import './../../back_end/meta.js';
import theme from './../theme.scss';
import answers from './answers';
import stuff from './test.scss';
import $ from 'jquery';
import snapQuiz from './../apis/snapQuiz';
import io from 'socket.io-client';

const socket = io('/student');

socket.on('connect', () => {
  console.log('I have connected.');
})

//Create bootstrap container
var container = document.createElement('div');
container.classList.add('container');

snapQuiz.createQuiz(1234, {name: 'fakeQuiz'})
  .then(result => {
    console.log(result);
    return snapQuiz.getQuiz(1234, result.quizId);
  })
  .then(quiz => console.log(quiz));


document.body.appendChild(container);

setTimeout(function(){
var quizAlert = document.createElement('div');
quizAlert.className = 'alert alert-info';
quizAlert.setAttribute('id','alertQ');
quizAlert.innerHTML = '<strong>Info! New Quiz published! </strong>';
container.appendChild(quizAlert);
}, 2000);

setTimeout(function(){
var qAlert = document.getElementById('alertQ');
qAlert.parentNode.removeChild(qAlert);
var quizList = document.createElement('div');
quizList.innerHTML = '<div class="list-group">QUIZ 1</br><a href="#" class="list-group-item">A. C++</a><a href="#" class="list-group-item">B. Python</a><a href="#" class="list-group-item active">C. Java</a><a href="#" class="list-group-item">D. Kotlin</a></div>';

container.appendChild(quizList);
}, 3000);
/*
container.appendChild(answers([
  'Java',
  'C++',
  'Kotlin'
]));
*/
