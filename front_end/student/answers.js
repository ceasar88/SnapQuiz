export default function(answers) {
  var answersElement = document.createElement('ul');
  answersElement.classList.add('list-group');
  answersElement.id = 'answers';

  answers.forEach(answerText => {
    var answer = document.createElement('a');
    answer.classList.add('list-group-item');
    answer.classList.add('justify-content-center');
    answer.onclick = onClick;
    answer.innerText = answerText;
    answer.style.fontSize = "10vmax";
    answersElement.appendChild(answer);
  });

  return answersElement;
}

var activeElement;

function onClick(mouseEvent) {
  if(activeElement) {
    activeElement.classList.remove('active');
  }
  activeElement = this;
  activeElement.classList.add('active');
  console.log(this.innerText + " was clicked.");
}
