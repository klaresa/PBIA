kaboom({
  width: 600,
  height: 500,
  scale: 1,
  debug: true,
  background: [255, 255, 255],
});

//https://www.udacity.com/blog/2021/10/implementing-dijkstras-algorithm-in-python.html

loadSprite("square", "sprites/s.png");
loadSprite("circle", "sprites/c.png");
loadSprite("triangle", "sprites/t.png");
loadSprite("redD", "sprites/red-dot.png");
loadSprite("blueD", "sprites/blue-dot.png");
loadSprite("yellowD", "sprites/yellow-dot.png");
loadSprite("clear", "sprites/clear.PNG");
loadSprite("idea", "sprites/idea.PNG");
loadSprite("close", "sprites/x.PNG");
loadSprite("current", "sprites/current.png");
loadSprite("current2", "sprites/current2.png");
loadSprite("loc", "sprites/loc.png");
loadSprite("tag", "sprites/tag.png");
loadSprite("target", "sprites/target.png");



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
  area(100),
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

const paths = {
  origin: {
    status: false,
    selected: 0
  },
  destiny: {
    status: false,
    selected: 0
  }
}

const current = add([
  sprite("tag"),
  pos(width() - 70, 30),
  area(30),
  scale(1),
  opacity(0.7),
  origin("center"),
  "current"
])

const current_id = add([
  pos(current.pos.x, current.pos.y + 27),
  color(0, 0, 0),
  origin("center"),
  text(0, {
        size: 14,
        font: 'apl386'
      }
  )
])

const target = add([
  sprite("target"),
  pos(width() - 20, 30),
  area(30),
  scale(0.6),
  opacity(0.7),
  origin("center"),
  "target"
])

const target_id = add([
  pos(target.pos.x, target.pos.y + 27),
  color(0, 0, 0),
  origin("center"),
  text(0, {
        size: 14,
        font: 'apl386'
      }
  )
])

onClick("current", () => {
  paths.origin.status = !paths.origin.status
  if (paths.origin.status === true) {
    current.opacity = 1
  } else {
    current.opacity = 0.5
  }
  console.log('origin', paths)
})

onClick("target", () => {
  paths.destiny.status = !paths.destiny.status
  if (paths.destiny.status === true) {
    target.opacity = 1
  } else {
    target.opacity = 0.5
  }
  console.log('destiny', paths)
})

// add([
//   sprite("close"),
//   pos(575, 50),
//   area(50, 50),
//   scale(1),
//   origin("center"),
//   "ex"
// ])

const highlight = add([
  pos(0, 0),
  circle(20),
  origin('center'),
  color(200, 200, 200),
  opacity(0),
  'highlight'
])

// placar
const score = add([
  // text("Score: 0"),
  // pos(24, 24),
  // {value: 0},
])

//  em que linha ele sera adicionado?
let line = {}
let lineArr = []

/*
* Lista de linhas come??a com 3: vermelha, amarela, azul
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

let where

// runs on every frame - eventos de onDraw devem ficar aqui
onDraw(() => {
  drawGraph()
  // mouseLine()
})

/*
* Reseta todas as conex??es da linha
*/
onClick("clear", () => {
  onMouseRelease(() => {
    lineArr = []
    line = {}
  })
})

let graph
let shortPath
let points = []

onClick("idea", () => {
  shortPath = dijkstra.find_path(graph, paths.origin.selected, paths.destiny.selected)
  console.log('spath', shortPath)

  const stas = get("sta")

  for (let i in shortPath) {
    for (let j in stas) {
      if (shortPath[i] == stas[j]._id) { // got to ignore type for now
        points.push(stas[j].pos)
      }
    }
  }

  onDraw(() => {
    drawPath()
  })
})

/*
* Desenha os pontos do grafo.
*/
function drawPath() {
  for (let i in points) {
    drawLines({
      pts: points,
      color: rgb(255, 0, 0),
      width: 5
    })
  }
}

// renders after all renders - runs all the time
action(() => {
})

/*
* Fun????o que retorna a posi????o do objeto
*/
function returnPos(obj) {
  return {x: obj.pos.x, y: obj.pos.y}
}

/*
* Fun????o que verifica se um objeto est?? pr??ximo
* a outro objeto existente no canvas em (100) dist
*/
function isObjectClose(objs, pos) {

  for (let i = 0; i < objs.length; i++) {
    if (pos.pos.dist({x: objs[i].pos.x, y: objs[i].pos.y}) < 70) {

      // reflete no placar
      // score.value += 1
      // score.text = score.value
      return true
    }
  }
  return false
}

/*
*  Retorna o objeto mais perto de uma determinada posi????o
*/
function getClosestObject(objs, pos) {
  let closest = 100000
  let objProps

  for (let i = 0; i < objs.length; i++) {

    // para o metodo mousePos
    let distance = pos.dist({x: objs[i].x, y: objs[i].y})

    // para obj do jogo
    // let distance = pos.pos.dist({x: objs[i].x, y: objs[i].y})

    if (closest > distance) {
      closest = distance
      objProps = objs[i]
    }
  }
  return objProps
}

/*
* Fun????o que cria e retorna uma nova forma geometrica.
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
* Fun????o que desenha as retas em loop.
*/
function drawGraph() {
  for (let i = 0; i < lineArr.length - 1; i++) {
    drawLine({
      p1: lineArr[i].pos,
      p2: lineArr[i + 1].pos,
      color: rgb(0, 0, 0),
      width: 3,
    }, "line")
  }
}

/*
* Funcao que monta o objeto do grafo desenhado no canvas
*/
var myLastClick
onClick("sta", (currentObj) => {
  if (currentObj === myLastClick) return

  if (paths.origin.status === true || paths.destiny.status === true) {
    checkPathSelection(currentObj)
    return
  }

  if (isMousePressed()) {
    console.log('Adicionando..', currentObj._id)

    if (myLastClick) {
      let existingObj = line[myLastClick._id]
      let distance = currentObj.pos.dist(myLastClick.pos)

      if (existingObj !== currentObj._id) {
        line[myLastClick._id] = {
          ...existingObj,
          [currentObj._id]: distance,
          // pos: currentObj.pos
        }
      }
    }

    lineArr.push(currentObj)
    console.log('line', line)
    graph = line
  }

  myLastClick = currentObj
  highlightLastSelected()
})

function checkPathSelection(obj) {
  if (paths.origin.status === true) {
    paths.origin.selected = obj._id
    current_id.text = obj._id
    current_id.color = rgb(255, 0, 0)

  } else if (paths.destiny.status === true) {
    paths.destiny.selected = obj._id
    target_id.text = obj._id
    target_id.color = rgb(0, 150, 150)
  }
}

/*
* Funcao que destaca a ultima estacao selecionada
*/
function highlightLastSelected() {
  const last = myLastClick.pos

  if (highlight) {
    highlight.pos = vec2(last.x, last.y)
    highlight.opacity = 0.5
  }
}

/*
Reseta as liga????es
*/
onClick("ex", () => {
  console.log('does nothing')
})

function mouseLine() {
  if (isMouseDown()) {

    whereDidIClick()

    drawLine({
      p1: vec2(where),
      p2: mousePos(),
      color: rgb(0, 0, 0),
      width: 3,
    })

  }
}

function whereDidIClick() {
  onClick("sta", (obj) => {
    where = {x: obj.pos.x, y: obj.pos.y}
  })
}

function showIds() {
  const ids = get("sta")

  for (let i of ids) {
    add([
      pos(i.pos.x, i.pos.y - 27),
      color(0, 0, 0),
      origin("center"),
      text(i._id, {
          size: 14,
          font: 'apl386'
        }
      )
    ])
  }
}

/*
* Renders 20 shapes up front
*/
loop(1, () => {
  let stas = get("sta")

  if (stas.length < 20) {
    makeShapes()
    showIds()
  }
})


var dijkstra = {
  single_source_shortest_paths: function (graph, s, d) {
    var predecessors = {};
    var costs = {};
    costs[s] = 0;

    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      adjacent_nodes = graph[u] || {};

      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          cost_of_e = adjacent_nodes[v];
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function (predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function (graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
        predecessors, d);
  },

  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


