const WORD = "DAVID";
let keysPressed = [];
const keys = document.querySelectorAll(".key");
const gameGrid = document.querySelector(".game-grid");
// const keyboard = document.querySelector('.keyboard-grid');

function startInteraction() {
  // keyboard.addEventListener('click', handleClick);
  document.addEventListener("keydown", handleKey);
}

// function handleClick(e) {
//     // console.log(e);
//     if (e.target === e.key) {
//         console.log('hi')
//     }
// }

// calls respective function for 'enter', 'backspace/delete', and letters
function handleKey(e) {
  // if enter
  if (e.key === "Enter") {
    submitGuess();
    return;
    // if backspace/delete
  } else if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
    // if letter
  } else if (e.key.length === 1 && e.key.toUpperCase().match(/[a-z]/i)) {
    pressKey(e.key.toUpperCase());
    return;
  }
}

// submits guess and checks
function submitGuess() {
  const wordLength = keysPressed.length;
  if (wordLength < 5) {
    alert("Word must have 5 letters!");
  } else {
    const guessedWord = keysPressed.join("");
    keysPressed = [];
    // if (guessedWord === WORD) {
    //   alert("HURRAY!");
    // }
    checkGuess(guessedWord);
    makeInactive();
  }
}
// add the coloring to the user's guess
function checkGuess(guess) {
  let activeTiles = gameGrid.querySelectorAll("[data-state='active']");

  // guess as a list, WORD as a list
  let guessList = guess.split("");
  let answerList = WORD.split("");

  // take away correct letters from answerList and guessList and make color in grid green
  for (let i in guessList) {
    if (guessList[i] === answerList[i]) {
      activeTiles[i].classList.add("correct");
      answerList[i] = null;
      guessList[i] = null;
    }
  }

  // take away letters in incorrect position in guessList from answerList and make color yellow
  // make letters in guessList that are not in answerList gray
  for (let i in guessList) {
    if (guessList[i] !== null && answerList.includes(guessList[i])) {
      activeTiles[i].classList.add("incorrectPos");
      answerList[answerList.indexOf(guessList[i])] = null;
    } else {
      activeTiles[i].classList.add("wrong");
    }
  }
}

// After user submits guess, make active tiles inactive
function makeInactive() {
  let activeTiles = getActiveTiles();
  for (let tile of activeTiles) {
    tile.dataset.state = "inactive";
  }
}

// Deletes key
function deleteKey() {
  // remove data state, letter
  // remove from keysPressed
  let activeTiles = getActiveTiles();
  let curTile = activeTiles[activeTiles.length - 1];
  if (curTile == null) {
    return;
  } else {
    delete curTile.dataset.state;
    curTile.innerHTML = "";
    keysPressed.pop();
  }
}

// Adds key
function pressKey(key) {
  // get active tiles
  let activeTiles = getActiveTiles();
  if (activeTiles.length >= 5) {
    return;
  }
  // get the first tile that's not active and make it active, set letter, and add to keysPressed
  let tile = gameGrid.querySelector(":not([data-state])");
  tile.dataset.state = "active";
  tile.innerHTML = key;
  keysPressed.push(key);
}

// get active tiles
function getActiveTiles() {
  return gameGrid.querySelectorAll("[data-state='active']");
}

startInteraction();
