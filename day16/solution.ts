/*
--- Day 16: The Floor Will Be Lava ---
Upon closer inspection, the contraption appears to be a flat, two-dimensional square grid containing empty space (.), mirrors (/ and \), and splitters (| and -).

The contraption is aligned so that most of the beam bounces around the grid, but each tile on the grid converts some of the beam's light into heat to melt the rock in the cavern.

You note the layout of the contraption (your puzzle input). For example:

.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....
The beam enters in the top-left corner from the left and heading to the right. Then, its behavior depends on what it encounters as it moves:

If the beam encounters empty space (.), it continues in the same direction.
If the beam encounters a mirror (/ or \), the beam is reflected 90 degrees depending on the angle of the mirror. For instance, a rightward-moving beam that encounters a / mirror would continue upward in the mirror's column, while a rightward-moving beam that encounters a \ mirror would continue downward from the mirror's column.
If the beam encounters the pointy end of a splitter (| or -), the beam passes through the splitter as if the splitter were empty space. For instance, a rightward-moving beam that encounters a - splitter would continue in the same direction.
If the beam encounters the flat side of a splitter (| or -), the beam is split into two beams going in each of the two directions the splitter's pointy ends are pointing. For instance, a rightward-moving beam that encounters a | splitter would split into two beams: one that continues upward from the splitter's column and one that continues downward from the splitter's column.
Beams do not interact with other beams; a tile can have many beams passing through it at the same time. A tile is energized if that tile has at least one beam pass through it, reflect in it, or split in it.

In the above example, here is how the beam of light bounces around the contraption:

>|<<<\....
|v-.\^....
.v...|->>>
.v...v^.|.
.v...v^...
.v...v^..\
.v../2\\..
<->-/vv|..
.|<<<2-|.\
.v//.|.v..
Beams are only shown on empty tiles; arrows indicate the direction of the beams. If a tile contains beams moving in multiple directions, the number of distinct directions is shown instead. Here is the same diagram but instead only showing whether a tile is energized (#) or not (.):

######....
.#...#....
.#...#####
.#...##...
.#...##...
.#...##...
.#..####..
########..
.#######..
.#...#.#..
Ultimately, in this example, 46 tiles become energized.

The light isn't energizing enough tiles to produce lava; to debug the contraption, you need to start by analyzing the current situation. With the beam starting in the top-left heading right, how many tiles end up being energized?
*/

import { Point } from '../types'
import {
  extractDataToPointGrid,
  getPointNeighbors,
  getPuzzleInput,
} from '../utils'

type Tile = Point<string>
interface Beam {
  point: Point<string>
  direction: string
}

// 8034 is CORRECT
// 7872 is not correct
// 2518 is too low
// 1316 is too low
export const part1 = (input: string, printData = true) => {
  const grid = extractDataToPointGrid<string>(input).map((r) =>
    r.map((p) => {
      return { ...p, z: 0 }
    })
  ) as Tile[][]
  const energized = energize(
    grid,
    {
      point: {
        row: 0,
        col: 0,
        z: 0,
        value: grid[0][0].value,
      },
      direction: '>',
    },
    printData
  )
  return energized
}

export const energize = (
  grid: Tile[][],
  startPoint: Beam,
  printData = true
) => {
  const logData = () =>
    console.log(
      'energized:',
      grid
        .map((row) => row.filter((p) => p.z === 1).length)
        .reduce((a, b) => a + b),
      'loopCount: ',
      loopCount,
      'queue: ',
      queue.length
    )

  grid[startPoint.point.row][startPoint.point.col].z = 1
  let currentPoint = grid[startPoint.point.row][startPoint.point.col]
  let loopCount = 0
  let currentDirection = '>'
  let queue: Beam[] = [
    {
      point: currentPoint,
      direction: currentDirection,
    },
  ]

  let visitedBeams: Set<string> = new Set<string>()

  while (queue.length > 0) {
    const beam = queue.shift()!

    const beamStateStr = JSON.stringify(beam)
    if (visitedBeams.has(beamStateStr)) continue

    visitedBeams.add(beamStateStr)

    grid[beam.point.row][beam.point.col].z = 1

    const nextPositions = moveBeam(beam, grid)
    nextPositions.forEach(([point, direction]) => {
      // grid[point.row][point.col].z = 1
      queue.push({ point, direction })
    })
    if (grid[beam.point.row][beam.point.col].z !== 1) {
      grid[beam.point.row][beam.point.col].z = 1
      loopCount++
    }

    printData && logGrid(grid)
    // printData && logData()
  }

  printData && logGrid(grid)
  return grid
    .map((row) => row.filter((p) => p.z === 1).length)
    .reduce((a, b) => a + b)
}

const logGrid = (grid: Tile[][]) => {
  console.clear()
  console.log(
    grid
      .map((r) => r.map((p) => (p.z === 1 ? '#' : p.value)).join(''))
      .join('\n')
      .concat('\n')
  )
}

const moveBeam = (beam: Beam, grid: Tile[][]): [Tile, string][] => {
  const { point, direction } = beam
  const neighbors = getPointNeighbors(point, grid, false)
  const neighborBelow = neighbors.find(
    (n) => n.row === point.row + 1 && n.col === point.col
  )
  const neighborAbove = neighbors.find(
    (n) => n.row === point.row - 1 && n.col === point.col
  )
  const neighborLeft = neighbors.find(
    (n) => n.row === point.row && n.col === point.col - 1
  )
  const neighborRight = neighbors.find(
    (n) => n.row === point.row && n.col === point.col + 1
  )

  const result: [Tile | undefined, string][] = []
  switch (point.value) {
    case '|':
      if (['<', '>'].includes(direction)) {
        result.push([neighborAbove, '^'], [neighborBelow, 'v'])
        break
      } else {
        // keep going in the same direction
        switch (direction) {
          case '^':
            neighborAbove?.col && result.push([neighborAbove, direction])
            break
          case 'v':
            neighborBelow?.col && result.push([neighborBelow, direction])
            break
        }
        break
      }
    case '-':
      if (['^', 'v'].includes(direction)) {
        neighborLeft && result.push([neighborLeft, '<'])
        neighborRight && result.push([neighborRight, '>'])
        break
      } else {
        // keep going in the same direction
        switch (direction) {
          case '<':
            neighborLeft && result.push([neighborLeft, direction])
            break
          case '>':
            neighborRight && result.push([neighborRight, direction])
            break
        }
        break
      }
    case '/':
      switch (direction) {
        case 'v':
          neighborLeft && result.push([neighborLeft, '<'])
          break
        case '>':
          neighborAbove && result.push([neighborAbove, '^'])
          break
        case '<':
          neighborBelow && result.push([neighborBelow, 'v'])
          break
        case '^':
          neighborRight && result.push([neighborRight, '>'])
          break
      }
      break
    case '\\':
      switch (direction) {
        case 'v':
          neighborRight && result.push([neighborRight, '>'])
          break
        case '>':
          neighborBelow && result.push([neighborBelow, 'v'])
          break
        case '<':
          neighborAbove && result.push([neighborAbove, '^'])
          break
        case '^':
          neighborLeft && result.push([neighborLeft, '<'])
          break
      }
      break
    default:
      // keep going in the same direction
      switch (direction) {
        case '<':
          neighborLeft && result.push([neighborLeft, direction])
          break
        case '>':
          neighborRight && result.push([neighborRight, direction])
          break
        case '^':
          neighborAbove && result.push([neighborAbove, direction])
          break
        case 'v':
          neighborBelow && result.push([neighborBelow, direction])
          break
      }
  }
  const step1 = result.filter(([p]) => p !== undefined)
  const step2 = step1.map((point) => {
    const temp: Point<string> = {
      ...point[0]!,
    }
    return [temp, point[1]]
  }) as [Tile, string][]
  return step2
}
console.log('part 1', part1(getPuzzleInput('input', 'day16')))

/*
--- Part Two ---

As you try to work out what might be wrong, the reindeer tugs on your shirt and leads you to a nearby control panel. There, a collection of buttons lets you align the contraption so that the beam enters from any edge tile and heading away from that edge. (You can choose either of two directions for the beam if it starts on a corner; for instance, if the beam starts in the bottom-right corner, it can start heading either left or upward.)

So, the beam could start on any tile in the top row (heading downward), any tile in the bottom row (heading upward), any tile in the leftmost column (heading right), or any tile in the rightmost column (heading left). To produce lava, you need to find the configuration that energizes as many tiles as possible.

In the above example, this can be achieved by starting the beam in the fourth tile from the left in the top row:

.|<2<\....
|v-v\^....
.v.v.|->>>
.v.v.v^.|.
.v.v.v^...
.v.v.v^..\
.v.v/2\\..
<-2-/vv|..
.|<<<2-|.\
.v//.|.v..
Using this configuration, 51 tiles are energized:

.#####....
.#.#.#....
.#.#.#####
.#.#.##...
.#.#.##...
.#.#.##...
.#.#####..
########..
.#######..
.#...#.#..
Find the initial beam configuration that energizes the largest number of tiles; how many tiles are energized in that configuration?
 */

export const part2 = (input: string) => {
  const grid = extractDataToPointGrid<string>(input).map((r) =>
    r.map((p) => {
      return { ...p, z: 0 }
    })
  ) as Tile[][]

  const startEdges = getEveryStartEdge(grid)
  const energized = startEdges.map((edge) => {
    const gridCopy = grid.map((r) => r.map((p) => ({ ...p }))) as Tile[][]
    return energize(gridCopy, edge, false)
  })

  return Math.max(...energized)
}

const getEveryStartEdge = (grid: Tile[][]) => {
  const topRow = grid[0]
  const bottomRow = grid[grid.length - 1]
  const leftCol = grid.map((r) => r[0])
  const rightCol = grid.map((r) => r[r.length - 1])
  const topBeams: Beam[] = topRow.map((p) => ({ point: p, direction: 'v' }))

  const bottomBeams: Beam[] = bottomRow.map((p) => ({
    point: p,
    direction: '^',
  }))

  const leftBeams: Beam[] = leftCol.map((p) => ({
    point: p,
    direction: '>',
  }))

  const rightBeams: Beam[] = rightCol.map((p) => ({
    point: p,
    direction: '<',
  }))

  return [...topBeams, ...bottomBeams, ...leftBeams, ...rightBeams]
}

console.log('part 2', part2(getPuzzleInput('input', 'day16')))
