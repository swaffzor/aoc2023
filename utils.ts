import * as fs from 'fs'
import * as path from 'path'
import { Grid, Point } from './types'

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
  includeDiagonals = true
) => {
  const neighbors: Point<T>[] = []

  const left = point.x - 1 >= 0 && grid[point.y][point.x - 1]
  const right = point.x + 1 < grid[point.y].length && grid[point.y][point.x + 1]
  const above = point.y - 1 >= 0 && grid[point.y - 1][point.x]
  const below = point.y + 1 < grid.length && grid[point.y + 1][point.x]

  const leftAbove =
    left !== false && above !== false && grid[point.y - 1][point.x - 1]
  const rightAbove =
    right !== false && above !== false && grid[point.y - 1][point.x + 1]
  const leftBelow =
    left !== false && below !== false && grid[point.y + 1][point.x - 1]
  const rightBelow =
    right !== false && below !== false && grid[point.y + 1][point.x + 1]

  if (left !== false) {
    neighbors.push({
      x: point.x - 1,
      y: point.y,
      z: left?.z || 0,
      value: grid[point.y][point.x - 1]?.value,
    })
  }
  if (right !== false) {
    neighbors.push({
      x: point.x + 1,
      y: point.y,
      z: right?.z || 0,
      value: grid[point.y][point.x + 1]?.value,
    })
  }
  if (above !== false) {
    neighbors.push({
      x: point.x,
      y: point.y - 1,
      z: above?.z || 0,
      value: grid[point.y - 1][point.x]?.value,
    })
  }
  if (below !== false) {
    neighbors.push({
      x: point.x,
      y: point.y + 1,
      z: below?.z || 0,
      value: grid[point.y + 1][point.x]?.value,
    })
  }
  if (includeDiagonals && leftAbove !== false) {
    neighbors.push({
      x: point.x - 1,
      y: point.y - 1,
      z: leftAbove?.z || 0,
      value: grid[point.y - 1][point.x - 1]?.value,
    })
  }
  if (includeDiagonals && rightAbove !== false) {
    neighbors.push({
      x: point.x + 1,
      y: point.y - 1,
      z: rightAbove?.z || 0,
      value: grid[point.y - 1][point.x + 1]?.value,
    })
  }
  if (includeDiagonals && leftBelow !== false) {
    neighbors.push({
      x: point.x - 1,
      y: point.y + 1,
      z: leftBelow?.z || 0,
      value: grid[point.y + 1][point.x - 1]?.value,
    })
  }
  if (includeDiagonals && rightBelow !== false) {
    neighbors.push({
      x: point.x + 1,
      y: point.y + 1,
      z: rightBelow?.z || 0,
      value: grid[point.y + 1][point.x + 1]?.value,
    })
  }

  return neighbors
}
