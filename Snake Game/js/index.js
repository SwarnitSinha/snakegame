// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 14;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 5 }
];

food = { x: 3, y: 10 };

// Different Difficulty levels
let diff = document.getElementById("lev");

diff.addEventListener("change", function () {
    if (diff.value == "medium") {
        console.log("medium");
        speed = 14;
    }
    if (diff.value == "easy") {
        console.log("easy");
        speed = 10;
    }
    if (diff.value == "hard") {
        console.log("hard");
        speed = 18;
    }
    if (diff.value == "insane") {
        speed = 24;
        console.log("insane");
    }
    diff.blur();
});
// console.log(difficult.options.text);


// Game func.
function main(ctime) {
    musicSound.play();
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part1 :- Updating snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
    //If you have eaten the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part2:- Render(Display) the snake
    // let board = document.getElementsByClassName('board');

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        //snakeElement.classList.add('head');
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}





// main logic start here
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // e.preventDefault();
    inputDir = { x: 0, y: 1 };//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            e.preventDefault();
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            e.preventDefault();
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            e.preventDefault();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            e.preventDefault();
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});