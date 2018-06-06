var canvas;
var canvasContext;

var canvasWidth = 800;
var canvasHeight = 1000;

var gameWidth = 800;
var gameHeight = 800;

var canvasBackgroundColor = "white";

var tickCounter = 0;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

var gridWidth = 20;
var gridHeight = 20;

var snake = [];

var headXpos = gridWidth / 2;
var headYpos = gridHeight / 2;

var headXvel = 0;
var headYvel = 0;

var appleX;
var appleY;
var appleEatten = false;

var score = 0;

var lost = false;
var correctApplePos;

var moved = false;

function snakeBody(x, y) {
    var X = x;
    var Y = y;
}

window.onload = function() {
    canvas = this.document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var fps = 30;
    initSnake();
    this.setInterval(game, 1000 / fps);
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
}

function game() {
    if (!lost) {
        tickCounter++;
        playerInput();
        if (tickCounter % 8 == 0) {
            engine();
            drawEverything();
        }
    } else lostScreen();
}

function engine() {
    var tempX;
    var tempY;

    headXpos += headXvel;
    headYpos += headYvel;

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].X = snake[i - 1].X;
        snake[i].Y = snake[i - 1].Y;
    }
    moved = false;

    snake[0].X = headXpos;
    snake[0].Y = headYpos;

    if (headXpos == appleX && headYpos == appleY) {
        do {
            correctApplePos = true;

            appleX = Math.floor(Math.random() * gridWidth);
            appleY = Math.floor(Math.random() * gridHeight);

            for (let j = 0; j < snake.length; j++) {
                if (appleX == snake[j].X && appleY == snake[j].Y)
                    correctApplePos = false;
            }
        } while (!correctApplePos);
        console.log("Apple eaten! Snake length: " + snake.length);
        var sn = new snakeBody(-1, -1);
        snake.push(sn);
        score += 10;
    }

    for (let i = 1; i < snake.length; i++) {
        if ((snake[i].X == snake[0].X && snake[i].Y == snake[0].Y)) {
            lost = true;
            console.log("You lost!");
        }
    }
    if (snake[0].X < 0 || snake[0].Y < 0 || snake[0].X >= gridWidth || snake[0].Y >= gridHeight) {
        lost = true;
        console.log("You lost!");
    }
}

function drawEverything() {
    drawRect(0, 0, canvasWidth, canvasHeight - 200, "black");
    drawRect(5, 5, canvasWidth - 10, canvasHeight - 210, canvasBackgroundColor);
    for (let i = 0; i < snake.length; i++) {
        drawRect(5 + (snake[i].X * (canvasWidth / gridWidth)), 5 + (snake[i].Y * (gameHeight / gridHeight)), (canvasWidth / gridWidth) - 10, (gameHeight / gridHeight) - 10, "black");
    }
    drawRect(0, canvasHeight - 200, canvasWidth, 200, "Grey");
    drawRect(5 + (appleX * (canvasWidth / gridWidth)), 5 + (appleY * (gameHeight / gridHeight)), (canvasWidth / gridWidth) - 10, (gameHeight / gridHeight) - 10, "red");
    drawText(50, canvasHeight - 40, "Score = " + score, 100, "Arial", true, "White");
    drawText(50, canvasHeight - 40, "Score = " + score, 100, "Arial", false, "White");
    printStat();
}

// Stuff...
function lostScreen() {
    drawText(150, canvasHeight / 2 - 40, "Game Over", 100, "Arial", true, "Black");
    drawText(300, canvasHeight / 2 + 10, "Score = " + score, 50, "Arial", true, "White");
    drawText(300, canvasHeight / 2 + 10, "Score = " + score, 50, "Arial", false, "Black");
}

function playerInput() {
    playerYacceleration = 0;

    playerHeight = 40;

    if (keyW && headYvel == 0 && !moved) {
        headXvel = 0;
        headYvel = -1;
        moved = true;
    }
    if (keyS && headYvel == 0 && !moved) {
        headXvel = 0;
        headYvel = 1;
        moved = true;
    }
    if (keyA && headXvel == 0 && !moved) {
        headXvel = -1;
        headYvel = 0;
        moved = true;
    }
    if (keyD && headXvel == 0 && !moved) {
        headXvel = 1;
        headYvel = 0;
        moved = true;
    }
}

function printStat() {
    drawText(10, 10, "headXpos = " + headXpos, 10, "Arial", true, "grey");
    drawText(10, 24, "headYpos = " + headYpos, 10, "Arial", true, "grey");
    drawText(10, 36, "appleXpos = " + appleX, 10, "Arial", true, "grey");
    drawText(10, 48, "appleYpos = " + appleY, 10, "Arial", true, "grey");
}

function initSnake() {
    /*for (let i = 3; i > 0; i--) {*/
    var s = new snakeBody(headXpos /*- i*/ , headYpos);
    snake.push(s);
    /*}*/
    do {
        correctApplePos = true;

        appleX = Math.floor(Math.random() * gridWidth);
        appleY = Math.floor(Math.random() * gridHeight);

        for (let j = 0; j < snake.length; j++) {
            if (appleX == snake[j].X && appleY == snake[j].Y)
                correctApplePos = false;
        }
    } while (!correctApplePos);;
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

// Draw functions
function drawRect(X, Y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(X, Y, width, height);
}

function drawCircle(X, Y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(X, Y, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawLine(X1, Y1, X2, Y2) {
    canvasContext.moveTo(X1, Y1);
    canvasContext.lineTo(X2, Y2);
    canvasContext.stroke();
}

function drawText(X, Y, text, size, font, fill, color) {
    canvasContext.font = size + "px " + font;
    canvasContext.fillStyle = color;
    if (fill) canvasContext.fillText(text, X, Y);
    else canvasContext.strokeText(text, X, Y);
}

function drawGradientRectangle(X1, Y1, X2, Y2, color1, color2) {
    var grd = canvasContext.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    canvasContext.fillStyle = grd;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
}