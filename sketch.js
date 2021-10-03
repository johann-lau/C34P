
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render

var engine, world, isMobile;
var finalWidth, finalHeight;
var dropper;
var ground1, ground2, ground3, ground4;

var squares = [], circles = [];

var i

function preload() {
  dropper_img = loadImage('assets/dropper.png')
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && !(navigator.userAgent.indexOf("Mi") != -1);
  if (isMobile) {
    finalWidth = displayWidth
    finalHeight = displayHeight
  } else {
    finalWidth = windowWidth
    finalHeight = windowHeight
  }
  createCanvas(finalWidth, finalHeight);

  engine = Engine.create();
  world = engine.world;

  ground1 = new StaticRect(finalWidth/2, finalHeight-3, finalWidth, 3)
  ground2 = new StaticRect(1.5, finalHeight/2, 3, finalHeight)
  ground3 = new StaticRect(finalWidth-1.5, finalHeight/2, 3, finalHeight)
  ground4 = new StaticRect(finalWidth/2, 1.5, finalWidth, 3)

  dropper = createSprite(200, 200, 50, 50)
  dropper.addImage("dropper", dropper_img)
  dropper.scale = 0.25

  fill(255,0,0)
  rectMode(CENTER)
  ellipseMode(RADIUS)
}


function draw() {
  background(51);
  Engine.update(engine);
  checkKeys()
  checkEdges()
  drawSprites()

  // rect(ground1.body.position.x,ground1.body.position.y,finalWidth, 3)
  // rect(ground2.body.position.x,ground2.body.position.y,3, finalHeight)
  // rect(ground3.body.position.x,ground3.body.position.y,3, finalHeight)

  for (i=0; i<squares.length; i++) {
    current = squares[i]
    rect(current.position.x, current.position.y, 64, 64)
  }

  for (i=0; i<circles.length; i++) {
    current = circles[i]
    ellipse(current.position.x, current.position.y, 32)
  }
}

function checkKeys() {
  if (keyDown("W") || keyDown(38)) {
    dropper.y -= 8
  }
  if (keyDown("A") || keyDown(37)) {
    dropper.x -= 8
  }
  if (keyDown("S") || keyDown(40)) {
    dropper.y += 8
  }
  if (keyDown("D") || keyDown(39)) {
    dropper.x += 8
  }
  if (keyDown("I")) {
    dropper.y -= 16
  }
  if (keyDown("J")) {
    dropper.x -= 16
  }
  if (keyDown("K")) {
    dropper.y += 16
  }
  if (keyDown("L")) {
    dropper.x += 16
  }
  
  if (keyWentDown("1")) {
    new Square(dropper.x, dropper.y+64)
  }

  if (keyWentDown("2")) {
    new Circle(dropper.x, dropper.y+64)
  }

  if (keyDown("shift") && keyDown("esc")) {
    for (i=0; i<squares.length; i++) {
      World.remove(world, squares[i])
    }
    squares = []

    for (i=0; i<circles.length; i++) {
      World.remove(world, circles[i])
    }
    circles = []
  }
}

function checkEdges() {
  if (dropper.x > finalWidth-32) {
    dropper.x = finalWidth-32
  }

  if (dropper.x < 32) {
    dropper.x = 32
  }

  if (dropper.y > finalHeight-32) {
    dropper.y = finalHeight-32
  }

  if (dropper.y < 32) {
    dropper.y = 32
  }
}