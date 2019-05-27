var mainContainer = document.querySelector(".main-container");
var wordContainer = document.querySelector(".word-container");
var wrongLetters = document.querySelector(".wrong-letters");
var lives = document.querySelector(".lives");
var gamesPlayed = document.querySelector(".played");
var wins = document.querySelector(".wins");

var words = ["mario", "luigi", "peach", "daisy", "wario", "bowser", "toad",
            "goomba", "koopa", "yoshi", "birdo", "boo", "fuzzy", "lakitu"];

var guessedLetter = [];
var livesNumber;
var winsNumber = 0;
var gamesNumber = 1;
var randomWord;
var newWord;
var remainingGuesses;

function startOver() {
    guessedLetter = [];
    //reset lives
    livesNumber = 10;
    lives.innerText = livesNumber;
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

//indexOf === -1 prevents same letter from being pushed
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
        if (livesNumber > 0) {
            livesNumber--;
            //create wrong letter container
            lives.innerText = "0" + livesNumber;
            var wrongLetterContainer = document.createElement('div');
            wrongLetterContainer.setAttribute("class", "letter");
            var letterName = document.createElement("h3");
            var letterText = document.createTextNode(letterPressed);
            letterName.appendChild(letterText);
            wrongLetters.appendChild(wrongLetterContainer).appendChild(letterName);
        } else {
            lives.innerText = "00";
        }
    }
    overflow();
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
    if (livesNumber == 0) {
        gamesNumber++;
        if (gamesNumber < 10) {
            gamesPlayed.innerText = "0" + gamesNumber;
        } else {
            gamesPlayed.innerText = gamesNumber;
        }
        startOver();
    }
}

//adjust vertical overflow
function overflow() {
	if (mainContainer.scrollHeight > mainContainer.clientHeight) {
		mainContainer.style.display = "block";
        mainContainer.style.height = "auto";
        mainContainer.style.padding = "10% 0";
	} else {
		mainContainer.removeAttribute("style");
	}
}

//get letter input from key a-z
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        guess(event.key.toLowerCase());
    }
}