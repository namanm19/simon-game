document.addEventListener("DOMContentLoaded", function () {
  const btns = document.querySelectorAll(".btn");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const scoreDisplay = document.getElementById("score");

  const audio = {
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
  };

  let sequence = [];
  let playerSequence = [];
  let score = 0;

  function playSequence() {
    disableButtons();
    setTimeout(() => {
      sequence.forEach((color, index) => {
        setTimeout(() => {
          lightUpButton(color);
          playSound(color);
        }, 600 * index);
      });
      setTimeout(() => {
        enableButtons();
      }, 600 * sequence.length);
    }, 1000);
  }

  function lightUpButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 300);
  }

  function disableButtons() {
    btns.forEach((btn) => {
      btn.removeEventListener("click", handleButtonClick);
    });
    restartBtn.removeEventListener("click", resetGame);
    // Remove the following line to remove the event listener for the stop button
    // stopBtn.removeEventListener('click', stopGame);
  }

  function enableButtons() {
    btns.forEach((btn) => {
      btn.addEventListener("click", handleButtonClick);
    });
    restartBtn.addEventListener("click", resetGame);
    // Remove the following line to remove the event listener for the stop button
    // stopBtn.addEventListener('click', stopGame);
  }

  function handleButtonClick(event) {
    const clickedColor = event.target.id;
    lightUpButton(clickedColor);
    playSound(clickedColor);
    playerSequence.push(clickedColor);

    if (playerSequence.length === sequence.length) {
      checkSequence();
    }
  }

  function playSound(color) {
    audio[color].currentTime = 0;
    audio[color].play();
  }

  function checkSequence() {
    if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      playerSequence = [];
      generateNextStep();
    } else {
      alert(`Game over! Your score is ${score}.`);
      resetGame();
    }
  }

  function generateNextStep() {
    const colors = ["green", "red", "yellow", "blue"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playSequence();
  }

  function startGame() {
    startBtn.disabled = true;
    score = 0;
    sequence = [];
    playerSequence = [];
    scoreDisplay.textContent = `Score: ${score}`;
    generateNextStep();
  }

  function resetGame() {
    startBtn.disabled = false;
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  startBtn.addEventListener("click", startGame);
});
