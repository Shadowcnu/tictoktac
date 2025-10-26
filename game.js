const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const newBtn = document.getElementById("new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.getElementById("msg");

let turnO = true; // true = O's turn, false = X's turn
let count = 0; // Track moves for draw detection

// Winning combinations (index positions in the grid)
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check for a win
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

// Display winner message
const showWinner = (winner) => {
  msg.innerText = `🎉 ${winner} Wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes after win
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable boxes for a new game
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Handle draw
const drawGame = () => {
  msg.innerText = "😅 It's a Draw!";
  msgContainer.classList.remove("hide");
};

// Box click event
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#61dafb";
    } else {
      box.innerText = "X";
      box.style.color = "#ff5959";
    }
    box.disabled = true;
    turnO = !turnO;
    count++;

    let isWinner = checkWinner();
    if (isWinner) return;

    if (count === 9) drawGame();
  });
});

// Reset and New Game functions
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Button events
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
