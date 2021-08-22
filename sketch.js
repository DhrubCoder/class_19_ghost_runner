// making variables
var towerImg, tower;
var windowImg, window, windowG;
var climberImg, climber, climbersG;
var ghost, ghostImg;
var invisibleBlock1 , invisibleBlock2 ;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  windowImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png","ghost-standing.png","ghost-standing.png","ghost-jumping.png","ghost-jumping.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  // tower sprite
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  // ghost sprite
  ghost = createSprite(300,300);
  ghost.addAnimation("ghost image",ghostImg);
  ghost.scale = 0.5;

  // creating walls
  invisibleBlock1 = createSprite(0,300,130,600);
  invisibleBlock1.visible=false;
  invisibleBlock2 = createSprite(600,300,130,600);
  invisibleBlock2.visible=false;

  windowG = new Group();
  climberG = new Group();
}

function draw() {
  background("yellow");

  if(gameState === "play"){

  // moving ghost
  if(keyDown("right")){
    ghost.x = ghost.x+9;
  }
  if(keyDown("left")){
    ghost.x = ghost.x-9;
  }
  
  if(tower.y > 400){
      tower.y = 300
    }

    // colliding ghost with walls
    ghost.collide(invisibleBlock1);
    ghost.collide(invisibleBlock2);

    // moving the ghost up wards
    if(keyDown("space")){
      ghost.velocityY = -9;
    }
    ghost.velocityY = ghost.velocityY+1;

    //calling functions
    spawnWindow();

    if(climberG.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(climberG.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
  }

  if(gameState === "end"){
    textSize(60);
    fill("black");
    text("GAME OVER",130,300)
  }

    
}

function spawnWindow(){

    if(frameCount % 200 === 0){
    var window = createSprite(Math.round(random(100,400)),-50);
    window.addImage(windowImg);
    window.velocityY = 2;
    windowG.add(window);
    window.lifetime = 700;

    ghost.depth = window.depth;
    ghost.depth+=1;
    
    var climber = createSprite(200,10);
    climber.x = window.x;
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climberG.add(climber);
    climber.lifetime = 700;
  

    }


}
