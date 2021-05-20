// a variable for start time
let secondsLeft = 76;

//the element that displays the time
let timer = document.getElementById("timer");

//div for high scores
let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")

//button for high scores
let viewScoresBtn = document.getElementById("view-scores")

//start button div
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);


// variable for the questions title
var questionDiv = document.getElementById("question-div");

// div to hold the results
let results = document.getElementById("results");

// div for the choices
var choices = document.getElementById("choices");


// an array to store high scores
let emptyArray = [];

// the array of high scores from local storage
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

// keeping track of which question we're on
var questionCount = 0;

//keeping score
let score = 0


//function to load the questions on the page
function displayQuestions() {
    removeEls(startButton);

    if (questionCount < questions.length) {
        questionDiv.innerHTML = questions[questionCount].title;
        choices.textContent = "";

        for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
            let el = document.createElement("button");
            el.innerText = questions[questionCount].multiChoice[i];
            el.setAttribute("data-id", i);
            el.addEventListener("click", function(event) {
                event.stopPropagation();

                if (el.innerText === questions[questionCount].answer) {
                    score += secondsLeft;
                } else {
                    score -= 10;
                    secondsLeft = secondsLeft - 15;
                }

                questionDiv.innerHTML = "";

                if (questionCount === questions.length) {
                    return;
                } else {
                    questionCount++;
                    displayQuestions();
                }
            });
            choices.append(el);
        }
    }
}