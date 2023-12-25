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
2413432311323  2>>34^>>>1323 0
3215453535623  32v>>>35v5623 1
3255245654254  32552456v>>54 2
3446585845452  3446585845v52 3
4546657867536  4546657867v>6 4
1438598798454  14385987984v4 5
4457876987766  44578769877v6 6
3637877979653  36378779796v> 7
4654967986887  465496798688v 8
4564679986453  456467998645v 9
1224686865563  12246868655<v A
2546548887735  25465488877v5 B
4322674655533  43226746555v> C

0123456789ABC  0123456789ABC
This path never moves more than three consecutive blocks in the same direction and incurs a heat loss of only 102.

Directing the crucible from the lava pool to the machine parts factory, but not moving more than three consecutive blocks in the same direction, what is the least heat loss it can incur?
*/

import { Point, Location, WeightedGrid, Graph } from 'types'
import {
  breadthSearch,
  extractDataToPointGrid,
  getPointNeighbors,
  logGridValues,
  makeSquareGrid,
  determineDirection,
  extractDataToGraph,
  // dijkstra,
  extractDataToWeightedGraph,
  drawGrid,
} from '../utils'

type Direction = '^' | '>' | 'v' | '<'

function cost<T>(
  grid: WeightedGrid<T>,
  toNode: {
    id: string
    cost: number
    direction: Direction
    straightCount: number
  }
): number {
  // get the heat loss from toNode
  const heatLoss = grid.weights[toNode.id]

  return heatLoss
}

const dijkstra = <T>(
  graph: WeightedGrid<T>,
  start: string,
  goal: string,
  getCost: (
    from: Location<T>,
    to: Location<T>,
    cost: number,
    mustTurn: boolean
  ) => number
): [Record<string, string>, Record<string, number>] => {
  const frontier: [string, number, string][] = [[`${start}:>`, 0, '']]
  const cameFrom = {} as Record<string, string>
  const costSoFar = {} as Record<string, number>
  // just started, no previous point
  // frontier.push(start, 0)
  cameFrom[`${start}:>`] = ''
  costSoFar[`${start}:>`] = 0

  while (frontier.length > 0) {
    const [current, direction] = frontier.shift() as [string, number, string]
    // const current = id.split(':')[0]

    if (current === goal) {
      break
    }

    const neighbors = Object.values(graph.neighbors(current.split(':')[0])) //.map((n) => n.id)
    const fromLocation = graph.nodes[current.split(':')[0]]
    for (let next of neighbors) {
      const toLocation = neighbors.find((n) => n === next) as Location<T>
      // determine if we need to turn, if going same direction for last 3 points, we need to turn
      const p1 = cameFrom[current]?.split(',')
      const p2 = cameFrom[cameFrom[current]]?.split(',')
      const p3 = cameFrom[cameFrom[cameFrom[current]]]?.split(',')
      // mustTurn is true if the last 3 points are going in the same direction, split the string on , and compare the first char of each
      const v1 = p1 !== undefined && p1.length > 1
      const v2 = p2 !== undefined && p2.length > 1
      const v3 = p3 !== undefined && p3.length > 1
      const mustTurnVert = v1 && v2 && v3 && p1[0] === p2[0] && p2[0] === p3[0]
      const mustTurnHorz = v1 && v2 && v3 && p1[1] === p2[1] && p2[1] === p3[1]
      let mustTurn = false
      const currDirection = determineDirection(fromLocation, toLocation)
      if (mustTurnHorz || mustTurnVert) {
        const prevDirection = determineDirection(
          { row: Number(p3[1]), col: Number(p3[0]) },
          { row: Number(p2[1]), col: Number(p2[0]) }
        )
        mustTurn = currDirection === prevDirection
      }

      const newCost =
        costSoFar[current] +
        getCost(
          fromLocation,
          toLocation,
          graph.weights[toLocation.id],
          mustTurn
        )

      const key = `${next.id}:${currDirection}`
      if (!(key in costSoFar) || newCost < costSoFar[key]) {
        costSoFar[key] = newCost
        frontier.push([key, newCost, currDirection])
        cameFrom[key] = current
      }
    }

    frontier.sort((a, b) => a[1] - b[1])
    // frontier.delete(current)
  }

  return [cameFrom, costSoFar]
}

const calculateCost = <T>(
  from: Location<T>,
  to: Location<T>,
  cost: number,
  mustTurn: boolean
): number => {
  const STRAIGHT_PENALTY = 10000
  return mustTurn ? cost + STRAIGHT_PENALTY : cost
}

type WeirdType = [
  Record<string, { id: string; direction: Direction }>,
  Record<string, { cost: number; direction: Direction }>
]

export const modifiedDijkstra = <T>(
  graph: WeightedGrid<T>,
  start: string,
  goal: string
): WeirdType => {
  let frontier: Array<{
    id: string
    cost: number
    direction: Direction
    straightCount: number
  }> = []
  frontier.push({ id: start, cost: 0, direction: '>', straightCount: 0 }) // Start going right

  let cameFrom: Record<string, { id: string; direction: Direction }> = {}
  cameFrom[start] = { id: '', direction: '>' }

  let costSoFar: Record<string, { cost: number; direction: Direction }> = {}
  costSoFar[start] = { cost: 0, direction: '>' }

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.cost - b.cost)
    const current = frontier.shift()!

    if (current?.id === goal) {
      break
    }

    let neighbors = Object.values(graph.neighbors(current?.id || ''))

    for (let next of neighbors) {
      const [col, row] = current.id.split(',')
      const newDirection = determineDirection(
        { col: Number(col), row: Number(row) },
        next
      )
      let newCost = costSoFar[current.id].cost + graph.weights[next.id]
      const newStraightCount =
        newDirection === current.direction ? current.straightCount + 1 : 0

      if (
        newStraightCount < 2 &&
        (!costSoFar[next.id] || newCost < costSoFar[next.id].cost)
      ) {
        costSoFar = {
          ...costSoFar,
          [next.id]: { cost: newCost, direction: newDirection },
        }
        // costSoFar[next.id].cost = newCost
        // costSoFar[next.id].direction = newDirection
        cameFrom = {
          ...cameFrom,
          [next.id]: { id: current.id, direction: newDirection },
        }
        // cameFrom[next.id].id = currentID
        // cameFrom[next.id].direction = newDirection
        frontier.push({
          id: next.id,
          cost: newCost,
          direction: newDirection,
          straightCount: newStraightCount,
        })
      }
    }
  }
  return [cameFrom, costSoFar]
}

export const part1 = (input: string) => {
  const grid = extractDataToWeightedGraph<number>(input, {})
  let second: [string, Direction, number][][][] = []
  for (let id in grid.nodes) {
    const location = grid.nodes[id]
    let third: [string, Direction, number][][] = []
    for (let direction of ['^', '>', 'v', '<'] as Direction[]) {
      let fourth: [string, Direction, number][] = []
      for (let straightCount = 0; straightCount < 3; straightCount++) {
        fourth.push([`${id}`, direction, straightCount])
      }
      third.push(fourth)
    }
    second.push(third)
  }

  const bottomRightElement = Object.values(grid.nodes).reduce(
    (acc, location) => {
      const point = grid.nodes[location.id]
      if (point.row === grid.height - 1 && point.col === grid.width - 1) {
        return point
      }
      return acc
    }
  )

  const [parents, costs] = modifiedDijkstra<number>(
    grid,
    '0,0',
    bottomRightElement.id
  )

  const adjustedParents0 = Object.entries(parents).map(([k, v]) => {
    return `${k}:${v.id}`
  })

  const adjustedParents = adjustedParents0.reduce((acc, value) => {
    const [k, v] = value.split(':')
    acc[k] = v
    return acc
  }, {} as Record<string, string>)

  const path = reconstructPath('0,0', bottomRightElement.id, adjustedParents)
  const drawn = ''
  drawGrid(grid, {
    point_to: adjustedParents,
    start: '0,0',
    goal: bottomRightElement.id,
  })
  let last = ''
  const pathRecord = path.reverse().reduce((acc, p) => {
    acc[p] = last
    last = p
    return acc
  }, {} as Record<string, string>)

  drawGrid(grid, {
    start: '0,0',
    goal: bottomRightElement.id,
    point_to: pathRecord,
    // number: grid.weights,
  })
  return path.length
}

const reconstructPath = (
  start: string,
  goal: string,
  cameFrom: Record<string, string>
) => {
  let current = goal
  // A path is a sequence of edges, but often it’s easier to store the nodes
  const path: string[] = []

  while (current !== start && current !== undefined) {
    path.push(current)
    current = cameFrom[current]
  }
  path.push(start) // optional
  path.reverse() // optional
  return path
}
