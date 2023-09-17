let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let gameBoard = document.getElementById("gB");

let score=0;

let gameBoardRows = 18;
let gameBoardColumns = 18;

let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 12, y: 10 };

function main(ctime) {
    window.requestAnimationFrame(main);
    // musicSound.play();
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(arr) {
    // Check for collision with walls
    if (arr[0].x >= gameBoardColumns || arr[0].x < 0 || arr[0].y >= gameBoardRows || arr[0].y < 0) {
      return true;
    }
  
    // Check for collision with the snake's body
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].x === arr[0].x && arr[i].y === arr[0].y) {
        return true;
      }
    }
  
    return false;
  }
  

function gameEngine() {
    // part1: update snakeArr and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    if(snakeArr[0].x===food.x && snakeArr[0].y==food.y){
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y +inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake
    for(let i=snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part2: Display snake and food 
    gameBoard.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakeBodyEl');
        }
        gameBoard.appendChild(snakeElement);
    })

    foodEl = document.createElement('div');
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    foodEl.classList.add('food');
    gameBoard.appendChild(foodEl);
}

window.requestAnimationFrame(main);

// Add touch event listeners to the canvas
window.addEventListener("touchstart", handleTouchStart, false);
window.addEventListener("touchmove", handleTouchMove, false);

let touchStartX, touchStartY;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!touchStartX || !touchStartY) return;

  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0) {
      if (inputDir.x !== -1) {
        inputDir = { x: 1, y: 0 };
      }
    } else {
      if (inputDir.x !== 1) {
        inputDir = { x: -1, y: 0 };
      }
    }
  } else {
    // Vertical swipe
    if (deltaY > 0) {
      if (inputDir.y !== -1) {
        inputDir = { x: 0, y: 1 };
      }
    } else {
      if (inputDir.y !== 1) {
        inputDir = { x: 0, y: -1 };
      }
    }
  }

  touchStartX = 0;
  touchStartY = 0;
}

window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }//starts the game
    moveSound.play();
    // console.log(e);
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
    }
});