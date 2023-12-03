/*
The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
*/

import { Grid, Point } from '../types'
import { getPointNeighbors } from '../utils'

const grid: Grid<string> = []

export const extractDataToPointGrid = (input: string) => {
  const rawGrid = input.split('\n').map((line) => line.split(''))
  const pointGrid: Grid<string> = rawGrid.map((row, y) => {
    return row.map((value, x) => {
      return {
        x,
        y,
        z: 0,
        value,
      }
    })
  })
  grid.push(...pointGrid)
}

const isNumber = (point: Point<string>) =>
  point?.value && parseInt(point?.value) >= 0

export const part1 = (input: string) => {
  extractDataToPointGrid(input)
  const partNumbersSum = grid.map((row, y) => {
    const partNumbers = row
      .map((point, x) => {
        if (point.value !== '.') {
          if (isNumber(point)) {
            const neighbors = getPointNeighbors(point, grid)
            const touchesSymbol = neighbors.some(
              (neighbor) => neighbor.value !== '.' && !isNumber(neighbor)
            )
            if (touchesSymbol) {
              // figure out the number the symbol is touching
              return Number(getFullNumber(point, neighbors))
              // need to remove the duplicates
            }
          }
        }
      })
      .filter(Boolean)
    return partNumbers
  }, 0)
  return partNumbersSum.flat().reduce((acc, partNumbers) => {
    return (acc || 0) + (partNumbers || 0)
  }, 0)
}

export const getFullNumber = (
  point: Point<string>, // todo: remove this point, and pass in the x,y instead
  neighbors: Point<string>[],
  direction?: 'left' | 'right'
) => {
  let thePoint = grid[point.y][point.x]
  if (thePoint === undefined) {
    console.log('point: ', point)
  }
  const builtNumber: string[] = []
  thePoint?.z === 0 && builtNumber.push(thePoint.value || '')
  thePoint.z = 1
  // filter out neighbors that are not on the same row
  const rowNeighbors = neighbors.filter(
    (neighbor) =>
      isNumber(neighbor) && neighbor.y === thePoint.y && neighbor.z === 0
  )
  rowNeighbors.forEach((neighbor) => {
    if (
      direction !== 'left' &&
      neighbor.x === thePoint.x + 1 &&
      neighbor.z === 0
    ) {
      const idk = getFullNumber(
        neighbor,
        getPointNeighbors(neighbor, grid),
        // grid,
        'right'
      )
      neighbor.z = 1
      builtNumber.push(idk)
    } else if (
      direction !== 'right' &&
      neighbor.x === thePoint.x - 1 &&
      neighbor.z === 0
    ) {
      const idk = getFullNumber(
        neighbor,
        getPointNeighbors(neighbor, grid),
        // grid,
        'left'
      )
      neighbor.z = 1
      builtNumber.unshift(idk)
    }
  })

  return builtNumber.join('')
}
