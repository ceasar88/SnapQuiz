//Import bootstrap
import './../../back_end/meta.js';
import theme from './../theme.scss';
import staticHtml from './instructorMain.html';
import bootstrap from './../../node_modules/bootstrap/dist/js/bootstrap.js';

import QuizDataTemplate from './../../mock_data/QuizDataTemplate.json';

import $ from 'jquery';

//Create bootstrap container
var container = document.createElement('div');
container.classList.add('container');
$(container).html(staticHtml);

document.body.appendChild(container);

$("#success-alert").hide();         // initially hide the alert banner
$('#create-link').click(function () {
    if ($('div[id^="question-content"]').length === 0) {
        document.getElementById("submit-quiz-btn").disabled = true;
    }
})

/* Start Create Quiz Modal code */
//Add functionality to the Add Question Button
$('#add-question-btn').click(function () {
    document.getElementById("submit-quiz-btn").disabled = false;

    var questionNum = ($('div[id^=question-content]').length + 1).toString();
    var container = document.getElementById('add-question-container');
    var el = document.createElement('div');
    el.id = "question-content-" + questionNum;
    el.className = "question-content";
    el.innerHTML = '<br><div id="remove-button" style="padding: 15px;"><label for="question-text-area" class="question-label">Question ' + questionNum + ':</label>' +
        '<button type="button" class="btn btn-danger float-right" id="remove-question-' + questionNum + '">Remove</button></div>' +
        '<textarea class="form-control" id="question-text-area" rows="3"></textarea><br>' +

        '<div id="points-textbox-container-' + questionNum + '" class="form-group row">' +
        '<label for="points-textbox' + questionNum + '" id="point-textbox-label" class="col-sm-2 col-form-label">Points:</label>' +
        '<input type="text" class="form-control" style="width: 60px;" id="points-textbox-' + questionNum + '" value="5">' +
        '</div>' +

        '<div id="question-options-' + questionNum + '">' +
        '<div class="form-group row"><label for="question-option1-label" class="col-sm-2 col-form-label">Option 1</label>' +
        '<input type="text" class="col-sm-5 form-control" id="question-option1-input" placeholder="Option 1">' +
        '<p id="space-holder" class="col-sm-1"></p>' +
        '<div class="form-check"><input style="padding-left: 30px;" class="col-sm-5 form-check-input" type="checkbox" id="question-option1-checkbox-' + questionNum + '" value="option1">' +
        '<label style="padding-left: 10px;" class="form-check-label" for="question-option1-checkbox-' + questionNum + '">Correct</label></div></div></div>' +

        '<div id="add-option-button" style="padding-bottom:30px"><button type="button" class="btn btn-secondary float-left" id="add-option-' + questionNum + '">Add Answer</button></div>';

    container.appendChild(el);

    // click functionality for remove question button
    $('#remove-question-' + questionNum).click(function () {
        var question = document.getElementById(el.id);
        question.remove();

        var questionsArr = document.querySelectorAll('label.question-label');
        var i = 0;
        questionsArr.forEach(function (questionEl) {
            i++;
            questionEl.innerHTML = 'Question ' + i.toString() + ':';
        });

        if (i === 0) {
            document.getElementById('submit-quiz-btn').disabled = true;
        }
    });

    $('#points-textbox-' + questionNum).change(function () {
        var valueInt = parseInt(this.value, 10);

        if (this.value != valueInt.toString()) {        // if value is not an integer
            this.value = "5";                         // reset to default of 5
        }
    });

    // click functionality for Add Answer button
    $('#add-option-' + questionNum).click(function () {
        var questionOptions = $('#question-options-' + questionNum);
        var optionNum = (questionOptions[0].childNodes.length + 1).toString();

        var newOption = '<div class="form-group row"><label for="question-option' + optionNum + '-label" class="col-sm-2 col-form-label">Option ' + optionNum + '</label>' +
            '<input type="text" class="col-sm-5 form-control" id="question-option' + optionNum + '-input" placeholder="Option ' + optionNum + '">' +
            '<p id="space-holder" class="col-sm-1"></p>' +
            '<div class="form-check"><input style="padding-left: 30px;" class="col-sm-5 form-check-input" type="checkbox" id="question-option' + optionNum +
            '-checkbox-' + questionNum + '" value="option' + optionNum + '">' +
            '<label style="padding-left: 10px;" class="form-check-label" for="question-option' + optionNum + '-checkbox-' + questionNum + '">Correct</label></div></div>';

        questionOptions.append(newOption);
    });

});

function resetCreateQuiz() {
    document.getElementById("quiz-title-input").value = "";
    var numQuestions = $('div[id^="question-content"]').length;
    for (var i = 0; i < numQuestions; i++) {
        $('div[id^="question-content"]').remove();
    }
}

// submits all the data to SnapQuizData.json
$('#submit-quiz-btn').click(function () {
    var quizData = QuizDataTemplate;                     // load json template from QuizDataTemplate.json
    quizData.questions[0].answers.pop();                 // pop the empty answer element from the answer array
    quizData.questions.pop();                            // pop the empty question element from the questions array

    quizData.quiz_title = document.getElementById("quiz-title-input").value;     // Add quiz title to quizData json object

    var questionsArr = $('div[id^="question-content"]');          // get array of questions
    var questionsLen = questionsArr.length;                       // get number of questions created
    var numOptions = 0;
    var optionsArr;

    for (var i = 0; i < questionsLen; i++) {
        quizData.questions.push({ "question_content": null, "answers": [], "correct_point": 5 });            // Add new question object
        quizData.questions[i].question_content = questionsArr[i].childNodes[2].value;       // Fill question_content attribute with string from question-text-area
        quizData.questions[i].correct_point = parseInt(questionsArr[i].childNodes[4].childNodes[1].value)   // Fill correct_point with integer from slider value

        var optionsArr = questionsArr[i].childNodes[5].childNodes;
        numOptions = optionsArr.length;

        for (var j = 0; j < numOptions; j++) {
            quizData.questions[i].answers.push({ "answer_text": null, "correct": false });           // Add empty answer object
            quizData.questions[i].answers[j].answer_text = optionsArr[j].childNodes[1].value;
            quizData.questions[i].answers[j].correct = optionsArr[j].childNodes[3].childNodes[0].checked;
        }
    }

    // router post statement should go here, but I'm not 100% sure how to use it

    console.log(quizData);
    resetCreateQuiz();

    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(500);
    });
});

// resets form field
$('#modal-reset').click(function () {
    document.getElementById("submit-quiz-btn").disabled = true;
    resetCreateQuiz();
});

$('#create-quiz-close').click(function () {
    resetCreateQuiz();
})
/* End create Quiz modal code*/

// Populate Quiz tab
$('#quiz-tab').click(function () {
    //var quizData = require('./../../mock_data/Class1Quiz1.json');
    var quizData = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];
    var list = document.getElementById('quiz-list');
    list.innerHTML = "";
    for (var quiz in quizData) {
        var entry = document.createElement('a');
        // entry.text = quizData[quiz].quiz_title;
        entry.text = quizData[quiz];
        entry.innerHTML = quizData[quiz] + '<br>';
        entry.classList.add('list-group-item');
        entry.classList.add('list-group-action');
        entry.classList.add('d-flex');
        entry.classList.add('justify-content-between');
        entry.setAttribute('id', 'list' + quizData[quiz]);
        entry.href = '#';
        var publishButton = document.createElement('a');
        publishButton.text = 'publish';
        publishButton.setAttribute('class', 'btn btn-info');
        publishButton.setAttribute('id', 'publish');
        publishButton.setAttribute('role', 'button');
        publishButton.href = '#';
        publishButton.onclick = publishQuiz(quizData[quiz]);
        entry.appendChild(publishButton);
        //entry.onclick = function(){
        //document.getElementById('list'+quizData[quiz]).appendChild(publishButton);
        //};
        list.appendChild(entry);
    }
});

function publishQuiz(quizName) {

}

startStats();

/* initiate stats feature */
function startStats() {
    var stats = document.getElementById('stat-tab');
    stats.onclick = statsHandler;

    var singleQuizStats = document.getElementById('singleStatsButton');
    singleQuizStats.onclick = singleStatsHandler;

    var ovrallStats = document.getElementById('overallStatsButton');
    ovrallStats.onclick = overallStatsHandler;

    var script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-latest.min.js";

    document.head.appendChild(script);
}

/* handles stats tab click */
function statsHandler() {

    document.getElementById('stats').className = "tab-pane active show";
    document.getElementById('home').className = "tab-pane";
    document.getElementById('quizzes').className = "tab-pane";


}

/* handles single stats button click event */
function singleStatsHandler() {

    var quizArray = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];
    var statslist = document.getElementById('quizStatslist')
    for (var quiz in quizArray) {
        var data = document.createElement('a');
        data.text = quizArray[quiz];
        data.classList.add('list-group-item');
        data.classList.add('list-group-action');
        data.href = '#';
        data.setAttribute('id', quizArray[quiz]);
        statslist.appendChild(data);
        //document.getElementById(quizArray[quiz]).onclick = chartDisplay(quizArray[quiz]);
        document.getElementById(quizArray[quiz]).onclick = function () {
            chartDisplay(quizArray[quiz]);
        };

    }
}

function chartDisplay(quizName) {

    var quizChartContainer = document.createElement('div');
    quizChartContainer.setAttribute('id', quizName + 'ChartContainer');

    var trace1 = {
        x: [quizName],
        y: [8],
        name: 'Pass',
        type: 'bar'
    };

    var trace2 = {
        x: [quizName],
        y: [48],
        name: 'Fail',
        type: 'bar'
    };

    var trace3 = {
        x: [quizName],
        y: [88],
        name: 'Procrastinators!',
        type: 'bar'
    };

    var statsdata = [trace1, trace2, trace3];
    var layout = { barmode: 'group' };
    document.getElementById(quizName).appendChild(quizChartContainer);
    Plotly.newPlot(quizName + 'ChartContainer', statsdata, layout);

}

/* handles overall stats button click event */
function overallStatsHandler() {
    var quizArray = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];
    var data0 = [8, 18, 28, 38];
    var data1 = [48, 58, 68, 78];
    var data2 = [88, 88, 88, 88]

    var trace1 = {
        x: quizArray,
        y: data0,
        name: 'Pass',
        type: 'bar'
    };

    var trace2 = {
        x: quizArray,
        y: data1,
        name: 'Fail',
        type: 'bar'
    };

    var trace3 = {
        x: quizArray,
        y: data2,
        name: 'Procrastinators!',
        type: 'bar'
    };

    var data = [trace1, trace2, trace3];
    var layout = { barmode: 'group' };

    Plotly.newPlot('chartContainer', data, layout);

}


