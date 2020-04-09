const canvas    = document.querySelector('#canvas');
const context   = canvas.getContext('2d');

const groundImg = new Image();
groundImg.src = "resources/ground.png";

const foodImg = new Image();
foodImg.src = "resources/food.png";

const unit = 32;

let food = {
    x: Math.floor(Math.random()*17+1) *unit,
    y: Math.floor(Math.random()*15+3) *unit
}


let snake = [   {x: 9 * unit, y: 10 * unit},{x: 8 * unit, y: 10 * unit},
                {x: 7 * unit, y: 10 * unit}, {x: 6 * unit, y: 10 * unit}];

let score = 0;

let snakeDirection = "RIGHT"

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 && snakeDirection != "RIGHT"){
        snakeDirection = "LEFT";
    }    else if(event.keyCode == 38 && snakeDirection != "DOWN"){
        snakeDirection = "UP";
    }    else if(event.keyCode == 39 && snakeDirection != "LEFT"){
        snakeDirection = "RIGHT";
    }    else if(event.keyCode == 40 && snakeDirection != "UP"){
        snakeDirection = "DOWN";
    }
    console.log(snakeDirection)

}

function checkCollision(target, array){
    for(let i = 0; i<array.length; i++){
        if(target.x == array[i].x && target.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    context.drawImage(groundImg, 0, 0);

    for(let i = snake.length-1; i>=0; i--){
        context.fillStyle = ( i == 0 ) ? "brown" : "light-blue";
        context.fillRect(snake[i].x, snake[i].y, 0.9*unit, 0.9*unit);
    }

    context.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeDirection == "LEFT") snakeX -= unit;
    if(snakeDirection == "UP") snakeY -= unit;
    if(snakeDirection == "RIGHT") snakeX += unit;
    if(snakeDirection == "DOWN") snakeY += unit;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random()*17+1) *unit,
            y: Math.floor(Math.random()*15+3) *unit
        }
        while(checkCollision(food, snake)){
            food = {
                x: Math.floor(Math.random()*17+1) *unit,
                y: Math.floor(Math.random()*15+3) *unit
            }
        }
    }else{
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if( snake[0].x <= unit  || snakeX > 17*unit 
        || snakeY < 3*unit || snakeY > 17*unit || checkCollision(newHead, snake)){
            clearInterval(game);
            context.fillStyle = "black";
            context.font = "bold 80px Monospace";
            context.fillText("GAME OVER!", 2*unit, 11*unit);
    }

    snake.unshift(newHead);

    context.fillStyle = "white";
    context.font = "bold 45px Monospace";
    context.fillText(score, 2*unit, 1.6*unit);
}

let game = setInterval(draw, 100);
