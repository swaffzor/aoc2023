/*
--- Day 17: Clumsy Crucible ---
To get Desert Island the machine parts it needs as soon as possible, you'll need to find the best way to get the crucible from the lava pool to the machine parts factory. To do this, you need to minimize heat loss while choosing a route that doesn't require the crucible to go in a straight line for too long.

Fortunately, the Elves here have a map (your puzzle input) that uses traffic patterns, ambient temperature, and hundreds of other parameters to calculate exactly how much heat loss can be expected for a crucible entering any particular city block.

For example:

2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
Each city block is marked by a single digit that represents the amount of heat loss if the crucible enters that block. The starting point, the lava pool, is the top-left city block; the destination, the machine parts factory, is the bottom-right city block. (Because you already start in the top-left block, you don't incur that block's heat loss unless you leave that block and then return to it.)

Because it is difficult to keep the top-heavy crucible going in a straight line for very long, it can move at most three blocks in a single direction before it must turn 90 degrees left or right. The crucible also can't reverse direction; after entering each city block, it may only turn left, continue straight, or turn right.

One way to minimize heat loss is this path:

___before____  ____after____
2413432311323  2>>34^>>>1323
3215453535623  32v>>>35v5623
3255245654254  32552456v>>54
3446585845452  3446585845v52
4546657867536  4546657867v>6
1438598798454  14385987984v4
4457876987766  44578769877v6
3637877979653  36378779796v>
4654967986887  465496798688v
4564679986453  456467998645v
1224686865563  12246868655<v
2546548887735  25465488877v5
4322674655533  43226746555v>

This path never moves more than three consecutive blocks in the same direction and incurs a heat loss of only 102.

Directing the crucible from the lava pool to the machine parts factory, but not moving more than three consecutive blocks in the same direction, what is the least heat loss it can incur?
*/

import { Point } from 'types'
import { extractDataToPointGrid, getPointNeighbors } from '../utils'

interface HotPoint extends Point<number> {
  closest: Point<number>
}

type Direction = '^' | '>' | 'v' | '<'
interface Crucible {
  col: number
  row: number
  dir: Direction
  straightCount: number
  heatLoss: number
  lastPoint: Point<number>
}

const emptyPoint = {
  col: 0,
  row: 0,
  z: 0,
  value: 0,
  closest: { col: 0, row: 0 },
}

export const part1 = (input: string) => {
  const grid = extractDataToPointGrid<number>(input)
  const mappedPoints = mapPoints(grid)
  // map the mappedPoints back to a 2D array based off its point's row and col
  const hotGrid = grid.map((row) =>
    row.map((point) => {
      const hotPoint =
        mappedPoints.find(
          (hotPoint) => hotPoint.row === point.row && hotPoint.col === point.col
        ) || emptyPoint
      return hotPoint
    })
  )

  let pathGrid: Point<string>[][] = hotGrid.map((row) =>
    row.map((point) => {
      const pathPoint = {
        ...point,
        value: point.value?.toString(),
      }
      return pathPoint
    })
  )

  const start =
    mappedPoints.find(
      (point) => point.row === grid.length - 1 && point.col === grid.length - 1
    ) || ({ ...emptyPoint } as HotPoint)

  const relativeDir = determineDirection(start, start.closest)
  let crucible: Crucible = {
    col: start.col,
    row: start.col,
    dir: relativeDir === 's' ? '^' : relativeDir === 'r' ? '<' : '>',
    heatLoss: (Number(start?.value) || 0) * -1, // account for the first point not being counted
    straightCount: 0,
    lastPoint: {} as Point<number>,
  }

  while (true) {
    // find closest point
    // can't go backwards, remove that as an option
    pathGrid = logGrid(pathGrid, crucible)

    const neighbors = getPointNeighbors({ ...crucible }, hotGrid)

    const neighborsWithoutBackwards = neighbors.filter(
      (n) =>
        n.row !== crucible.lastPoint.row || n.col !== crucible.lastPoint.col
    )
    // if straightCount is 2, we need to turn, remove straight as an option
    // make the current point the closest point based off of available options
    const tempp = pointAtCrucible(crucible, mappedPoints).closest
    let next: Point<number> = hotGrid[tempp.row][tempp.col]
    if (crucible.straightCount === 2) {
      const turnsOnly = neighborsWithoutBackwards.filter(
        (n) => n.value !== crucible.dir
      )
      next = turnsOnly.reduce((acc, neighbor) => {
        if ((neighbor?.value || -1) < (acc?.value || -1)) {
          return neighbor
        }
        return acc
      })
      next = hotGrid[next.row][next.col]
    } else if (JSON.stringify(crucible.lastPoint) === JSON.stringify(next)) {
      next = neighborsWithoutBackwards.reduce((acc, neighbor) => {
        if ((neighbor?.value || -1) < (acc?.value || -1)) {
          return neighbor
        }
        return acc
      })
      next = hotGrid[next.row][next.col]
    }

    crucible = makeTurn(
      crucible,
      determineDirection(crucible, next),
      mappedPoints
    )
    // crucible = {
    //   dir: makeTurn(
    //     crucible,
    //     determineDirection(pointAtCrucible(crucible, mappedPoints), next)
    //   ).dir,
    //   row: next.row,
    //   col: next.col,
    //   straightCount:
    //     crucible.straightCount === 2 ? 0 : crucible.straightCount + 1,
    //   heatLoss: crucible.heatLoss + Number(next.value),
    //   lastPoint: pointAtCrucible(crucible, mappedPoints),
    // }
  }
}

const logGrid = (grid: Point<string>[][], crucible: Crucible) => {
  console.clear()
  const newGrid: Point<string>[][] = []
  const stringValues = grid
    .map((r) => {
      const newRow: Point<string>[] = []
      const tempRow = r
        .map((p) => {
          const temp =
            p.row === crucible.row && p.col === crucible.col
              ? crucible.dir
              : p.value
          newRow.push({ ...p, value: temp })
          return temp
        })
        .join('')
      newGrid.push(newRow)
      return tempRow
    })
    .join('\n')
    .concat('\n')
  console.log(stringValues)
  return newGrid
}

const pointAtCrucible = (crucible: Crucible, grid: HotPoint[]): HotPoint =>
  grid.find((p) => p.row === crucible.row && p.col === crucible.col)! // || emptyPoint

const backwardMap: Record<Direction, Direction> = {
  '^': 'v',
  '>': '<',
  v: '^',
  '<': '>',
}

const getNextDirPoint = (
  next: Direction,
  point: Point<number>
): Point<number> => {
  switch (next) {
    case '^':
      return { ...point, row: point.row - 1 }
    case '>':
      return { ...point, col: point.col + 1 }
    case 'v':
      return { ...point, row: point.row + 1 }
    case '<':
      return { ...point, col: point.col - 1 }
  }
}

const determineDirection = (point: Point<number>, nextPoint: Point<number>) => {
  if (nextPoint.col === point.col + 1 && nextPoint.row === point.row) {
    return 'r'
  }
  if (nextPoint.col === point.col - 1 && nextPoint.row === point.row) {
    return 'l'
  }
  if (nextPoint.row === point.row + 1 && nextPoint.col === point.col) {
    return 's'
  }
  return 'b'
}

const makeTurn = (
  crucible: Crucible,
  turn: 'l' | 'r' | 's' | 'b',
  mappedPoints: HotPoint[]
): Crucible => {
  // figure out 'where' left and right are based off of current direction
  const cruciblePoint = pointAtCrucible(crucible, mappedPoints)
  const gridSize =
    mappedPoints.reduce((acc, point) => {
      return point.row === 0 ? acc + 1 : acc
    }, 0) - 1

  let tempCrucible = {} as Crucible
  switch (crucible.dir) {
    case '^':
      if (turn === 'l' && crucible.col > 0) {
        tempCrucible = {
          ...crucible,
          col: crucible.col - 1,
          row: crucible.row,
          dir: '<',
        }
      } else if (turn === 'r' && crucible.col < gridSize) {
        tempCrucible = {
          ...crucible,
          col: crucible.col + 1,
          row: crucible.row,
          dir: '>',
        }
      } else break
      break
    case '>':
      if (turn === 'l' && crucible.row > 0) {
        tempCrucible = {
          ...crucible,
          col: crucible.col,
          row: crucible.row - 1,
          dir: '^',
        }
      } else if (turn === 'r' && crucible.row < gridSize) {
        tempCrucible = {
          ...crucible,
          col: crucible.col,
          row: crucible.row + 1,
          dir: 'v',
        }
      } else break
      break
    case 'v':
      if (turn === 'l' && crucible.col < gridSize) {
        tempCrucible = {
          ...crucible,
          col: crucible.col + 1,
          row: crucible.row,
          dir: '>',
        }
      } else if (turn === 'r' && crucible.col > 0) {
        tempCrucible = {
          ...crucible,
          col: crucible.col - 1,
          row: crucible.row,
          dir: '<',
        }
      } else break
      break
    case '<':
      if (turn === 'l' && crucible.row < gridSize) {
        tempCrucible = {
          ...crucible,
          col: crucible.col,
          row: crucible.row + 1,
          dir: 'v',
        }
      } else if (turn === 'r' && crucible.row > 0) {
        tempCrucible = {
          ...crucible,
          col: crucible.col,
          row: crucible.row - 1,
          dir: '^',
        }
      } else break
      break
    default:
      break
  }
  return {
    ...tempCrucible,
    straightCount: turn === 's' ? crucible.straightCount + 1 : 0,
    heatLoss: crucible.heatLoss + Number(cruciblePoint?.value),
    lastPoint: cruciblePoint,
  }
}

const mapPoints = (grid: Point<number>[][]) => {
  const mappedPoints: HotPoint[] = []

  for (let row = grid.length - 1; row >= 0; row--) {
    for (let col = grid[row].length - 1; col >= 0; col--) {
      const point = grid[row][col]
      const neighbors = getPointNeighbors(point, grid)
      const closestNeighbor = neighbors.reduce((acc, neighbor) => {
        if ((neighbor?.value || -1) < (acc?.value || -1)) {
          return neighbor
        }
        return acc
      })
      mappedPoints.push({
        ...point,
        closest: closestNeighbor,
      })
    }
  }

  return mappedPoints
}
