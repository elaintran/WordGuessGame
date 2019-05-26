var wordContainer = document.querySelector(".word-container");
var wrongLetters = document.querySelector(".wrong-letters");
var livesNumber = document.querySelector(".lives");
var gamesPlayed = document.querySelector(".played");
var wins = document.querySelector(".wins");

var words = ["tetris", "mario", "zelda", "pacman", "pokemon", "pong", "megaman", "frogger",
            "metroid", "kirby", "digimon", "tekken", "splatoon", "xenoblade"];

var guessedLetter = [];
var lives = 10;
var winsNumber = 0;
var gamesNumber = 1;

//generates random word from array
var randomWord = Math.floor(Math.random() * words.length);
var newWord = words[randomWord];
var remainingGuesses = newWord.length;
console.log(newWord);

function startOver() {
    guessedLetter = [];
    //lives = 10;
    randomWord = Math.floor(Math.random() * words.length);
    newWord = words[randomWord];
    remainingGuesses = newWord.length;
    var letterList = document.querySelectorAll(".letter");
    for(var i = 0; i < letterList.length; i++) {
        letterList[i].classList.remove("pressed");
    }
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

//indexOf === -1 means no letters found
function guess(letterPressed) {
    if (guessedLetter.indexOf(letterPressed) === -1) {
        guessedLetter.push(letterPressed);
        //inherit keypress letter
        wordGuess(letterPressed);
    }
    updateStats();
    console.log(guessedLetter);
}

//creates placeholder for random word
function wordHolder() {
    for (var i = 0; i < newWord.length; i++) {
        var hiddenLetter = document.createElement('div');
        hiddenLetter.setAttribute("class", "guess");
        wordContainer.appendChild(hiddenLetter);
    }
}
wordHolder();

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
            console.log(remainingGuesses);
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
            lives = 10;
            winsNumber++;
            gamesNumber++;
            livesNumber.innerText = lives;
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
    if (lives == 0) {
        lives = 10;
        livesNumber.innerText = lives;
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