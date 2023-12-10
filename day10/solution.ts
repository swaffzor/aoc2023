/*
--- Day 10: Pipe Maze ---
Scanning the area, you discover that the entire field you're standing on is densely packed with pipes; it was hard to tell at first because they're the same metallic silver color as the "ground". You make a quick sketch of all of the surface pipes you can see (your puzzle input).

The pipes are arranged in a two-dimensional grid of tiles:

| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
Based on the acoustics of the animal's scurrying, you're confident the pipe that contains the animal is one large, continuous loop.

For example, here is a square loop of pipe:

.....
.F-7.
.|.|.
.L-J.
.....
If the animal had entered this loop in the northwest corner, the sketch would instead look like this:

.....
.S-7.
.|.|.
.L-J.
.....
In the above diagram, the S tile is still a 90-degree F bend: you can tell because of how the adjacent pipes connect to it.

Unfortunately, there are also many pipes that aren't connected to the loop! This sketch shows the same loop as above:

-L|F7
7S-7|
L|7||
-L-J|
L|-JF
In the above diagram, you can still figure out which pipes form the main loop: they're the ones connected to S, pipes those pipes connect to, pipes those pipes connect to, and so on. Every pipe in the main loop connects to its two neighbors (including S, which will have exactly two pipes connecting to it, and which is assumed to connect back to those two pipes).

Here is a sketch that contains a slightly more complex main loop:

..F7.
.FJ|.
SJ.L7
|F--J
LJ...
Here's the same example sketch with the extra, non-main-loop pipe tiles also shown:

7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
If you want to get out ahead of the animal, you should find the tile in the loop that is farthest from the starting position. Because the animal is in the pipe, it doesn't make sense to measure this by direct distance. Instead, you need to find the tile that would take the longest number of steps along the loop to reach from the starting point - regardless of which way around the loop the animal went.

In the first example with the square loop:

.....
.S-7.
.|.|.
.L-J.
.....
You can count the distance each tile in the loop is from the starting point like this:

.....
.012.
.1.3.
.234.
.....
In this example, the farthest point from the start is 4 steps away.

Here's the more complex loop again:

..F7.
.FJ|.
SJ.L7
|F--J
LJ...
Here are the distances for each tile on that loop:

..45.
.236.
01.78
14567
23...
Find the single giant loop starting at S. How many steps along the loop does it take to get from the starting position to the point farthest from the starting position?
*/

import { Point } from '../types'
import { extractDataToPointGrid, getPointNeighbors } from '../utils'

export type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S'
export interface PipePoint extends Point<Pipe> {
  value: Pipe
  distance: number
  from: string
  east?: PipePoint
  west?: PipePoint
  north?: PipePoint
  south?: PipePoint
}
export const part1 = (input: string) => {
  const grid = extractDataToPointGrid<PipePoint>(input) as PipePoint[][]
  const connectedGrid = grid.map((row, rowIndex) => {
    return row.map((point, colIndex) => {
      const neighbors = getPointNeighbors(point, grid, false)
      return determineConnection(point, neighbors)
    })
  })

  const start =
    findPointOnGridWithValue<Pipe>(connectedGrid, 'S') || ({} as PipePoint)

  const pass1 = calcDistances(connectedGrid, {
    ...start,
    east: undefined,
  })
    .flat()
    .reduce((acc, cur) => {
      return Math.max(acc, cur.distance)
    }, 0)

  return Math.ceil(pass1 / 2)
}
// 13639 is too high
// 6820 is correct

export const findPointOnGridWithValue = <T>(grid: PipePoint[][], value: T) =>
  grid.flat().find((point) => point.value === value)

//  01234
//0 7-F7-
//1 .FJ|7
//2 SJLL7
//3 |F--J
//4 LJ.LJ

export const determineConnection = (
  point: PipePoint,
  neighbors: Point<Pipe>[]
) => {
  const connections2North = '|7FS'
  const connections2South = '|JLS'
  const connectionsEast = '-7JS'
  const connectionsWest = '-FLS'

  let result: PipePoint = {
    ...point,
    north: undefined,
    south: undefined,
    east: undefined,
    west: undefined,
  }
  neighbors.forEach((neighbor) => {
    if (
      [
        ...connections2North,
        ...connections2South,
        ...connectionsEast,
        ...connectionsWest,
      ].includes(neighbor.value || '') ||
      neighbor.value === 'S'
    ) {
      if (
        point.row - 1 === neighbor.row &&
        point.col === neighbor.col &&
        (point.value === 'S' ||
          (connections2North.includes(neighbor?.value || '') &&
            connections2South.includes(point.value)))
      ) {
        result = {
          ...result,
          north: neighbor as PipePoint,
        }
      }
    }
    if (
      point.row + 1 === neighbor.row &&
      point.col === neighbor.col &&
      (point.value === 'S' ||
        (connections2South.includes(neighbor?.value || '') &&
          connections2North.includes(point.value)))
    ) {
      result = {
        ...result,
        south: neighbor as PipePoint,
      }
    }
    if (
      point.row === neighbor.row &&
      point.col - 1 === neighbor.col &&
      (point.value === 'S' ||
        (connectionsWest.includes(neighbor?.value || '') &&
          connectionsEast.includes(point.value)))
    ) {
      result = {
        ...result,
        west: neighbor as PipePoint,
      }
    }
    if (
      point.row === neighbor.row &&
      point.col + 1 === neighbor.col &&
      (point.value === 'S' ||
        (connectionsEast.includes(neighbor?.value || '') &&
          connectionsWest.includes(point.value)))
    ) {
      result = {
        ...result,
        east: neighbor as PipePoint,
      }
    }
  })
  return { ...result, distance: -1 }
}

export const calcDistances = (grid: PipePoint[][], start: PipePoint) => {
  let distance = 1
  let currentPoint = { ...start, distance: 0 }
  let processing = true
  while (processing) {
    if (currentPoint.north && currentPoint.from !== 'north') {
      const newPoint =
        grid[currentPoint.row][currentPoint.col].north || ({} as PipePoint)
      currentPoint = grid[newPoint.row][newPoint.col]
      currentPoint.from = 'south'
    } else if (currentPoint.south && currentPoint.from !== 'south') {
      const newPoint =
        grid[currentPoint.row][currentPoint.col].south || ({} as PipePoint)
      currentPoint = grid[newPoint.row][newPoint.col]
      currentPoint.from = 'north'
    } else if (currentPoint.east && currentPoint.from !== 'east') {
      const newPoint =
        grid[currentPoint.row][currentPoint.col].east || ({} as PipePoint)
      currentPoint = grid[newPoint.row][newPoint.col]
      currentPoint.from = 'west'
    } else if (currentPoint.west && currentPoint.from !== 'west') {
      const newPoint =
        grid[currentPoint.row][currentPoint.col].west || ({} as PipePoint)
      currentPoint = grid[newPoint.row][newPoint.col]
      currentPoint.from = 'east'
    }
    processing = currentPoint.value !== 'S'
    if (processing) currentPoint.distance = distance++
    else currentPoint.distance = 0
  }
  return grid
}
