(function() {
  "use strict";
  var availableLetters,
    words,
    guessInput,
    guess,
    guessButton,
    lettersGuessed,
    lettersMatched,
    output,
    wordPlace,
    letters,
    attempts,
    currentWord,
    numLettersMatched,
    messages;

  function setup() {
    availableLetters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    attempts = 6;
    //words to guess
    words = [
      "Snofru",
      "Tutankhamun",
      "Ekhnaton",
      "Tutmose",
      "Djoser",
      "Cleopatra",
      "Ramses",
      "Horemheb",
      "Hatshepsut",
      "Ankhensenamon",
      "Hetepheres",
      "Themistocle",
      "Leonidas",
      "Xerxes",
      "Hannibal",
      "Hazdrubal",
      "Augustus",
      "Caligula",
      "Germanicus",
      "Claudius",
      "Arminius",
      "Vercengetorix",
      "Decebalus",
      "Eleasar",
      "Caesar",
      "Odoaker",
      "Atilla"
    ];
    messages = {
      win: "Congrats! Your guess was right!",
      lose: "Game over, try again!",
      guessed: " already guessed, please try again...",
      validLetter: "Please enter a capital letter from A-Z"
    };

    lettersGuessed = lettersMatched = "";
    numLettersMatched = 0;

    //word randomisation
    currentWord = words[Math.floor(Math.random() * words.length)];

    output = document.getElementById("output");
    wordPlace = document.getElementById("wordPlace");
    guessInput = document.getElementById("letter");

    wordPlace.innerHTML = "You have " + attempts + " attempts remaining";
    output.innerHTML = "";

    document.getElementById("letter").value = "";

    guessButton = document.getElementById("guess");
    guessInput.style.display = "inline";
    guessButton.style.display = "inline";

    /* set up display of letters in current word */
    letters = document.getElementById("letters");
    letters.innerHTML = '<li class="current-word">Current word:</li>';

    var letter, i;
    for (i = 0; i < currentWord.length; i++) {
      letter =
        '<li class="letter letter' +
        currentWord.charAt(i).toUpperCase() +
        '">' +
        currentWord.charAt(i).toUpperCase() +
        "</li>";
      letters.insertAdjacentHTML("beforeend", letter);
    }
  }

  function gameOver(win) {
    if (win) {
      output.innerHTML = messages.win;
      output.classList.add("win");
    } else {
      output.innerHTML = messages.lose;
      output.classList.add("error");
    }

    guessInput.style.display = guessButton.style.display = "none";
    guessInput.value = "";
  }

  //starting
  window.onload = setup();

  //restart
  document.getElementById("restart").onclick = setup;

  //
  guessInput.onclick = function() {
    this.value = "";
  };

  //guess function
  document.getElementById("hangman").onsubmit = function(e) {
    if (e.preventDefault) e.preventDefault();
    output.innerHTML = "";
    output.classList.remove("error", "warning");
    guess = guessInput.value;

    if (guess) {
      //if guess is good
      if (availableLetters.indexOf(guess) > -1) {
        //if is already used
        if (
          (lettersMatched && lettersMatched.indexOf(guess) > -1) ||
          (lettersGuessed && lettersGuessed.indexOf(guess) > -1)
        ) {
          output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
          output.classList.add("warning");
        } else if (currentWord.indexOf(guess) > -1) {
          //Does guess exist in a word?
          var lettersToShow;
          lettersToShow = document.querySelectorAll(
            ".letter" + guess.toUpperCase()
          );

          for (var i = 0; i < lettersToShow.length; i++) {
            lettersToShow[i].classList.add("correct");
          }

          //checking if letter is  not multiplied
          for (var j = 0; j < currentWord.length; j++) {
            if (currentWord.charAt(j) === guess) {
              numLettersMatched += 1;
            }
          }

          lettersMatched += guess;
          if (numLettersMatched === currentWord.length) {
            gameOver(true);
          }
        } else {
          //guess was not used before and is invalid
          lettersGuessed += guess;
          attempts--;
          wordPlace.innerHTML = "You have " + attempts + " attempts remaining";
          if (attempts === 0) gameOver();
        }
      } else {
        //if guess is not a letter
        output.classList.add("error");
        output.innerHTML = messages.validLetter;
      }
    } else {
      // if no guess is entered
      output.classList.add("error");
      output.innerHTML = messages.validLetter;
    }
    return false;
  };
})();
//MODAL Rules
//getting modal
var modal = document.getElementById("ModalRules");
//opening it
var btn = document.getElementById("btnRules");
//closing
var span = document.getElementsByClassName("close")[0];
//
btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
