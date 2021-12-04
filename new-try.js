// import dijkstra from 'dijkstrajs'
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
loadSprite("redD", "sprites/red-dot.png");
loadSprite("blueD", "sprites/blue-dot.png");
loadSprite("yellowD", "sprites/yellow-dot.png");
loadSprite("clear", "sprites/clear.PNG");
loadSprite("idea", "sprites/idea.PNG");
loadSprite("close", "sprites/x.PNG");


let gf = {
  a: { b: 3, d: 1 },
  b: { a: 1, c: 1 },
  c: { b: 1, e: 1 },
  d: { a: 1, e: 1, f: 1 },
  e: { c: 2, d: 1 },
  f: { d: 1 }
}

// var path = dijkstra.find_path(gf, 'a', 'c');


function makeShapes() {

  add([
    sprite("square"),
    pos(height() / 2, width() / 2),
    origin("center"),
    area(50, 50),
    "plat",
    "sq",
    "a"
  ])

  const pickShape = choose(["triangle", "circle"])

  let newPos = pos()


  let gflist = [gf]

  for (let i in gflist) {
    if (gflist[i].a.exists()) continue
    console.log('i', gflist[i])
    add([
      sprite(pickShape),
      pos(gflist[i]),
      origin("center"),
      area(50, 50),
      "plat",
      pickShape
    ])
  }

  // return add([
  //   fullName,
  //   sprite(pickShape),
  //   newPos,
  //   origin("center"),
  //   area(50, 50),
  //   "plat",
  //   pickShape
  // ])
}
makeShapes()
