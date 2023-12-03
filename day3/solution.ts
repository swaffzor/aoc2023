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

import { Grid } from '../types'
import { getPointNeighbors } from '../utils'

export const extractDataToPointGrid = (input: string) => {
  const rawGrid = input.split('\n').map((line) => line.split(''))
  const pointGrid: Grid<string> = rawGrid.map((row, y) => {
    return row.map((value, x) => {
      return {
        x,
        y,
        value,
      }
    })
  })
  return pointGrid
}

export const part1 = (input: string) => {
  const pointGrid = extractDataToPointGrid(input)
  const neighborGrid = pointGrid.map((row, y, self) => {
    const neighborRows = row.map((point, x) => {
      const neighbors = getPointNeighbors(point, pointGrid)
      return neighbors
    })
    return neighborRows
  })
  return 0
}
