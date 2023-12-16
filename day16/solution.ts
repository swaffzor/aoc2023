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

interface BeamState {
  point: Point<string>
  direction: string
}

// 8034 is CORRECT
// 7872 is not correct
// 2518 is too low
// 1316 is too low
export const part1 = (input: string) => {
  const grid = extractDataToPointGrid<string>(input).map((r) =>
    r.map((p) => {
      return { ...p, z: 0 }
    })
  ) as Tile[][]

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

  grid[0][0].z = 1
  let loopCount = 0
  let currentPoint = grid[0][0]
  let currentDirection = '>'
  let queue: BeamState[] = [
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
      grid[point.row][point.col].z = 1
      queue.push({ point, direction })
    })

    loopCount++
    logGrid(grid)
    logData()
  }

  logGrid(grid)
  return grid
    .map((row) => row.filter((p) => p.z === 1).length)
    .reduce((a, b) => a + b)
}

const logGrid = (grid: Tile[][]) => {
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
