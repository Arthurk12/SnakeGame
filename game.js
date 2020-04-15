const canvas    = document.querySelector('#canvas');
const context   = canvas.getContext('2d');

class Score{
    constructor(mapUnit){
        this.counter = 0;
        this.x = 2.5 * mapUnit;
        this.y = 1.5 * mapUnit;
    }
    write(){
        console.log(this.counter);
        context.fillStyle = "white";
        context.font = "bold 45px Monospace";
        context.fillText(this.counter, this.x, this.y);
    }
    add(){
        this.counter += 1;
    }
}

class Snake{
    constructor(mapUnit, mapWidth, mapHeight){
        this.mapUnit = mapUnit;
        this.initialXPos = Math.floor(mapWidth/2 / mapUnit);
        this.initialYPos = Math.floor(mapHeight/2 / mapUnit);
        this.body = [{x: this.initialXPos * mapUnit, y: this.initialYPos * mapUnit, dir: "RIGHT"},{x: (this.initialXPos-1) * mapUnit, y: this.initialYPos * mapUnit, dir: "RIGHT"},
                    {x: (this.initialXPos-2) * mapUnit, y: this.initialYPos * mapUnit, dir: "RIGHT"}, {x: (this.initialXPos-3) * mapUnit, y: this.initialYPos * mapUnit, dir: "RIGHT"}];
        this.direction = "RIGHT";
        this.movedDirection = "";
        this.growCtrl = false;
        this.initImages();
        document.addEventListener("keydown", this.changeDirection.bind(this));        
    }
    initImages(){
        this.headImageUP = new Image();
        this.headImageUP.src = "./resources/PurpleSnake/head1.png"
        this.headImageDOWN = new Image();
        this.headImageDOWN.src = "./resources/PurpleSnake/head2.png"
        this.headImageRIGHT = new Image();
        this.headImageRIGHT.src = "./resources/PurpleSnake/head3.png"
        this.headImageLEFT = new Image();
        this.headImageLEFT.src = "./resources/PurpleSnake/head4.png"
        this.tailImageUP = new Image();
        this.tailImageUP.src = "./resources/PurpleSnake/tail1.png"
        this.tailImageDOWN = new Image();
        this.tailImageDOWN.src = "./resources/PurpleSnake/tail2.png"
        this.tailImageRIGHT = new Image();
        this.tailImageRIGHT.src = "./resources/PurpleSnake/tail3.png"
        this.tailImageLEFT = new Image();
        this.tailImageLEFT.src = "./resources/PurpleSnake/tail4.png"
        this.middleImageH = new Image();
        this.middleImageH.src = "./resources/PurpleSnake/middleH.png"
        this.middleImageV = new Image();
        this.middleImageV.src = "./resources/PurpleSnake/middleV.png"
        this.turnImageDR = new Image();
        this.turnImageDR.src = "./resources/PurpleSnake/turnDR.png"
        this.turnImageRU = new Image();
        this.turnImageRU.src = "./resources/PurpleSnake/turnRU.png"
        this.turnImageUL = new Image();
        this.turnImageUL.src = "./resources/PurpleSnake/turnUL.png"
        this.turnImageLD = new Image();
        this.turnImageLD.src = "./resources/PurpleSnake/turnLD.png"
    }
    move(){
        let newHead =   {x: this.body[0].x,
                        y: this.body[0].y,
                        dir: this.direction};

        if(this.direction == "LEFT"){ newHead.x -= this.mapUnit; this.movedDirection = "LEFT"
        }else if(this.direction == "UP"){ newHead.y -= this.mapUnit; this.movedDirection = "UP"
        }else if(this.direction == "RIGHT"){ newHead.x += this.mapUnit; this.movedDirection = "RIGHT"
        }else if(this.direction == "DOWN"){ newHead.y += this.mapUnit; this.movedDirection = "DOWN"}
        
        for(let it = this.body.length-1; it >= 0; it --){
            if((this.body[it].x == newHead.x) && (this.body[it].y == newHead.y))
                return false;
        }

        this.body.unshift(newHead);
        

        if(this.growCtrl != true){
            this.body.pop(this.body[this.body.length-1]);
            
        }else{
            this.growCtrl = false;
        }
        return true;
        
    }
    draw(){
        for(let it = this.body.length-1; it >= 0; it--){
            if(!it==0 &&  it != this.body.length-1){
                if(this.body[it].dir == "UP" && this.body[it-1].dir == "LEFT")  context.drawImage(this.turnImageLD, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "UP" && this.body[it-1].dir == "RIGHT")  context.drawImage(this.turnImageDR, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "UP")  context.drawImage(this.middleImageV, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "DOWN" && this.body[it-1].dir == "RIGHT") context.drawImage(this.turnImageRU, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "DOWN" && this.body[it-1].dir == "LEFT") context.drawImage(this.turnImageUL, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "DOWN") context.drawImage(this.middleImageV, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "RIGHT" && this.body[it-1].dir == "UP") context.drawImage(this.turnImageUL, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "RIGHT" && this.body[it-1].dir == "DOWN") context.drawImage(this.turnImageLD, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "RIGHT") context.drawImage(this.middleImageH, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "LEFT" && this.body[it-1].dir == "UP") context.drawImage(this.turnImageRU, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "LEFT" && this.body[it-1].dir == "DOWN") context.drawImage(this.turnImageDR, this.body[it].x, this.body[it].y);
                else if(this.body[it].dir == "LEFT") context.drawImage(this.middleImageH, this.body[it].x, this.body[it].y);
            }else if(it == this.body.length-1){
                if(this.body[it-1].dir == "UP" )  context.drawImage(this.tailImageUP, this.body[it].x, this.body[it].y);
                else if(this.body[it-1].dir == "DOWN") context.drawImage(this.tailImageDOWN, this.body[it].x, this.body[it].y);
                else if(this.body[it-1].dir == "RIGHT") context.drawImage(this.tailImageRIGHT, this.body[it].x, this.body[it].y);
                else if(this.body[it-1].dir == "LEFT") context.drawImage(this.tailImageLEFT, this.body[it].x, this.body[it].y);
            }else if (it == 0){
                if(this.direction == "UP")  context.drawImage(this.headImageUP, this.body[it].x, this.body[it].y);
                else if(this.direction == "DOWN") context.drawImage(this.headImageDOWN, this.body[it].x, this.body[it].y);
                else if(this.direction == "RIGHT") context.drawImage(this.headImageRIGHT, this.body[it].x, this.body[it].y);
                else if(this.direction == "LEFT") context.drawImage(this.headImageLEFT, this.body[it].x, this.body[it].y);
            }

        }
    }
    grow(){
        this.growCtrl = true;
    }
    changeDirection(event){
        //console.log(this);
        if(event.keyCode == 37 && this.movedDirection != "RIGHT"){
            this.direction = "LEFT";
        }    else if(event.keyCode == 38 && this.movedDirection != "DOWN"){
            this.direction = "UP";
        }    else if(event.keyCode == 39 && this.movedDirection != "LEFT"){
            this.direction = "RIGHT";
        }    else if(event.keyCode == 40 && this.movedDirection != "UP"){
            this.direction = "DOWN";
        }
    }
    getHeadPos(){
        return{x: this.body[0].x, y:this.body[0].y};
    }
}

class Food{
    constructor(mapUnit){
        this.image = new Image();
        this.image.src = "./resources/food.png";
        this.mapUnit = mapUnit;
        this.generateNewPos()
    }
    draw(){
       // console.log(this.x, this.y);
        context.drawImage(this.image, this.x, this.y);
    }
    generateNewPos(){
        this.x = Math.floor(Math.random()*19 + 1) * this.mapUnit;
        this.y = Math.floor(Math.random()*21 + 2) * this.mapUnit;
    }
    getPos(){
        return {x :this.x,y: this.y};
    }
}

class Map{
    constructor(){
        this.image = new Image();
        this.image.src = "./resources/ground.png";
    }
    draw(){
        context.drawImage(this.image, 0, 0);
    }
}

class Game{
    constructor(speed, width, height){
        this.mapUnit = 32;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.score = new Score(this.mapUnit);
        this.map = new Map();
        this.food = new Food(this.mapUnit);
        this.snake = new Snake(this.mapUnit, this.width, this.height);
    }
    startGame(){
        this.timer = setInterval(this.loop.bind(this), this.speed);
        
    }
    loop(){
        if(!this.snake.move()){
            this.stopGame();
        }else{
            if(this.snakeColisionWithWall()){ 
                this.stopGame();
                return;
            }
            this.map.draw();
            this.snake.draw();
            if((this.snake.getHeadPos().x === this.food.getPos().x) && (this.snake.getHeadPos().y === this.food.getPos().y)){
                while(this.foodColisionWithSnake()){
                    this.food.generateNewPos();
                }
                this.score.add();
                this.snake.grow();
            }
    
            this.food.draw();
            this.score.write();    
        }

    
    }
    stopGame(){
        clearInterval(this.timer);
        context.fillStyle = "black";
        context.font = "bold 80px Monospace";
        context.fillText("GAME OVER!", 2*this.mapUnit, 11*this.mapUnit);
    }
    direction(event){
        this.snake.changeDirection(event.keyCode);
    }
    foodColisionWithSnake(){
        for(let it = 0; it< this.snake.body.length -1; it ++)
            if(this.food.getPos().x == this.snake.body[it].x && this.food.getPos().y == this.snake.body[it].y){
                return true;
            }
            return false;
    }
    snakeColisionWithWall(){
        console.log(this.snake.getHeadPos())
        if(this.snake.getHeadPos().x > 19 * this.mapUnit || this.snake.getHeadPos().x < this.mapUnit){
            return true;
        }else if(this.snake.getHeadPos().y > 22 * this.mapUnit || this.snake.getHeadPos().y < 2*this.mapUnit){
            return true;
        }
        return false;
    }
}

let snakeGame = new Game(100, 672, 768);
snakeGame.startGame();
