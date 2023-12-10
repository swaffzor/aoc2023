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
