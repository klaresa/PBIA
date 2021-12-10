import dijkstra from 'dijkstrajs'

var graph = {
  a: {b: 3, d: 1},
  b: {a: 1, c: 1, e: 1},
  c: {b: 1, f: 1},
  d: {a: 1, e: 1, g: 1},
  e: {b: 1, d: 1, f: 1, h: 1},
  f: {c: 1, e: 1, i: 1},
  g: {d: 1, h: 1},
  h: {e: 1, g: 1, i: 1},
  i: {f: 1, h: 1}
};

var grafo = {
  2: {12: 184.36139624418794, 15: 235.96984442058317},
  12: {2: 184.36139624418794, 15: 123.24978364139933, 16: 161.99935464697225},
  15: {2: 235.96984442058317, 12: 123.24978364139933, 16: 262.275036856272},
  16: {12: 161.99935464697225, 15: 262.275036856272}
}

var path = dijkstra.find_path(gf, 15, 16);


console.log(path)

// https://medium.com/@jpena91/dijkstras-algorithm-finding-the-shortest-path-in-javascript-a7247afe93b2
// https://www.tutorialspoint.com/Dijkstra-s-Algorithm-for-Adjacency-List-Representation
// https://isaaccomputerscience.org/concepts/dsa_search_a_star?examBoard=all&stage=all
// https://brilliant.org/wiki/dijkstras-short-path-finder/
// https://www.programiz.com/dsa/dijkstra-algorithm
// https://www.programiz.com/dsa/graph-adjacency-list
