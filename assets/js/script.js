// a variable for start time
let secondsLeft = 90;

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
let resultsDiv = document.getElementById("results");

// div for the choices
var choices = document.getElementById("choices");

var correct = document.getElementById("correct")

var wrong = document.getElementById("wrong")
    // an array to store high scores
let emptyArray = [];

// the array of high scores from local storage
let storageArray = JSON.parse(window.localStorage.getItem("highScores"));

// keeping track of which question we're on
var questionCount = 0;

//keeping score
let score = 0

//Timer starts when the user clicks startButton (see above).
function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "";
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            captureUserScore();
        }
    }, 1000);
}


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
                    // let user know if their correct
                    let answer = document.createElement("p");
                    answer.setAttribute("correct", "correct");
                    var body = document.querySelector('body')
                    body.appendChild(answer)
                    document.getElementsByTagName("p")[0].innerHTML = "Correct!";

                } else {
                    score -= 10;
                    secondsLeft = secondsLeft - 15;
                    // let user know if their wrong
                    let answer = document.createElement("p");
                    answer.setAttribute("wrong", "wrong");
                    var body = document.querySelector('body')
                    body.appendChild(answer)
                    document.getElementsByTagName("p")[0].innerHTML = "Wrong!";
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



function captureUserScore() {
    timer.remove();
    choices.textContent = "";

    let initialsInput = document.createElement("input");
    let postScoreBtn = document.createElement("input");

    resultsDiv.innerHTML = `You scored ${score} points! Enter initials: `;
    initialsInput.setAttribute("type", "text");
    postScoreBtn.setAttribute("type", "button");
    postScoreBtn.setAttribute("value", "Post My Score!");
    postScoreBtn.addEventListener("click", function(event) {
        event.preventDefault();
        let scoresArray = defineScoresArray(storageArray, emptyArray);

        let initials = initialsInput.value;
        let userAndScore = {
            initials: initials,
            score: score,
        };

        scoresArray.push(userAndScore);
        saveScores(scoresArray);
        displayAllScores();
        clearScoresBtn();
        tryAgainBtn();
        viewScoresBtn.remove();
    });
    resultsDiv.append(initialsInput);
    resultsDiv.append(postScoreBtn);
}

//saves scores to local storage
const saveScores = (array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));
}

//used as conditional to set storageArray and Empty array values
const defineScoresArray = (arr1, arr2) => {
    if (arr1 !== null) {
        return arr1
    } else {
        return arr2
    }
}

// removes element from class
const removeEls = (...els) => {
    for (let el of els) el.remove();
}

//displays scores 
function displayAllScores() {
    //removes questions that are stuck in a loop for incompletion or pass of the quiz
    // removes elements at score display
    removeEls(timer, startButton, resultsDiv, questionDiv);
    let scoresArray = defineScoresArray(storageArray, emptyArray);

    scoresArray.forEach(obj => {
        let initials = obj.initials;
        let storedScore = obj.score;
        let resultsP = document.createElement("p");
        resultsP.innerText = `${initials}: ${storedScore}`;
        scoresDiv.append(resultsP);
    });
}

//view scores function and buttons functionality
function viewScores() {

    viewScoresBtn.addEventListener("click", function(event) {
        event.preventDefault();
        removeEls(timer, startButton);
        displayAllScores();
        removeEls(viewScoresBtn);
        clearScoresBtn();
        tryAgainBtn();
        localStorage.setItem("scores", JSON.stringify(storedScore));
    });
}

//clear scores function and buttons functionality
function clearScoresBtn() {
    let clearBtn = document.createElement("input");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("value", "Clear Scores");
    clearBtn.addEventListener("click", function(event) {
        event.preventDefault();
        removeEls(scoresDiv);
        window.localStorage.removeItem("highScores");
    })
    scoresDiv.append(clearBtn)
}

//try again button to try to get a hight score
function tryAgainBtn() {
    let backBtn = document.createElement("input");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("value", "Try Again");
    backBtn.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.reload();
    })
    buttonsDiv.append(backBtn)
}




viewScores();