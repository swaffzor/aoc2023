import * as fs from 'fs'
import * as path from 'path'
import {
  Grid,
  Location,
  Point,
  PriorityQueue,
  SimpleGraph,
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
  grid: Grid<T>,
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

export const makeSquareGrid = <T>(
  width: number,
  height: number,
  walls: Set<string> = new Set()
): SquareGrid<T> => {
  const inBounds = (point: Point<T>) =>
    point.col >= 0 && point.col < width && point.row >= 0 && point.row < height

  const neighbors = (point: string) => {
    const [col, row] = point.split(',').map((n) => Number(n))
    const cardinalNeighbors = [
      { col: col - 1, row: row },
      { col: col + 1, row: row },
      { col: col, row: row - 1 },
      { col: col, row: row + 1 },
    ]
    const results = cardinalNeighbors.filter(inBounds)
    return results
      .filter((p) => !walls.has(`${p.col},${p.row}`))
      .map((p) => {
        return {
          ...p,
          id: `${p.col},${p.row}`,
        }
      })
  }

  return {
    width,
    height,
    walls,
    inBounds,
    neighbors,
  }
}

// can be used for distance maps, procedural map generation, etc.
export const breadthSearch = <T>(
  grid: SimpleGraph<T>,
  start: string,
  goal: string,
  earlyExit = false
) => {
  const frontier = new Set<string>()
  frontier.add(start)
  const cameFrom = {} as Record<string, string>
  cameFrom[start] = '' // just started, no previous point

  while (frontier.size > 0) {
    const current = frontier.values().next().value as string

    if (earlyExit && current === goal) {
      break
    }

    const neighbors = grid.neighbors(current)

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
