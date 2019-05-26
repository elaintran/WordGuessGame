var wordContainer = document.querySelector(".word-container");
var wrongLetters = document.querySelector(".wrong-letters");
var livesNumber = document.querySelector(".lives");
var gamesPlayed = document.querySelector(".played");
var wins = document.querySelector(".wins");

var words = ["mario", "luigi", "peach", "daisy", "wario", "bowser", "toad",
            "goomba", "koopa", "yoshi", "birdo", "boo", "fuzzy", "lakitu"];

var guessedLetter = [];
var lives;
var winsNumber = 0;
var gamesNumber = 1;
var randomWord;
var newWord;
var remainingGuesses;

function startOver() {
    guessedLetter = [];
    //reset lives
    lives = 10;
    livesNumber.innerText = lives;
    //generates random word from array
    randomWord = Math.floor(Math.random() * words.length);
    newWord = words[randomWord];
    remainingGuesses = newWord.length;
    //clear guess container
    while (wordContainer.hasChildNodes()) {
        wordContainer.removeChild(wordContainer.lastChild);
    }
    //clear wrong letters
    while (wrongLetters.hasChildNodes()) {
        wrongLetters.removeChild(wrongLetters.lastChild);
    }
    wordHolder();
    console.log(newWord);
}
startOver();

//indexOf === -1 means no letters found
function guess(letterPressed) {
    if (guessedLetter.indexOf(letterPressed) === -1) {
        guessedLetter.push(letterPressed);
        //inherit keypress letter
        wordGuess(letterPressed);
    }
    updateStats();
}

//creates placeholder for random word
function wordHolder() {
    for (var i = 0; i < newWord.length; i++) {
        var hiddenLetter = document.createElement('div');
        hiddenLetter.setAttribute("class", "guess");
        wordContainer.appendChild(hiddenLetter);
    }
}

//check letter and replace placeholder with correct letter
function wordGuess(letterPressed) {
    var found = false;
    for (var i = 0; i < newWord.length; i++) {
        if (newWord[i] === letterPressed) {
            var shownLetter = document.createElement('div');
            shownLetter.setAttribute("class", "correct-guess");
            var guessName = document.createElement('h2');
            var guessText = document.createTextNode(letterPressed);
            guessName.appendChild(guessText);
            shownLetter.appendChild(guessName);
            wordContainer.children[i].replaceWith(shownLetter);
            found = true;
            remainingGuesses--;
        }
    }
    //subtract lives if letter not found
    if (found == false) {
        if (lives > 0) {
            lives--;
            //create wrong letter container
            livesNumber.innerText = "0" + lives;
            var wrongLetterContainer = document.createElement('div');
            wrongLetterContainer.setAttribute("class", "letter");
            var letterName = document.createElement("h3");
            var letterText = document.createTextNode(letterPressed);
            letterName.appendChild(letterText);
            wrongLetters.appendChild(wrongLetterContainer).appendChild(letterName);
        } else {
            livesNumber.innerText = "00";
        }
    }
}

function updateStats() {
    //delay before new game to see word after winning
    setTimeout(function() {
        if (remainingGuesses == 0) {
            winsNumber++;
            gamesNumber++;
            if (winsNumber < 10) {
                wins.innerText = "0" + winsNumber;
            } else {
                wins.innerText = winsNumber;
            }
            if (gamesNumber < 10) {
                gamesPlayed.innerText = "0" + gamesNumber;
            } else {
                gamesPlayed.innerText = gamesNumber;
            }
            startOver();
        }
    }, 2000);
    //update games and start game over if lose
    if (lives == 0) {
        gamesNumber++;
        if (gamesNumber < 10) {
            gamesPlayed.innerText = "0" + gamesNumber;
        } else {
            gamesPlayed.innerText = gamesNumber;
        }
        startOver();
    }
}

//get letter input from key a-z
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        guess(event.key.toLowerCase());
    }
}