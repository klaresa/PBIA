// kaboom();
// import kaboom from "kaboom";

kaboom({
  width: 600,
  height: 500,
  scale: 1,
  debug: true,
  // background: [255, 255, 255],
});

loadSprite("square", "sprites/s.png");
loadSprite("circle", "sprites/c.png");
loadSprite("triangle", "sprites/t.png");


const shapes = []

const square = add([
  sprite("square"),
  pos(140, 190),
  area(100, 100),
  origin("center")
])

const circle = add([
  sprite("circle"),
  pos(480, 90),
  area(100, 100),
  origin("center")
])

const triangle = add([
  sprite("triangle"),
  pos(455, 320),
  area(100, 100),
  origin("center"),
])

let t = 0
let c = 0
let s = 0

function makeShapes(geometric) {
  const newPos = pos(rand(50, width() - 50), rand(50, height() - 50))

  const shape = add([
    sprite(geometric),
    newPos,
    origin("center"),
    area(100, 100),
    "geo"
  ])

  return shape
}

// makeShapes("triangle")
// makeShapes("circle")
// makeShapes("square")





const cfg = {
  color: color(0, 0, 0),
  width: 10,
}

// debuging code
mouseClick(() => {
  // debug pos
  // const pos = mousePos()
  // debug.log(`${pos.x}-${pos.y}`)
})

onClick("geo", () => {
  debug.log('done')
})

const line = [square, circle, triangle]

render(() => {
  for (let i = 0; i < line.length -1; i++) {
    drawLine(line[i].pos, line[i+1].pos, cfg)
    // strokes.push(s)
  }
})


// mouseClick(() => {
//   line.pop()
// })

// render(() => {
//   drawLine(line[0].pos, mousePos(), cfg)
// })
