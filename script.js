let submitGuess = document.querySelector("#submitGuess");
let guessField = document.querySelector("#guessField");
let previousGuess = document.querySelector(".previousGuess");
let result = document.querySelector(".result");
let lastGuess = document.querySelector(".lastGuess");
let guessCount = 1;
let randomNum = Math.floor(Math.random() * 100);
let resetBtn;

function checkGuess(params) {
  let userGuess = parseInt(guessField.value);

  if (guessCount === 1) {
    previousGuess.textContent = `Previous guess was : `;
    previousGuess.style.backgroundColor = "lightgrey";
  }

  previousGuess.textContent = `${previousGuess.textContent} ${userGuess}`;
  previousGuess.style.padding = '0.5rem'

  if (userGuess === randomNum) {
    result.textContent = `Congratulations, You've guessed the right number.`;
    result.style.backgroundColor = "green";
    lastGuess.textContent = "";
    lastGuess.style.backgroundColor = "white";
    gameOver();
  } else if (guessCount === 10) {
    result.textContent = `! Game Over ! Try again ..`;
    lastGuess.textContent = "";
    gameOver();
  } else {
    result.textContent = "Wrong!";
    result.style.backgroundColor = "red";
    result.style.padding = '0.5rem'
    if (userGuess > randomNum) {
      lastGuess.textContent = "Last guess was too high!";
      lastGuess.style.backgroundColor = "lightgrey";
      lastGuess.style.padding = '0.5rem'
    } else if (userGuess < randomNum) {
      lastGuess.textContent = "Last guess was too low!";
      lastGuess.style.backgroundColor = "lightgrey";
      lastGuess.style.padding = '0.5rem'
    }
  }

  guessCount++;
  guessField.focus();
  guessField.value = "";
}

submitGuess.addEventListener("click", checkGuess);

function gameOver(params) {
    guessField.disabled = true;
    guessField.style.cursor = 'not-allowed'
    submitGuess.disabled = true;
    submitGuess.style.cursor = 'not-allowed';
    lastGuess.style.padding = '0'
    resetBtn = document.createElement('button');
    resetBtn.textContent = 'Start New Game';
    resetBtn.style.fontWeight = 'bold'
    resetBtn.style.fontSize = '1rem';
    document.body.append(resetBtn);
    resetBtn.onmouseover = ()=>{
        resetBtn.style.cursor = 'pointer'
    }
    resetBtn.addEventListener('click', resetGame)
}

function resetGame(params) {
    guessCount = 1
    guessField.disabled = false;
    submitGuess.disabled = false;
    guessField.style.cursor = 'auto';
    submitGuess.style.cursor = 'pointer';

    const resultParagraph = document.querySelectorAll('.resultParagraph div');
    for (const iterator of resultParagraph) {
        iterator.textContent = '';
        iterator.style.padding = '0'
    }
    resetBtn.parentNode.removeChild(resetBtn)

    guessField.focus();
    randomNum = Math.floor(Math.random() * 100);
}