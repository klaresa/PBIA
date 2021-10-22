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
loadSprite("tria", "sprites/t.png");


const shapes = []

const square = add([
  sprite("square"),
  pos(30, 35),
  area(100, 100),
  origin("center")
])

const circle = add([
  sprite("circle"),
  pos(100, 100),
  area(100, 100),
  origin("center")
])

const triangle = add([
  sprite("tria"),
  pos(140, 180),
  area(100, 100),
  origin("center")
])

function makeShapes(geometric) {
  const newPos = pos(rand(50, width() - 50), rand(50, height() - 50))

  const shape = add([
    sprite(geometric),
    newPos,
    origin("center"),
    area(100, 100),
  ])

  return shape
}

// makeShapes("triangle")
makeShapes("circle")
makeShapes("square")



const line = [square, circle, triangle]


const cfg = {
  color: color(0, 0, 0),
  width: 10,
}

mouseClick(() => {
  const pos = mousePos()
  debug.log(`${pos.x}-${pos.y}`)

})

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
