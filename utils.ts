import * as fs from 'fs'
import * as path from 'path'
import {
  PointGrid,
  Location,
  Point,
  PriorityQueue,
  Graph,
  SquareGrid,
  WeightedGraph,
} from './types'

export const getPuzzleInput = <T = string>(
  fileName: string,
  directoryName?: string,
  iterator?: (input: string) => T
): string | T => {
  const inputString = fs.readFileSync(
    path.resolve(directoryName ? directoryName : '', fileName + '.txt'),
    'utf8'
  )
  if (iterator !== undefined) {
    return iterator(inputString)
  } else {
    return inputString
  }
}

export const getPointNeighbors = <T>(
  point: Point<T>,
  grid: PointGrid<T>,
  includeDiagonals = false
) => {
  const neighbors: Point<T>[] = []

  const left = point.col - 1 >= 0 && grid[point.row][point.col - 1]
  const right =
    point.col + 1 < grid[point.row].length && grid[point.row][point.col + 1]
  const above = point.row - 1 >= 0 && grid[point.row - 1][point.col]
  const below = point.row + 1 < grid.length && grid[point.row + 1][point.col]

  const leftAbove =
    left !== false && above !== false && grid[point.row - 1][point.col - 1]
  const rightAbove =
    right !== false && above !== false && grid[point.row - 1][point.col + 1]
  const leftBelow =
    left !== false && below !== false && grid[point.row + 1][point.col - 1]
  const rightBelow =
    right !== false && below !== false && grid[point.row + 1][point.col + 1]

  if (left !== false) {
    neighbors.push({
      col: point.col - 1,
      row: point.row,
      z: left?.z || 0,
      value: grid[point.row][point.col - 1]?.value,
    })
  }
  if (right !== false) {
    neighbors.push({
      col: point.col + 1,
      row: point.row,
      z: right?.z || 0,
      value: grid[point.row][point.col + 1]?.value,
    })
  }
  if (above !== false) {
    neighbors.push({
      col: point.col,
      row: point.row - 1,
      z: above?.z || 0,
      value: grid[point.row - 1][point.col]?.value,
    })
  }
  if (below !== false) {
    neighbors.push({
      col: point.col,
      row: point.row + 1,
      z: below?.z || 0,
      value: grid[point.row + 1][point.col]?.value,
    })
  }
  if (includeDiagonals && leftAbove !== false) {
    neighbors.push({
      col: point.col - 1,
      row: point.row - 1,
      z: leftAbove?.z || 0,
      value: grid[point.row - 1][point.col - 1]?.value,
    })
  }
  if (includeDiagonals && rightAbove !== false) {
    neighbors.push({
      col: point.col + 1,
      row: point.row - 1,
      z: rightAbove?.z || 0,
      value: grid[point.row - 1][point.col + 1]?.value,
    })
  }
  if (includeDiagonals && leftBelow !== false) {
    neighbors.push({
      col: point.col - 1,
      row: point.row + 1,
      z: leftBelow?.z || 0,
      value: grid[point.row + 1][point.col - 1]?.value,
    })
  }
  if (includeDiagonals && rightBelow !== false) {
    neighbors.push({
      col: point.col + 1,
      row: point.row + 1,
      z: rightBelow?.z || 0,
      value: grid[point.row + 1][point.col + 1]?.value,
    })
  }

  return neighbors
}

export const extractDataToPointGrid = <T>(input: string) => {
  const grid: Point<T>[][] = []
  const lines = input.split('\n')

  for (let row = 0; row < lines.length; row++) {
    grid[row] = []
    for (let col = 0; col < lines[row].length; col++) {
      grid[row][col] = {
        col,
        row,
        value: lines[row][col],
      }
    }
  }
  return grid
}

export const extractDataToGraph = <T>(
  input: string,
  wallChar?: string
): SquareGrid<T> => {
  const nodes: Record<string, Location<T>> = {}
  const lines = input.split('\n')

  let width = 0
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      const id = `${col},${row}`
      nodes[id] = {
        col,
        row,
        id,
        value: lines[row][col] as T,
      }
    }
    width = lines[row].length
  }

  return makeSquareGrid<T>(
    width,
    lines.length,
    nodes,
    wallChar ? getWalls<T>(Object.values(nodes), wallChar) : undefined
  )
}

export const rotateCW = <T>(grid: T[][]) => {
  const rows = grid.length
  const newMatrix: T[][] = []
  for (let i = 0; i < rows; i++) {
    newMatrix[i] = []
    for (let j = grid[i].length - 1; j >= 0; j--) {
      newMatrix[i].push(grid[j][i])
    }
  }
  return newMatrix
}

export const rotateCCW = <T>(grid: T[][]) => {
  const rows = grid.length
  const newMatrix: T[][] = []
  for (let i = 0; i < rows; i++) {
    newMatrix[i] = []
    let colIndex = rows - 1 - i
    for (let j = 0; j < grid[i].length; j++) {
      newMatrix[i].push(grid[j][colIndex])
    }
  }
  return newMatrix
}

export const rotatePointsCCW = (grid: Point<string>[][]) => {
  const rows = grid.length
  const newMatrix: Point<string>[][] = []

  for (let i = 0; i < rows; i++) {
    let colIndex = rows - 1 - i
    newMatrix[i] = []
    for (let j = 0; j < grid[i].length; j++) {
      // Fetch the point
      let point = grid[j][colIndex]
      // Create a new point with switched rows and columns
      let newPoint: Point<string> = { ...point, row: i, col: j }
      // Add this new point to the newMatrix
      newMatrix[i].push(newPoint)
    }
  }
  return newMatrix
}

export const rotatePointsCW = (grid: Point<string>[][]) => {
  const rows = grid.length
  const newMatrix: Point<string>[][] = []

  for (let i = 0; i < rows; i++) {
    newMatrix[i] = []
    for (let j = 0; j < grid[i].length; j++) {
      // Fetch the point
      let point = grid[grid[i].length - 1 - j][i]
      // Create a new point with switched columns and rows
      let newPoint: Point<string> = { ...point, row: i, col: j }
      // Add this new point to the newMatrix
      newMatrix[i].push(newPoint)
    }
  }

  return newMatrix
}

export const gridToString = <T>(grid: Point<T>[][]) =>
  grid.map((row) => row.map((point) => point.value).join('')).join('\n')

export const getPointGridNodes = <T>(grid: Point<T>[][]) => {
  const nodes: Record<string, Location<T>> = {}
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x].value !== undefined) {
        nodes[`${x},${y}`] = {
          col: x,
          row: y,
          id: `${x},${y}`,
          value: grid[y][x].value as T,
        }
      }
    }
  }
  return nodes
}

export const makeSquareGridFromPointGrid = <T>(
  points: Point<T>[][],
  wallChar?: string
) => {
  const nodes = getPointGridNodes<T>(points)
  const walls =
    wallChar !== undefined
      ? getWalls<T>(Object.values(nodes), wallChar)
      : new Set<string>()
  const grid = makeSquareGrid<T>(points[0].length, points.length, nodes, walls)

  return grid
}

export const getWalls = <T>(locations: Location<T>[], wallChar: string) => {
  const walls = new Set<string>()
  for (const location of locations) {
    if (location.value === wallChar) {
      walls.add(`${location.col},${location.row}`)
    }
  }
  return walls
}

const getNeighbors = <T>(
  point: string,
  nodes: Record<string, Location<T>>,
  inBounds: (point: Point<T>) => boolean,
  isValid: (point: Point<T>) => boolean,
  ignoreWalls?: boolean
) => {
  const tempNeighbors: Record<string, Location<T>> = {}
  const [col, row] = point.split(',').map((n) => Number(n))
  const cardinalNeighbors = [
    { col: col - 1, row: row },
    { col: col + 1, row: row },
    { col: col, row: row - 1 },
    { col: col, row: row + 1 },
  ]
  const results = cardinalNeighbors
    .filter(inBounds)
    .map((p) => nodes[`${p.col},${p.row}`])
  const filtered = results.filter(isValid)
  const neighbors = ignoreWalls ? results : filtered
  neighbors.forEach((p) => {
    const edgeId = `${p.col},${p.row}`
    tempNeighbors[edgeId] = p
  })
  return tempNeighbors
}

const isInBounds = <T>(point: Point<T>, width: number, height: number) =>
  point.col >= 0 && point.col < width && point.row >= 0 && point.row < height

const isPointValid = <T>(point: Point<T>, walls: Set<string>) =>
  !walls.has(`${point.col},${point.row}`)

export const makeSquareGrid = <T>(
  width: number,
  height: number,
  nodes: Record<string, Location<T>> = {},
  walls: Set<string> = new Set()
): SquareGrid<T> => {
  return {
    width,
    height,
    nodes,
    walls,
    inBounds: (point) => isInBounds(point, width, height),
    isValid: (point) => isPointValid(point, walls),
    neighbors: (id, ignoreWalls) =>
      getNeighbors(
        id,
        nodes,
        (p) => isInBounds(p, width, height),
        (p) => (ignoreWalls ? true : isPointValid(p, walls))
      ),
  }
}

export const determineDirection = (
  point: Point<number>,
  nextPoint: Point<number>
) => {
  if (nextPoint.col > point.col && nextPoint.row === point.row) {
    return '>'
  }
  if (nextPoint.col < point.col && nextPoint.row === point.row) {
    return '<'
  }
  if (nextPoint.row > point.row && nextPoint.col === point.col) {
    return 'v'
  }
  return '^'
}

// a function to log each value in the grid to the console in a grid format
export const logGridValues = <T>(
  grid: SquareGrid<T>,
  parents?: Record<string, string>,
  start?: string,
  goal?: string
) => {
  // create an array of arrays to hold the values
  const gridValues: string[][] = []
  // loop through each row
  for (let row = 0; row < grid.height; row++) {
    // create a new array to hold the values for this row
    const newRow: string[] = []
    // loop through each column
    for (let col = 0; col < grid.width; col++) {
      const id = `${col},${row}`
      if (goal && id === goal) {
        newRow.push('G')
      } else if (start && id === start) {
        newRow.push('S')
      }
      // if this point is the parent, put either a <^>v for the direction relative between the parent and the current point
      else if (parents && !!parents[id]) {
        const parent = parents![id]
        const [parentCol, parentRow] = parent.split(',').map((n) => Number(n))
        const relativeDir = determineDirection(
          { col: parentCol, row: parentRow },
          { col, row }
        )
        newRow.push('#')
      } else {
        // get the value at this point
        // add the value to the row array
        const inWalls = grid.walls.has(`${col},${row}`)
        newRow.push(inWalls ? 'x' : ' ')
      }
    }
    // add the row array to the gridValues array
    gridValues.push(newRow)
  }
  return gridValues
}

export const drawGrid = (graph: SquareGrid<string>, style: Style) => {
  // console.log('___'.repeat(graph.width))
  const result: string[][] = []
  for (let row = 0; row < graph.height; row++) {
    const rowResult: string[] = []
    for (let col = 0; col < graph.width; col++) {
      const tile = drawTile(graph, `${col},${row}`, style)
      // process.stdout.write(tile)
      rowResult.push(tile)
    }
    process.stdout.write(rowResult.join(''))
    process.stdout.write('\n')
    result.push(rowResult)
  }
  process.stdout.write('___'.repeat(graph.width))
  return result
}

export const drawTile = (
  graph: SquareGrid<string>,
  id: string,
  style: Style
): string => {
  let r = '.'
  if (style.number && style.number[id]) {
    r = ` ${style.number[id]} `
  }
  if (style.point_to && style.point_to[id]) {
    const [x1, y1] = id.split(',').map((n) => Number(n))
    const [x2, y2] = style.point_to[id].split(',').map((n) => Number(n))
    if (x2 === x1 + 1) r = '>'
    if (x2 === x1 - 1) r = '<'
    if (y2 === y1 + 1) r = 'v'
    if (y2 === y1 - 1) r = '^'
  }
  if (style.path && style.path[id]) {
    r = '@'
  }
  if (style.start && id === style.start) {
    r = 'S'
  }
  if (style.goal && id === style.goal) {
    r = 'Z'
  }
  if (graph.walls.has(id)) {
    r = '#'
  }
  if (style.values && style.values[id]) {
    r = style.values[id]
  }
  return r
}
interface Style {
  number?: Record<string, number>
  point_to?: Record<string, string>
  path?: Record<string, boolean>
  start?: string
  goal?: string
  values?: Record<string, string>
}

// can be used for distance maps, procedural map generation, etc.
// thanks to https://www.redblobgames.com/pathfinding/a-star/implementation.html#algorithm
export const breadthSearch = <T>(
  grid: Graph<T>,
  start: string = '0,0',
  goal?: string,
  ignoreWalls = false
) => {
  const frontier = new Set<string>()
  frontier.add(start)
  const cameFrom = {} as Record<string, string>
  cameFrom[start] = '' // just started, no previous point

  while (frontier.size > 0) {
    const current = frontier.values().next().value as string

    if (current === goal) {
      break
    }

    const neighbors = Object.values(grid.neighbors(current, ignoreWalls))

    for (const next of neighbors) {
      const id = `${next.col},${next.row}`
      if (!(id in cameFrom)) {
        frontier.add(id)
        cameFrom[id] = current
      }
    }

    frontier.delete(current)
  }
  return cameFrom
}

// export const dijkstra = (
//   graph: WeightedGraph<number>,
//   start: Location<number>,
//   goal: Location<number>
// ) => {
//   const frontier: PriorityQueue<Location<number>> = {
//     elements: [],
//     push: (item, priority) => {
//       frontier.elements.push([frontier.elements, [item, priority]])
//       frontier.elements.sort((a, b) => a[1] - b[1])
//     },
//     pop: () => {
//       return frontier.shift()?.item
//     },
//     size: () => frontier.length,
//   }

//   const cameFrom = {} as Record<string, Point<number>>
//   cameFrom[start.col + ',' + start.row] = {} as Point<number> // just started, no previous point

//   const costSoFar = {} as Record<string, number>
//   costSoFar[start.col + ',' + start.row] = 0

//   while (frontier.size > 0) {
//     const current = frontier.values().next().value

//     if (current?.col === goal.col && current?.row === goal.row) {
//       break
//     }

//     const neighbors = getPointNeighbors(current, grid)
//     // const test = neighbors.filter((n) => Number(n.value) < current.value)

//     for (const next of neighbors) {
//       const newCost =
//         costSoFar[current.col + ',' + current.row] + Number(next.value)
//       const nextIndex = next.col + ',' + next.row
//       if (!(nextIndex in costSoFar)) {
//         frontier.set(newCost, next)
//         cameFrom[nextIndex] = current
//       }
//     }

//     frontier.delete(current)
//   }
// }

// var e0 = [0, 0];
// var e1 = [0, 0];

// function area(a) {
//   var area = 0;
//   var first = a[0];

//   var l = a.length;
//   for (var i=2; i<l; i++) {
//     var p = a[i-1];
//     var c = a[i];
//     e0[0] = first[0] - c[0];
//     e0[1] = first[1] - c[1];
//     e1[0] = first[0] - p[0];
//     e1[1] = first[1] - p[1];

//     area += (e0[0] * e1[1]) - (e0[1] * e1[0]);
//   }
//   return area/2;
// }

// write a function that takes a list of points and returns the area of the polygon
// the points are in order around the polygon
// the points are in 2d space
// the points are in the form [x, y]
// the points can be in any unit (e.g. meters, miles, lightyears)
// the area should be in the square of whatever units are used for x and y
// the area should be positive
export const polygonArea = <T>(locations: Point<T>[]) => {
  const points = locations.map(({ col, row }) => [col, row])
  const first = points[0]
  const last = points[points.length - 1]
  const area = points.reduce((acc, curr, index) => {
    const next = points[index + 1]
    if (next) {
      return acc + (curr[0] * next[1] - curr[1] * next[0])
    } else {
      return acc + (curr[0] * first[1] - curr[1] * first[0])
    }
  }, 0)
  return Math.abs(area / 2)
}
