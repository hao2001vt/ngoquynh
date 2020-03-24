let canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");
// Khai báo chiều dài và rộng của một bô vuông
let box = 32;
// Khai báo và tạo đường dẫn cho cái Image
let bgImage = new Image();
let foodImage = new Image();
bgImage.src = "img/ground.png";
foodImage.src = "img/food.png";
// Tạo vị trí Radoom cho vị trí của Food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
// Tạo 1 array để chứa con rắn 
let snake = [];
snake[0] = {
    x: 5 * box,
    y: 10 * box
}
let d;
// Bắt sự kiện khi người dùng ấn bàn phím 
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        d = "LEFT";
    }
    if (event.keyCode == 38) {
        d = "UP";
    }
    if (event.keyCode == 39) {
        d = "RIGHT";
    }
    if (event.keyCode == 40) {
        d = "DOWN";
    }
})
var img2 =document.querySelector('.img2');
function checkGameOver(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x === head.x && array[i].y === head.y) {
            return true
        }
    }
    return false
}
let score = 0;
function draw() {
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(foodImage, food.x, food.y);

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y

    if (food.x == snakeX && food.y == snakeY) {
        score++;
        console.log(score);
        if(score<102){
            img2.style.transform =`translateX(${100-score}px)`;
        }
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        snake.pop();
    }
    if (d == "LEFT") {
        snakeX -= box;
    }
    if (d == "RIGHT") {
        snakeX += box;
    }
    if (d == "DOWN") {
        snakeY += box;
    }
    if (d == "UP") {
        snakeY -= box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box ||
        checkGameOver(newHead,snake)) {
        clearInterval(game);
    }
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "40px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}


let game = setInterval(draw, 100);
