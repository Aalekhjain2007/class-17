
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var obstacle
var PLAY=1
var END=0
var gameState=PLAY
var survivalTime=0
var score


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  monkey=createSprite(50,260,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.09;
  
  
  ground=createSprite(200,260,600,10);
  ground.velocityX=-5;
 
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  
  score=0
}


function draw() {

    background("lightgrey");
    text("score:"+score,400,60)
    
 
  monkey.collide(ground)
  
  if(gameState===PLAY){
    
     if(ground.x<300){
    ground.x=ground.width/2;
     }
  
  if(keyDown("space")&&monkey.y>=200){
    monkey.velocityY=-15;
     
     }
  monkey.velocityY=monkey.velocityY+0.8
    
  spawnObstacles();
  spawnBananas();
     
    if(obstacleGroup.isTouching(monkey)){
     gameState=END;
      
    }
      if(FoodGroup.isTouching(monkey)){
      score=score+1
  }
     
     }
 
  if(gameState===END){
      
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
                             
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     
     
     }
  
 
  stroke("black");
  textSize(20); 
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50);
  survivalTime=Math.ceil(frameCount/frameRate())
  
  
  drawSprites();
}

function spawnObstacles(){
 if(frameCount %60 ===0 ){
    var obstacle=createSprite( 600,235,20,20)
    obstacle.velocityX=-(5+score*1.5/100);
   obstacle.addImage(obstaceImage)
   obstacle.scale=0.10
   obstacle.lifetime=125
   obstacle.debug=false
   obstacle.setCollider("circle",20,20)
   obstacleGroup.add(obstacle);
    }
}

function spawnBananas(){
  if(frameCount%60===0){
    var Banana=createSprite(500,80,20,20);
    Banana.velocityX=-5
    Banana.y=Math.round(random(50,180))
    console.log (Banana.y)
    Banana.addImage(bananaImage);
    Banana.scale=0.1;
    Banana.debug=true
    Banana.setCollider("rectangle",0,  0,10,10)
    FoodGroup.add(Banana)
   
  }
}




