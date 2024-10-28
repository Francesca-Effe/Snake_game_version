
/* const boardSize = 20; 
const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const newGameBtn = document.getElementById('newGameBtn');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let gameOver = false;
let gameInterval = null;
let isPaused = false;


highScoreElement.textContent = highScore;


function startGame() {
    setFoodPosition();
    document.addEventListener('keydown', changeDirection);
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
}


function updateGame() {
    if (gameOver || isPaused) return;

    moveSnake();
    if (checkCollision()) {
        gameOver = true;
        clearInterval(gameInterval);
        alert('Game Over');
    }

    if (snakeAteFood()) {
        score++;
        scoreElement.textContent = score;
        setFoodPosition();
        growSnake();
        updateHighScore();
    }

    renderGame();
}


function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0) head.x = boardSize - 1; // Wrap left to right
    if (head.x >= boardSize) head.x = 0;    // Wrap right to left
    if (head.y < 0) head.y = boardSize - 1; // Wrap top to bottom
    if (head.y >= boardSize) head.y = 0;  // Wrap bottom to top
    snake.unshift(head);
    snake.pop();
}


function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) return true;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}


function snakeAteFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}


function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y });
}


function renderGame() {
    gameBoard.innerHTML = '';


    snake.forEach((part) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${part.x * 20}px`;
        snakeElement.style.top = `${part.y * 20}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * 20}px`;
    foodElement.style.top = `${food.y * 20}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}


function setFoodPosition() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
    };
}


function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}


function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = highScore;
    }
}


pauseBtn.addEventListener('click', function () {
    if (isPaused) {
        gameInterval = setInterval(updateGame, 100);
        pauseBtn.textContent = 'Pause';
        isPaused = false;
    } else {
        clearInterval(gameInterval);
        pauseBtn.textContent = 'Resume';
        isPaused = true;
    }
});


restartBtn.addEventListener('click', function () {
    clearInterval(gameInterval);
    score = 0;
    scoreElement.textContent = score;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    gameOver = false;
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    startGame();
});


newGameBtn.addEventListener('click', function () {
    clearInterval(gameInterval);
    localStorage.setItem('highScore', 0); // Reset high score
    highScore = 0;
    highScoreElement.textContent = highScore;
    score = 0;
    scoreElement.textContent = score;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    gameOver = false;
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    startGame();
});


startGame(); */


// main.js

// Initialize variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 0, y: 0 };
let score = 0;
let highScore = 0;
let gameInterval;

// Get elements from the DOM
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

// Initialize high score from local storage
highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

// Functions to start, pause, and reset the game
function startGame() {
    gameInterval = setInterval(updateGame, 200);
}

// Drawing Function
function drawGame() {
    gameBoard.innerHTML = ""; // Clear previous frame
    snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}


function pauseGame() {
    clearInterval(gameInterval);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    startGame();
}

function updateGame() {
    moveSnake();
    if (isGameOver()) {
        clearInterval(gameInterval);
        alert("Game Over! Press New Game to try again.");
        return;
    }
    if (hasEatenFood()) {
        growSnake();
        placeFood();
        updateScore();
    }
    drawGame();
}

// Function to check if the device is mobile-sized
function isMobile() {
    return window.innerWidth < 769;
}

// Keyboard controls for desktop
function setupKeyboardControls() {
    document.addEventListener("keydown", handleKeyboardInput);
}

// Remove keyboard controls when not needed (e.g., on mobile)
function removeKeyboardControls() {
    document.removeEventListener("keydown", handleKeyboardInput);
}

function handleKeyboardInput(e) {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

// Mobile button controls
function setupButtonControls() {
    document.getElementById("upBtn").addEventListener("click", () => {
        if (direction.y === 0) direction = { x: 0, y: -1 };
    });
    document.getElementById("downBtn").addEventListener("click", () => {
        if (direction.y === 0) direction = { x: 0, y: 1 };
    });
    document.getElementById("leftBtn").addEventListener("click", () => {
        if (direction.x === 0) direction = { x: -1, y: 0 };
    });
    document.getElementById("rightBtn").addEventListener("click", () => {
        if (direction.x === 0) direction = { x: 1, y: 0 };
    });
}

// Remove mobile button controls if switching to desktop
function removeButtonControls() {
    document.getElementById("upBtn").removeEventListener("click", () => {});
    document.getElementById("downBtn").removeEventListener("click", () => {});
    document.getElementById("leftBtn").removeEventListener("click", () => {});
    document.getElementById("rightBtn").removeEventListener("click", () => {});
}

// Initialize controls based on the screen size
function initializeControls() {
    if (isMobile()) {
        setupButtonControls();
        removeKeyboardControls();
    } else {
        setupKeyboardControls();
        removeButtonControls();
    }
}

// Reinitialize controls when the screen size changes
window.addEventListener("resize", initializeControls);

// Call initializeControls on page load
initializeControls();

// Movement and Game Logic
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (!hasEatenFood()) {
        snake.pop(); // Remove tail if no food is eaten
    }
}

function isGameOver() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= 20 ||
        head.y >= 20 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function hasEatenFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function growSnake() {
    snake.push({ ...snake[snake.length - 1] });
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = highScore;
    }
}


// Button event listeners
document.getElementById("pauseBtn").addEventListener("click", pauseGame);
document.getElementById("restartBtn").addEventListener("click", resetGame);
document.getElementById("newGameBtn").addEventListener("click", resetGame);

// Initialize game on page load
startGame();
