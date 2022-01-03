var boat, boatImg;
var backgroundImage;
var rock, rockImg, rockGroup;
var shark, sharkImg, sharkGroup;
var map, mapImg, mapGroup;
var score = 0;
var fuel, fuelImg, fuelGroup;
var life = 50;
var gameState = "play";
var treasureIsland, treasureIslandImg;


function preload(){
  backgroundImage = loadImage("-doSsTRHGP8.png");
  boatImg = loadImage("boat.png");
  rockImg = loadImage("rock.jpg");
  sharkImg = loadImage("shark.png");
  mapImg = loadImage("map.jpg");
  fuelImg = loadImage("fuel.png");
  treasureIslandImg = loadImage("island.jpg");
}  
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  boat = createSprite(windowWidth/2, 750);
  boat.addImage("jet ski", boatImg);
  boat.scale = 0.05;

  treasureIsland = createSprite(640, 42);
  treasureIsland.addImage("treasure", treasureIslandImg);
  treasureIsland.scale = 0.25;

  fuelGroup = new Group();
  rockGroup = new Group();
  sharkGroup = new Group();
  mapGroup = new Group();
}

function draw() {
  background(backgroundImage); 
  if(gameState === "play"){
   //player controls 
    if(keyDown("up")){
      boat.y -= 3;
    } else if (keyDown("down")){
      boat.y += 3;
    } else if (keyDown("left")){
      boat.x -= 2;
    } else if (keyDown("right")){
      boat.x += 2;
    }
   //Reducing fuel
    if(boat.y < 750 || boat.moving){
      life -= 0.25;
    } 
   //Creating Fuel Tanks
   for(var i = 0; i <= 1; i++){
     if(frameCount%50 == 0){
      fuel = createSprite(random(0, windowWidth), random(0, windowHeight));
      fuel.addImage("energy", fuelImg);
      fuel.scale = 0.03;
      fuelGroup.add(fuel);
 
     } 
    }

   //Creating Maps
   for(var i = 0; i <= 1; i++){
    if(frameCount%50 == 0){
     map = createSprite(random(0, windowWidth), random(0, windowHeight));
     map.addImage("treasure", mapImg);
     map.scale = 0.15;
     mapGroup.add(map);

    } 
   }
   
   //Creating Obstacles
   for(var i = 0; i <= 1; i++){
    if(frameCount%50 == 0){
     shark = createSprite(random(0, windowWidth), random(0, windowHeight));
     shark.addImage("danger", sharkImg);
     shark.scale = 0.03;
     sharkGroup.add(shark);

    } 
   }
   
   for(var i = 0; i <= 1; i++){
    if(frameCount%50 == 0){
     rock = createSprite(random(0, windowWidth), random(0, windowHeight));
     rock.addImage("sharp", rockImg);
     rock.scale = 0.15;
     rockGroup.add(rock);
   
    } 
   }
   
   //Touching fuel tanks 
    if(boat.isTouching(fuelGroup)){
      life += 15;
      if(life > 50){
        life = 50;
      }
    }
   
   //Touching maps
   if(boat.isTouching(mapGroup)){
     score += 15;
   }  
   
   //Touching sharks
    if(boat.isTouching(sharkGroup)){
      score -= 15;
      if(score < 0){
        score = 0;
      }
    }
   
   //Touching rocks
    if(boat.isTouching(rockGroup)){
      life -= 5;
      if(life < 0 || life == 0){
        gameState = "lost";
      }
    } 
  
   //Winning 
   if(boat.isTouching(treasureIsland)){
     gameState = "won";
   }

  }

  drawSprites();
  textSize(25);
  fill("purple")
  text("Fuel: " + Math.round(life), 50, 50);
  text("Score: " + score, 50, 80);
  console.log(boat.x);
  console.log(boat.y);

  if(gameState == "lost"){
    textSize(50);
    fill("red");
    text("You lost, better luck next time", 350, 350);
    boat.destroy();
    fuelGroup.destroyEach();
    mapGroup.destroyEach();
    sharkGroup.destroyEach();
    rockGroup.destroyEach();
  }

  if(gameState == "won"){
    textSize(50);
    fill("blue");
    text("Congratulations, You won", 350, 350);
    boat.destroy();
    fuelGroup.destroyEach();
    mapGroup.destroyEach();
    sharkGroup.destroyEach();
    rockGroup.destroyEach();
  }
}

