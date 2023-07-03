// // Welcome message
console.log("Welcome to Tic Tac Toe");

// Audio elements
let audioturn = new Audio("Ting.mp3");
let gameover = new Audio("gameover.wav");

// Game variables
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isDraw = checkDraw();
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".Info").innerText =
        boxtext[e[0]].innerText + " won";
      isgameover = true;
      document.querySelector('.imagbox').getElementsByTagName('img')[0].style.width="200px";
    }
  });
  if (isDraw && !isgameover) {
    document.querySelector(".Info").innerText = "It's a draw!";
    isgameover = true;
  }
};

// Function to check for a draw
const checkDraw = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  for (let i = 0; i < boxtext.length; i++) {
    if (boxtext[i].innerText === "") {
      return false; // Found an empty cell, game is not a draw
    }
  }
  return true; // All cells are filled, game is a draw
};

// Game logic
const init = () => {
  // Initialize game variables
  turn = "X";
  isgameover = false;

  // Clear the board display
  clearBoardDisplay();

  // Display initial message
  displayMessage(`Turn for ${turn}`);

  // Add event listeners to each cell
  let boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", (e) => {
      if (boxtext.innerText === "") {
        boxtext.innerText = turn;
        turn = changeTurn();
        audioturn.play();
        checkWin();
        if (!isgameover) {
          document.getElementsByClassName("Info")[0].innerText =
            "Turn for " + turn;
        }
      }
    });
  });
};

// Function to clear the board display
const clearBoardDisplay = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  boxtexts.forEach((element) => {
    element.innerText = "";
  });
  document.querySelector('.imagbox').getElementsByTagName('img')[0].style.width="0px";
};

// Function to display a message
const displayMessage = (message) => {
  document.getElementById("message").innerText = message;
};

// Add event listener to reset button
reset.addEventListener("click", () => {
  init();
});

// Initialize the game
init();
