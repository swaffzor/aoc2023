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
  })
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

/*
--- Part Two ---
The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

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
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?
*/

export const part2 = (input: string) => {
  extractDataToPointGrid(input)
  return grid
    .map((row, y) => {
      const partNumbers = row
        .map((point, x) => {
          if (point.value === '*') {
            const neighbors = getPointNeighbors(point, grid)
            const numbersTouchingGear = neighbors.filter(isNumber)
            if (numbersTouchingGear.length >= 2) {
              const temp = numbersTouchingGear
                .map((point) => Number(getNumbers(point)))
                .filter(Boolean)
              return temp.length === 2
                ? temp.reduce((acc, curr) => acc * curr, 1)
                : 0
            }
          }
        })
        .filter(Boolean)
      return partNumbers.flat()
    })
    .flat()
    .reduce((prev, curr) => (prev || 0) + (curr || 0))
}
// 3472892 is too low
// 91634908 is too high

export const getNumbers = (
  point: Point<string>, // todo: remove this point, and pass in the x,y instead
  direction?: 'left' | 'right'
) => {
  let thePoint = grid[point.y][point.x]
  const builtNumber: string[] = []
  thePoint?.z === 0 && builtNumber.push(thePoint.value || '')
  thePoint.z = 1
  // filter out neighbors that are not on the same row
  const rowNeighbors = getPointNeighbors(thePoint, grid).filter(
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
