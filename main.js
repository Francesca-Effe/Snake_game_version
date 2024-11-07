const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 20;


function resizeCanvas() {
    const canvasSize = Math.min(window.innerWidth * 0.8, 400); // Set a max limit for the canvas size
    canvas.width = canvasSize;
    canvas.height = canvasSize;
}


window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let direction = null; 
let gameInterval = null;

const snakeImg = new Image();
snakeImg.src = 'water-drop.png';
const foodImg = new Image();
foodImg.src = 'sun.png';

document.getElementById('highScore').textContent = highScore;

const gameOverMessage = document.getElementById('gameOverMessage');

snakeImg.onload = foodImg.onload = function () {
  startGame();
};

function drawSnake() {
  snake.forEach(part => {
    ctx.drawImage(snakeImg, part.x, part.y, boxSize, boxSize);
  });
}

function drawFood() {
  ctx.drawImage(foodImg, food.x, food.y, boxSize, boxSize);
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
  food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
}

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === 'up') head.y -= boxSize;
  if (direction === 'down') head.y += boxSize;
  if (direction === 'left') head.x -= boxSize;
  if (direction === 'right') head.x += boxSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(part => part.x === head.x && part.y === head.y)
  ) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameInterval);
  gameInterval = null; 
  gameOverMessage.style.display = 'block';

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('highScore').textContent = highScore;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
}

function startGame() {
  direction = null;
  snake = [{ x: 200, y: 200 }];
  score = 0;
  document.getElementById('score').textContent = score;
  spawnFood();

  gameOverMessage.style.display = 'none';
  gameInterval = setInterval(gameLoop, 300);
}


document.getElementById('startButton').onclick = startGame;

document.getElementById('pauseButton').onclick = () => {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  } else {
    gameInterval = setInterval(gameLoop, 300);
  }
};

document.getElementById('newGameButton').onclick = () => {
  clearInterval(gameInterval);
  startGame();
};

document.getElementById('upButton').onclick = () => {
  if (direction !== 'down') direction = 'up';
};
document.getElementById('downButton').onclick = () => {
  if (direction !== 'up') direction = 'down';
};
document.getElementById('leftButton').onclick = () => {
  if (direction !== 'right') direction = 'left';
};
document.getElementById('rightButton').onclick = () => {
  if (direction !== 'left') direction = 'right';
};


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    }
    if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
    if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    }
    if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});
