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



const clear = add([
  sprite("clear"),
  pos(570, 470),
  area(100, 100),
  origin("center"),
  "clear"
])

const idea = add([
  sprite("idea"),
  pos(570, 430),
  area(100, 100),
  scale(0.5),
  origin("center"),
  "idea"
])

const sq = add([
  sprite("square"),
  pos(240, 190),
  area(100, 100),
  origin("center"),
  "geo",
  "sta"
])

const redD = add([
  sprite("redD"),
  pos(575, 180),
  area(100, 100),
  scale(0.1),
  opacity(0.5),
  origin("center"),
  "red"
])

const yellowD = add([
  sprite("yellowD"),
  pos(575, 150),
  area(50, 50),
  scale(0.1),
  opacity(0.5),
  origin("center"),
  "yellow"
])

const blueD = add([
  sprite("blueD"),
  pos(575, 120),
  area(50, 50),
  scale(0.1),
  opacity(0.5),
  origin("center"),
  "blue"
])

add([
  sprite("close"),
  pos(575, 50),
  area(50, 50),
  scale(1),
  origin("center"),
  "ex"
])

const score = add([
  text("Score: 0"),
  pos(24, 24),
  {value: 0},
])

//  em que linha ele sera adicionado?
let line = []

/*
* Lista de linhas começa com 3: vermelha, amarela, azul
*/
let lines = {
  red: [],
  blue: [],
  yellow: []
}

let selectedColor = {
  red: false,
  blue: false,
  yellow: false
}

onClick("red", () => {
  selectedColor.blue = false
  selectedColor.yellow = false
  selectedColor.red = !selectedColor.red

  selectedColor.red === false ? redD.opacity = 0.5 : redD.opacity = 1
  selectedColor.blue === false ? blueD.opacity = 0.5 : blueD.opacity = 1
  selectedColor.yellow === false ? yellowD.opacity = 0.5 : yellowD.opacity = 1
})

onClick("blue", () => {
  selectedColor.red = false
  selectedColor.yellow = false
  selectedColor.blue = !selectedColor.blue

  selectedColor.blue === false ? blueD.opacity = 0.5 : blueD.opacity = 1
  selectedColor.red === false ? redD.opacity = 0.5 : redD.opacity = 1
  selectedColor.yellow === false ? yellowD.opacity = 0.5 : yellowD.opacity = 1
})

onClick("yellow", () => {
  selectedColor.red = false
  selectedColor.blue = false
  selectedColor.yellow = !selectedColor.yellow

  selectedColor.yellow === false ? yellowD.opacity = 0.5 : yellowD.opacity = 1
  selectedColor.blue === false ? blueD.opacity = 0.5 : blueD.opacity = 1
  selectedColor.red === false ? redD.opacity = 0.5 : redD.opacity = 1
})

onClick("ex", () => {
  onMouseRelease(() => {
    lines.blue = []
  })
})

let where

// runs on every frame
// todos os eventos de desenhar precisam estar aqui dentro
onDraw(() => {
  drawAllLines()
  linkShapes()
})

/*
* Reseta todas as conexões da linha
*/
onClick("clear", () => {
  onMouseRelease(() => {
    line = []
  })
})

onClick("idea", () => {
  const shapesPositions = getShapesPositions()
  console.log(shapesPositions)

  // agora acha a distancia para todos os pontos

  // debug.log(shapesPositions[0].x)
  let last = line[line.length - 1]

  let close = getClosestObject(shapesPositions, last)

  // for (let i = 0; i < shapesPositions.length - 1; i++) {


  // antes de desenhar é preciso achar o obj mais proximo

  // cada onDraw é uma linda independente - pode ser uma sugestao
  onDraw(() => {
    drawLine({
      p1: vec2(last.x, last.y),
      p2: vec2(close.x, close.y),
      color: rgb(0, 0, 0),
      width: 3,
    }, "line")
  })
  // }

  // onDraw(() => {
  //   drawLine({
  //     p1: vec2(shapesPositions[i].x, shapesPositions[i].y),
  //     p2: vec2(shapesPositions[i + 1].x, shapesPositions[i + 1].y),
  //     color: rgb(0, 0, 0),
  //     width: 3,
  //   }, "line")
  // })
})


// renders after all renders - runs all the time
action(() => {
  // linkShapes()
})

/*
* Função que retorna a posição do objeto
*/
function returnPos(obj) {
  return { x: obj.pos.x, y: obj.pos.y }
}

/*
* Função que verifica se um objeto está próximo
* a outro objeto existente no canvas em (100) dist
*/
function isObjectClose(objs, pos) {

  for (let i = 0; i < objs.length; i++) {
    if (pos.pos.dist({x: objs[i].pos.x, y: objs[i].pos.y}) < 100) {

      score.value += 1
      score.text = score.value

      return true
    }
  }
  return false
}

/*
*  Retorna o objeto mais perto de uma determinada posição
*/
function getClosestObject(objs, pos) {
  let closest = 100000
  let objProps

  for (let i = 0; i < objs.length; i++) {
    let distance = pos.pos.dist({x: objs[i].x, y: objs[i].y} )

    debug.log(distance)
    if (closest > distance) {
      closest = distance
      objProps = objs[i]
    }
  }
  return objProps
}

/*
* Função que cria e retorna uma nova forma geometrica.
*/

let t = 0
let c = 0
function makeShapes() {
  const pickShape = choose(["triangle", "circle"])
  let stas = get("sta")

  let newPos = pos(rand(50, width() - 90), rand(50, height() - 50))

  while (isObjectClose(stas, newPos)) {
    newPos = pos(rand(50, width() - 90), rand(50, height() - 50))
  }

  let firstLetter = pickShape[0]
  let fullName

  if (firstLetter === 't') {
    fullName = `${firstLetter}${t}`
    t++
  } else if (firstLetter === 'c') {
    fullName = `${firstLetter}${c}`
    c++
  }

  return add([
    fullName,
    sprite(pickShape),
    newPos,
    origin("center"),
    area(50, 50),
    "sta",
    pickShape
  ])
}

/*
* Função que desenha as retas em loop.
*/
// function draw() {
//   for (let i = 0; i < line.length - 1; i++) {
//     drawLine({
//       p1: line[i].pos,
//       p2: line[i + 1].pos,
//       color: rgb(0, 0, 0),
//       width: 3,
//     }, "line")
//   }
// }

function drawAllLines() {
  for (let i = 0; i < lines.red.length - 1; i++) {
    drawLine({
      p1: lines.red[i].pos,
      p2: lines.red[i + 1].pos,
      color: rgb(255, 0, 0),
      width: 3,
    }, "redLine")
  }

  for (let i = 0; i < lines.blue.length - 1; i++) {
    drawLine({
      p1: lines.blue[i].pos,
      p2: lines.blue[i + 1].pos,
      color: rgb(0, 0, 255),
      width: 3,
    }, "blueLine")
  }

  for (let i = 0; i < lines.yellow.length - 1; i++) {
    drawLine({
      p1: lines.yellow[i].pos,
      p2: lines.yellow[i + 1].pos,
      color: rgb(200, 200, 0),
      width: 3,
    }, "yellowLine")
  }
}

function whereDidIClick() {
  onClick("sta", (obj) => {
    where = { x: obj.pos.x, y: obj.pos.y }
  })
}

// function linkShapes() {
//   // funciona dentro
//   if (isMouseDown()) {
//     whereDidIClick()
//
//     drawLine({
//       p1: vec2(where),
//       p2: mousePos(),
//       color: rgb(0, 0, 0),
//       width: 3,
//     })
//   }
//
//   // objeto selecionado
//   onHover("sta", (obj) => {
//     onMouseRelease("left", () => {
//       // n estiver na lista line, adiciona
//       obj.opacity = 0.2
//       if (!line.includes(obj)) {
//         line.push(obj)
//         // where = {x: obj.pos.x, y: obj.pos.y}
//       }
//     })
//   })
// }

let b
function linkShapes() {

  if (isMouseDown()) {

    whereDidIClick()

    drawLine({
      p1: vec2(where),
      p2: mousePos(),
      color: rgb(0, 0, 0),
      width: 3,
    })

    // vc precisa urgente trocar por algo sem ser hover
    onHover("sta", (obj) => {
      onMouseRelease(() => {

        // saber qual cor está selecionada / adicionar à linha correspondente
        if (selectedColor.red === true) {
          if (!lines.red.includes(obj)) {
            lines.red.push(obj)
            return
          }
        }

        if (selectedColor.blue  === true) {
          if (!lines.blue.includes(obj)) {
            lines.blue.push(obj)
            return
          }
        }

        if (selectedColor.yellow  === true) {
          if (!lines.yellow.includes(obj)) {
            lines.yellow.push(obj)
          }
        }
      })
    })
  }
}

function getShapesPositions() {
  let obs = []

  const allObjs = get("sta")

  for (i in allObjs) {
    obs.push({
      _id: allObjs[i]._id,
      x: allObjs[i].pos.x,
      y: allObjs[i].pos.y,
      obj: allObjs[i]
    })
    console.log(allObjs[i].c)
  }
  return obs
}

loop(1, () => {
  let stas = get("sta")

  if (stas.length < 10) {
    makeShapes()
  }
})

