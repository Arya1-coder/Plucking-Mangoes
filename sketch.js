
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1;
var world,boy;

function preload(){
	boyImage=loadImage("boy.png");
  treeImage=loadImage("tree.png");
  }

function setup() {
	createCanvas(900, 600);
	engine = Engine.create();
	world = engine.world;

  boy=createSprite(200,500);
  boy.addImage(boyImage);
  boy.scale=0.1;

  tree=createSprite(600,290);
  tree.addImage(treeImage);
  tree.scale=0.45;

  mango1 = new Mango(390,180,50); 
  mango2 = new Mango(510,70,50); 
  mango3 = new Mango(480,270,50); 
  mango4 = new Mango(640,50,50); 
  mango5 = new Mango(640,260,50); 
  mango6 = new Mango(780,250,50); 
  mango7 = new Mango(720,150,50); 
  mango8 = new Mango(585,170,50); 

  stone = new Stone(150,445,50);

  launcher = new SlingShot(stone.body,{x:150,y:445});

	groundObject=new ground(width/2,570,width,20);
	
	Engine.run(engine);

}

function draw() {

  background(230);
  Engine.update(engine);
  drawSprites();
  
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();

  groundObject.display();

  launcher.display();

  stone.display();

  detectCollision(stone,mango1)
  detectCollision(stone,mango2)
  detectCollision(stone,mango3)
  detectCollision(stone,mango4)
  detectCollision(stone,mango5)
  detectCollision(stone,mango6)
  detectCollision(stone,mango7)
  detectCollision(stone,mango8)
}

function mouseDragged(){
  Matter.Body.setPosition(stone.body,{
    x:mouseX,
    y:mouseY
  })
}

function mouseReleased(){
  launcher.fly();
}

function keyPressed(){
  if(keyCode===32){
    Matter.Body.setPosition(stone.body,{
      x:150,
      y:445
    })
    launcher.attach(stone.body)
  }
}

function detectCollision(lstone,lmango){
  mangoBodypos=lmango.body.position;
  stoneBodypos=lstone.body.position;

  var distance=dist(stoneBodypos.x,stoneBodypos.y,mangoBodypos.x,mangoBodypos.y);

  if(distance<=lmango.r+lstone.r){
    Matter.Body.setStatic(lmango.body,false)
  }
}