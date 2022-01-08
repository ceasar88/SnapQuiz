import './../../back_end/meta.js';
import staticHtml from './home2.html';
import theme from './../theme.scss';
import bootstrap from './../../node_modules/bootstrap/dist/js/bootstrap.js'
import $ from 'jquery'
import mock1 from './../../mock_data/Class1Quiz1.json'
import mock2 from './../../mock_data/Class1Quiz2.json'

function loadMockJson(url) {
    var mock_quizzes = [mock1, mock2];
    return mock_quizzes;
}

function getOpenQuizzes(course) {
    //Replace this email constant with this.getEmail() or whatever
    //Get all open quizzes from our database and store in array
    //Can also get time quiz was made and count up to count
    //"open for x minutes and y seconds"

    //var quizzes = queryDatabase(email, "getOpenQuizzes");
    //var quizzes = ["Class 1 - Quiz 1", "Class 1 - Quiz 2", "Class 2 - Quiz 3", "Class 3 - Quiz 4", "Class 3 - Quiz 5"];
    var openQuizzes = loadMockJson();
    return openQuizzes;
}

function populateOpenQuiz(course) {
    var quizzes = getOpenQuizzes(course);
    if (quizzes.length > 0) {
        var container = document.getElementById('open-tab');
        var badge = document.createElement('span');
        badge.classList.add('badge');
        badge.classList.add('badge-warning');
        badge.classList.add('badge-pill');
        badge.innerText = quizzes.length;
        container.appendChild(badge);

        container = document.getElementById('open');

        var header = document.createElement('h3');
        header.innerHTML = "Open Quizzes";

        var list = document.getElementById('openquizlist');

        quizzes.forEach(function (value) {
            var a = document.createElement('a');
            a.classList.add('list-group-item');
            a.classList.add('list-group-action');
            a.id = value.quiz_title + "-tab";
            a.href = "#" + value.quiz_title;
            a.innerHTML = value.quiz_title;
            a.style.fontSize = "large";

            list.appendChild(a);
        });

        container.appendChild(header);
        container.appendChild(list);
        return container;
    }
    else {
        return null;
    }
}

function getRecentActivity(stuID) {
    var recentActivity = [["Scored a 100 on the test and you're super smart and blah blah long text", "timeAgo1"], ["Item 2", "timeAgo2"], ["Item 3", "timeAgo3"]];
    return recentActivity;
}

function populateRecentActivity(stuID) {
    //Idea: only use the most recent activity that fits with the # open quizzes, and if
    //there are none then keep it to a lowish number
    var recentActivity = getRecentActivity(stuID);
    if (recentActivity.length > 0) {
        var container = document.getElementById('recent-tab');
        var badge = document.createElement('span');
        badge.classList.add('badge');
        badge.classList.add('badge-info');
        badge.classList.add('badge-pill');
        badge.innerText = recentActivity.length;
        container.appendChild(badge);

        container = document.getElementById('recent');

        var header = document.createElement('h3');
        header.innerHTML = "Recent Activity";

        var list = document.getElementById('recentlist');

        recentActivity.forEach(function (value) {
            var div = document.createElement('div');
            div.classList.add('list-group-item');
            div.innerHTML = value[0];
            div.style.fontSize = "large";

            list.appendChild(div);
        });

        container.appendChild(header);
        container.appendChild(list);
        return container;
    }
    else {
        return null;
    }
}

function getClasses(email) {
    var classList = ["CS5201 - C++ Jutsu", "CS5200 - Analysis of AlGOREithms", "CS2500 - The Sabharwal Strikes Back"];
    return classList;
}

function populateClassList(email) {
    var classList = getClasses(email);
    if (classList.length > 0) {
        var container = document.getElementById('courses');

        var header = document.createElement('h3');
        header.innerHTML = "Classes";

        var list = document.getElementById('courselist');

        classList.forEach(function (value) {
            var a = document.createElement('a');
            a.classList.add('list-group-item');
            a.classList.add('list-group-action');
            a.id = value + "-tab";
            a.href = "#" + value;
            //a.setAttribute('data-toggle', 'pill');
            a.role = 'tab';
            a.innerHTML = value;
            a.style.fontSize = "large";

            list.appendChild(a);
        });

        container.appendChild(header);
        container.appendChild(list);

        return container;
    }
    else {
        return null;
    }
}

//Create bootstrap container
var container = document.createElement('div');
container.classList.add('container');

//Add div to put static HTML in
var injectDiv = document.createElement('div');
injectDiv.innerHTML = staticHtml;


container.appendChild(injectDiv);
document.body.appendChild(container);

var openQuizBlock = populateOpenQuiz("whatever@heh.com");
var recentActivityBlock = populateRecentActivity("whatever@heh.com");

//Check if both will be displayed for formatting purposes
if (openQuizBlock != null && recentActivityBlock != null) {
    //openQuizBlock.classList.add('col-sm-5');
    var spacerDiv = document.createElement('div');
    //spacerDiv.classList.add('col-sm-2');
    //recentActivityBlock.classList.add('col-sm-5');

    $("#mainBar").append(openQuizBlock);
    $("#mainBar").append(spacerDiv);
    $("#mainBar").append(recentActivityBlock);
}
else {
    if (openQuizBlock != null) {
        openQuizBlock.classList.add('col');
    }
    if (recentActivityBlock != null) {
        recentActivityBlock.classList.add('col');
    }
    $("#mainBar").append(openQuizBlock);
    $("#mainBar").append(recentActivityBlock);
}

//Populate class block below
var classBlock = populateClassList("whatever@heh.com");
$("#classBar").append(classBlock);
