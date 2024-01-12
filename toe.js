let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let turnO = true;
let clickCount = 0;
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

const resetGame = () => {
  turnO = true;
  clickCount = 0;
  enableBox();
  msgContainer.classList.add("hide");
};

const enableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "crimson";
  }
};

const disableBox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const dispalyWinner = (winner) => {
  message.innerText = `Congratulations! Winner is ${winner} 😇`;
  msgContainer.classList.remove("hide");
  disableBox();
};

const displayDraw = () => {
  message.innerText = "Game Draw! 🥲";
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (pattern of winPatterns) {
    posVal1 = boxes[pattern[0]].innerText;
    posVal2 = boxes[pattern[1]].innerText;
    posVal3 = boxes[pattern[2]].innerText;
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 == posVal2 && posVal2 == posVal3) {
        dispalyWinner(posVal1);
        return true;
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    clickCount++;
    let isDraw = checkWinner();
    if (clickCount == 9 && !isDraw) {
      displayDraw();
    }
    if (box.innerText == "X") {
      box.style.color = "green";
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
