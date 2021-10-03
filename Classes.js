class Square {
  constructor(x, y) {
    this.body = Bodies.rectangle(x, y, 64, 64, {density:1, restitution:0, inertia:Infinity})
    World.add(world, this.body)
    squares.push(this.body)
  }
}

class Circle {
  constructor(x, y) {
    this.body = Bodies.circle(x, y, 32, {density:1, restitution:0, inertia:Infinity})
    World.add(world, this.body)
    circles.push(this.body)
  }
}

class StaticRect {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h, {isStatic:true, restitution:0, slop:0})
    World.add(world, this.body)
  }
}