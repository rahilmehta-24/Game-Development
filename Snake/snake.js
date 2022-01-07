// Setting up query and initializing commands
// --------------------------------------------------------------


var canvas=document.querySelector("#canvas");
var cnavasCTX=canvas.getContext("2d");
var x=0;
var y=0;
var snakeWidth=10;
var snakeHeight=10;
var move="goRight";
var count=0;
var score=document.querySelector("#score")

// --------------------------------------------------------------


// Draw Snake
// --------------------------------------------------------------


function drawSnake(x,y){
  cnavasCTX.fillStyle="white";
  cnavasCTX.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
  cnavasCTX.fillStyle="black";
  cnavasCTX.strokeRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
}

// --------------------------------------------------------------


// Initial Length of snake
// --------------------------------------------------------------


var initLength=3
snake=[];
for(var i=initLength-1; i>=0; i--){
  snake.push({x:i, y:0});
}


// --------------------------------------------------------------


// Draw Food
// --------------------------------------------------------------


function drawFood(x,y){
  cnavasCTX.fillStyle="red";
  cnavasCTX.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
  cnavasCTX.fillStyle="black";
  cnavasCTX.strokeRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
}

var food={x: Math.ceil(Math.random()*50)+1, y: Math.ceil(Math.random()*50)+1}

// --------------------------------------------------------------


//---------------------------  Main controlling part of program---------------------------------------//
// --------------------------------------------------------------

// ************************************************************
function controlling(e){
  if(e.keyCode==37 && move!="goRight"){
    move="goLeft";
  }
  else if(e.keyCode==38 && move!="goDown"){
    move="goUp";
  }
  else if(e.keyCode==39 && move!="goLeft"){
    move="goRight";
  }
  else if(e.keyCode==40 && move!="goUp"){
    move="goDown";
  }
}

document.addEventListener("keydown",controlling);


// ************************************************************


function sendDrawCommand(){
  cnavasCTX.clearRect(0,0,canvas.width,canvas.height);


  // ************************************************************
  for(var i=0; i<snake.length; i++){
    drawSnake(snake[i].x,snake[i].y);
  }
  drawFood(food.x, food.y);
  // ************************************************************


  var headX=snake[0].x;
  var headY=snake[0].y;

  if(headX<0 || headY<0 || headX>=canvas.width/snakeWidth || headY>=canvas.height/snakeHeight){
    alert("Game Over!!!  Refresh the page and then press Ok to restart");
  }
  


  // ************************************************************
  if(move=="goRight"){
    headX++;
  }
  else if(move=="goLeft"){
    headX--;
  }
  else if(move=="goUp"){
    headY--;
  }
  else if(move=="goDown"){
    headY++;
  }
  // ************************************************************


  // ************************************************************
  if(headX==food.x && headY==food.y){
    food={x: Math.ceil(Math.random()*49)+1, y: Math.ceil(Math.random()*49)+1};
    // console.log(food.x,food.y);
    var newHead={x: headX, y: headY};
    count+=1;
    score.innerHTML="Score:  "+count;
  }
  else{
    snake.pop()
    var newHead={x: headX, y: headY};
  }

  // if(newHead.forEach((x)=>{console.log(x.x,x.y)})==check.forEach((x)=>{console.log(x.x,x.y)})){
  //   alert("Game Over!!!  Refresh the page and then press Ok to restart");
  // }
  // ************************************************************
  snake.unshift(newHead)  
  // console.log(snake.length);
}

// --------------------------------------------------------------
setInterval(sendDrawCommand,50);

