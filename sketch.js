
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render

var engine, world, isMobile;
var finalWidth, finalHeight;
var dropper;

var squares = [], circles = [], grounds = [];
var ground1, ground2, ground3, ground4;
var my_color = "#FF0000";
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

  rectMode(CENTER)
  ellipseMode(RADIUS)
}


function draw() {
  background(51);
  Engine.update(engine);
  checkKeys()
  checkEdges()
  drawSprites()

  for (i=0; i<squares.length; i++) {
    current = squares[i][0]
    fill(squares[i][1])
    rect(current.position.x, current.position.y, 64, 64)
  }

  for (i=0; i<circles.length; i++) {
    current = circles[i][0]
    fill(circles[i][1])
    ellipse(current.position.x, current.position.y, 32)
  }

  for (i=0; i<grounds.length; i++) {
    current = grounds[i][0]
    fill(grounds[i][1])
    rect(current.position.x, current.position.y, grounds[i][2], grounds[i][3])
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

  if (keyWentDown("T")) {
    dropper.y -= 64
  }

  if (keyWentDown("F")) {
    dropper.x -= 64
  }

  if (keyWentDown("G")) {
    dropper.y += 64
  }

  if (keyWentDown("H")) {
    dropper.x += 64
  }
  
  if (keyWentDown("1")) {
    new Square(dropper.x, dropper.y+64)
  }

  if (keyWentDown("2")) {
    new Circle(dropper.x, dropper.y+64)
  }

  if (keyWentDown("o")) {
    new StaticRect(dropper.x, (dropper.y+finalHeight+32)/2, 3, finalHeight-dropper.y)
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

  if (keyDown("Z")) {
    my_color = "#FF0000"
  }

  if (keyDown("X")) {
    my_color = "#FFFF00"
  }

  if (keyDown("C")) {
    my_color = "#00FF00"
  }

  if (keyDown("V")) {
    my_color = "#00FFFF"
  }

  if (keyDown("B")) {
    my_color = "#0000FF"
  }

  if (keyDown("N")) {
    my_color = "#FF00FF"
  }

  if (keyDown("M")) {
    my_color = "#FFFFFF"
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