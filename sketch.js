var balloon,balloonImage1,balloonImage2;
var database;
var balloon_pos_ref;
var balloon_pos_in_db;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  database=firebase.database();
  balloon_pos_ref = database.ref("balloon/height")
  balloon_pos_ref.on("value",readPosition);

  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

function draw() {
  background(bg);

  if(balloon_pos_in_db!== undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(1,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-1);
    balloon.scale = 0.7;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,+1)
    balloon.scale = 0.3;
  }
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
  //** 
}

function readPosition(data){
  balloon_pos_in_db = data.val()
  balloon.x= balloon_pos_in_db.x 
  balloon.y = balloon_pos_in_db.y

}

function writePosition(x,y){

  database.ref("balloon/height").set({

    x: balloon_pos_in_db.x+ x,
    y: balloon_pos_in_db.y+ y
  })
}
