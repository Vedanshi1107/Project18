var PLAY = 1;
var END = 0;
var gameState = PLAY;


var banana,bananaImg;
var obstacle,obstacleImg,obstacleGroup;
var monkey_running,monkey,foodGroup;
var ground, groundImg,score;

function perload(){
  
  monkey_running =            loadAnimation("monkey_01.png","monkey_02.png","monkey_03.png","monkey_04.png","monkey_05.png","monkey_06.png","monkey_07.png","monkey_08.png","monkey_09.png","monkey_10.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
  groundImg = loadImage("jungle.jpg")
}




function setup() {
  createCanvas(400, 400);
  
  banana = createSprite(200,200,20,20);
  banana.addImage(bananaImg);
  banana.scale = 0.5;
  
  obstacles = createSprite(50,90,20,20);
  obstacles.addImage(obstaclesImg);
  obstacles.sacle = 0.5;
  
  monkey = createSprite(200,200,30,30);
  monkey.addImage("running",monkey_running);
  monkey.scale = 0.5;
  
  ground = createSprite(400,350,900,10);
  ground.addImage("jungle",groundImg);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
  
  obstcaleGroup = newGroup();
  foodGroup = newGroup();
}

function draw() {
  background(220);
  text ("Score:"+score,500,50);
  
  if(monkey.isTouching(banana)){
    score = score + 2;
    monkey.scale= scale + 0.2;

  }
  
  if(monkey.isTouching(obstacleGroup)){
    score = score - 2;
    monkey.scale = scale - 0.1;
  }
  
  if(monkey.isTouching(foodGroup)){
    score = score + 2;
    monkey.scale = scale + 0.1;
  }
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -3
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnFood();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(monkey.scale >= 0.1){
        gameState = END;
        
      
    }
  }
   else if (gameState === END){
     
      monkey.velocityX = 0;
      ground.velocityX = 0;
      monkey.velocityY = 0;
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
  
  drawSprites();
}


function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var Food = createSprite(600,120,40,10);
    Food.y = Math.round(random(120,200));
    Food.addImage(BananaImage);
    Food.scale = 0.5;
    Food.velocityX = -3;
    
     //assign lifetime to the variable
    Banana.lifetime = 200;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = Math.round(random(50,180));
    obstacle.addImage(BananaImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle .lifetime = 200;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}


