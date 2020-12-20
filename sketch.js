var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 300);
  
  ground = createSprite(0,290, 1200, 20);
  ground.x = ground.width/2;
  
  monkey = createSprite(50, 200, 50, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  
  FoodGroup = new Group();
  
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
     
      background("black" );

      drawSprites();

      monkey.collide(ground);
  
      text("Score: "+ score, 500,50);
    
  if(gameState === PLAY) {
      if(keyDown("space")&& monkey.y > 240) {
         monkey.velocityY = -14;
      }

      if(monkey.isTouching(FoodGroup)) {
        FoodGroup.destroyEach();
      }

      if(monkey.isTouching(obstacleGroup)) {
        gameState = END;
      }
    
      score = score + Math.round(getFrameRate()/60);
  }
  else if(gameState === END) {
    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
  }  
  
  monkey.velocityY = monkey.velocityY + 0.9;
    
  spawnBanana();
    
  spawnObstacle();

}

function spawnBanana() {
  
  if(frameCount % 80 === 0) {
    var banana = createSprite(600, 100, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    banana.velocityX = -6;
    FoodGroup.add(banana);
  }
  
}

function spawnObstacle() {
  
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600, 265, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
  }
  
}