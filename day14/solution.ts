/*
--- Day 14: Parabolic Reflector Dish ---
You reach the place where all of the mirrors were pointing: a massive parabolic reflector dish attached to the side of another large mountain.

The dish is made up of many small mirrors, but while the mirrors themselves are roughly in the shape of a parabolic reflector dish, each individual mirror seems to be pointing in slightly the wrong direction. If the dish is meant to focus light, all it's doing right now is sending it in a vague direction.

This system must be what provides the energy for the lava! If you focus the reflector dish, maybe you can go where it's pointing and use the light to fix the lava production.

Upon closer inspection, the individual mirrors each appear to be connected via an elaborate system of ropes and pulleys to a large metal platform below the dish. The platform is covered in large rocks of various shapes. Depending on their position, the weight of the rocks deforms the platform, and the shape of the platform controls which ropes move and ultimately the focus of the dish.

In short: if you move the rocks, you can focus the dish. The platform even has a control panel on the side that lets you tilt it in one of four directions! The rounded rocks (O) will roll when the platform is tilted, while the cube-shaped rocks (#) will stay in place. You note the positions of all of the empty spaces (.) and rocks (your puzzle input). For example:

O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
Start by tilting the lever so all of the rocks will slide north as far as they will go:

OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....
You notice that the support beams along the north side of the platform are damaged; to ensure the platform doesn't collapse, you should calculate the total load on the north support beams.

The amount of load caused by a single rounded rock (O) is equal to the number of rows from the rock to the south edge of the platform, including the row the rock is on. (Cube-shaped rocks (#) don't contribute to load.) So, the amount of load caused by each rock in each row is as follows:

OOOO.#.O.. 10
OO..#....#  9
OO..O##..O  8
O..#.OO...  7
........#.  6
..#....#.#  5
..O..#.O.O  4
..O.......  3
#....###..  2
#....#....  1
The total load is the sum of the load caused by all of the rounded rocks. In this example, the total load is 136.

Tilt the platform so that the rounded rocks all roll north. Afterward, what is the total load on the north support beams?
*/

import { Point } from '../types'
import {
  extractDataToPointGrid,
  rotatePointsCCW,
  rotatePointsCW,
} from '../utils'

export const part1 = (input: string) => {
  const data = extractDataToPointGrid<string>(input)
  const tiltedGrid = tiltNorth(data)
  return calculateLoad(tiltedGrid)
}

export const tiltNorth = (grid: Point<string>[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      let point = grid[row][column]
      if (point?.value === '.') {
        for (
          let nextRowIndex = point.row + 1;
          nextRowIndex < grid.length;
          nextRowIndex++
        ) {
          let nextRowPoint = grid[nextRowIndex][point.col]
          if (nextRowPoint?.value === 'O') {
            const swappedPoint: Point<string> = { ...point, value: 'O' }
            const swappedNextRowPoint = { ...nextRowPoint, value: '.' }
            grid[row][column] = swappedPoint
            grid[nextRowIndex][point.col] = swappedNextRowPoint
            break
          } else if (nextRowPoint?.value === '#') {
            break
          }
        }
      }
    }
  }
  return grid
}

export const calculateLoad = (grid: Point<string>[][]) => {
  const gridLength = grid.length
  return grid.reduce((acc, row, rowIndex) => {
    return (
      acc +
      row.reduce((accInner, point, colIndex) => {
        if (point.value === 'O') {
          return accInner + gridLength - rowIndex
        }
        return accInner
      }, 0)
    )
  }, 0)
}
/*
--- Part Two ---
The parabolic reflector dish deforms, but not in a way that focuses the beam. To do that, you'll need to move the rocks to the edges of the platform. Fortunately, a button on the side of the control panel labeled "spin cycle" attempts to do just that!

Each cycle tilts the platform four times so that the rounded rocks roll north, then west, then south, then east. After each tilt, the rounded rocks roll as far as they can before the platform tilts in the next direction. After one cycle, the platform will have finished rolling the rounded rocks in those four directions in that order.

Here's what happens in the example above after each of the first few cycles:

After 1 cycle:
.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....

After 2 cycles:
.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O

After 3 cycles:
.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O
This process should work if you leave it running long enough, but you're still worried about the north support beams. To make sure they'll survive for a while, you need to calculate the total load on the north support beams after 1000000000 cycles.

In the above example, after 1000000000 cycles, the total load on the north support beams is 64.

Run the spin cycle for 1000000000 cycles. Afterward, what is the total load on the north support beams?
*/

export const part2 = (input: string) => {
  const data = extractDataToPointGrid<string>(input)
  const spun = spinCycle2(data, 1000000000)
  return calculateLoad(spun)
}
// 89845 is the answer

// export const tiltEast = (grid: Point<string>[][]) => {
//   grid = rotatePointsCCW(grid)
//   grid = tiltNorth(grid)
//   grid = rotatePointsCW(grid)
//   return grid
// }

// export const tiltWest = (grid: Point<string>[][]) => {
//   grid = rotatePointsCW(grid)
//   grid = tiltNorth(grid)
//   grid = rotatePointsCCW(grid)
//   return grid
// }

// export const tiltSouth = (grid: Point<string>[][]) => {
//   grid = rotatePointsCW(grid)
//   grid = rotatePointsCW(grid)
//   grid = tiltNorth(grid)
//   grid = rotatePointsCCW(grid)
//   grid = rotatePointsCCW(grid)
//   return grid
// }

export const spinCycle = (grid: Point<string>[][], spins: number) => {
  for (let i = 0; i < spins; i++) {
    grid = tiltNorth(grid)
    grid = tiltWest2(grid)
    grid = tiltSouth2(grid)
    grid = tiltEast2(grid)
  }
  return grid
}

export const spinCycle2 = (grid: Point<string>[][], spins: number) => {
  const previousStates = new Map<string, [Point<string>[][], number]>()
  let cycleLength = 0

  for (let i = 0; i < spins; i++) {
    const hash = JSON.stringify(grid)
    if (previousStates.has(hash)) {
      console.log(`${new Date().getMinutes()}:${new Date().getSeconds()}: ${i}`)
      const temp = previousStates.get(hash)![1]
      // Calculate where in the cycle `1,000,000,000` spins would land
      const cycleStartSpinCount = temp
      cycleLength = i - cycleStartSpinCount
      const remainingSpins = (spins - i) % cycleLength

      // Spin the remaining spins
      for (let j = 0; j < remainingSpins; j++) {
        grid = tiltNorth(grid)
        grid = tiltWest2(grid)
        grid = tiltSouth2(grid)
        grid = tiltEast2(grid)
      }
      return grid
    }
    previousStates.set(hash, [grid, i])
    grid = tiltNorth(grid)
    grid = tiltWest2(grid)
    grid = tiltSouth2(grid)
    grid = tiltEast2(grid)
  }
  return grid
}

export const tiltEast2 = (grid: Point<string>[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = grid[0].length - 1; column >= 0; column--) {
      let point = grid[row][column]
      if (point?.value === '.') {
        for (
          let nextColumnIndex = column - 1;
          nextColumnIndex >= 0;
          nextColumnIndex--
        ) {
          let nextRowPoint = grid[point.row][nextColumnIndex]
          if (nextRowPoint?.value === 'O') {
            const swappedPoint: Point<string> = { ...point, value: 'O' }
            const swappedNextRowPoint = { ...nextRowPoint, value: '.' }
            grid[row][column] = swappedPoint
            grid[point.row][nextColumnIndex] = swappedNextRowPoint
            break
          } else if (nextRowPoint?.value === '#') {
            break
          }
        }
      }
    }
  }
  return grid
}

export const tiltWest2 = (grid: Point<string>[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      let point = grid[row][column]
      if (point?.value === '.') {
        for (
          let nextColumnIndex = column + 1;
          nextColumnIndex < grid[0].length;
          nextColumnIndex++
        ) {
          let nextRowPoint = grid[point.row][nextColumnIndex]
          if (nextRowPoint?.value === 'O') {
            const swappedPoint: Point<string> = { ...point, value: 'O' }
            const swappedNextRowPoint = { ...nextRowPoint, value: '.' }
            grid[row][column] = swappedPoint
            grid[point.row][nextColumnIndex] = swappedNextRowPoint
            break
          } else if (nextRowPoint?.value === '#') {
            break
          }
        }
      }
    }
  }
  return grid
}

export const tiltSouth2 = (grid: Point<string>[][]) => {
  for (let row = grid.length - 1; row >= 0; row--) {
    for (let column = 0; column < grid[0].length; column++) {
      let point = grid[row][column]
      if (point?.value === '.') {
        for (let nextRowIndex = row - 1; nextRowIndex >= 0; nextRowIndex--) {
          let nextRowPoint = grid[nextRowIndex][point.col]
          if (nextRowPoint?.value === 'O') {
            const swappedPoint: Point<string> = { ...point, value: 'O' }
            const swappedNextRowPoint = { ...nextRowPoint, value: '.' }
            grid[row][column] = swappedPoint
            grid[nextRowIndex][point.col] = swappedNextRowPoint
            break
          } else if (nextRowPoint?.value === '#') {
            break
          }
        }
      }
    }
  }
  return grid
}
