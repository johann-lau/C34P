class Square {
  constructor(x, y) {
    this.body = Bodies.rectangle(x, y, 64, 64, {density:0.01, restitution:0, inertia:Infinity})
    World.add(world, this.body)
    squares.push([this.body, my_color])
  }
}

class Circle {
  constructor(x, y) {
    this.body = Bodies.circle(x, y, 32, {density:0.01, restitution:0, inertia:Infinity, slop:0})
    World.add(world, this.body)
    circles.push([this.body, my_color])
  }
}

class StaticRect {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h, {isStatic:true, restitution:0, inertia:Infinity})
    World.add(world, this.body)
    grounds.push([this.body, my_color, w, h])
  }
}