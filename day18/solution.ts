/*
--- Day 18: Lavaduct Lagoon ---

Thanks to your efforts, the machine parts factory is one of the first factories up and running since the lavafall came back. However, to catch up with the large backlog of parts requests, the factory will also need a large supply of lava for a while; the Elves have already started creating a large lagoon nearby for this purpose.

However, they aren't sure the lagoon will be big enough; they've asked you to take a look at the dig plan (your puzzle input). For example:

R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
The digger starts in a 1 meter cube hole in the ground. They then dig the specified number of meters up (U), down (D), left (L), or right (R), clearing full 1 meter cubes as they go. The directions are given as seen from above, so if "up" were north, then "right" would be east, and so on. Each trench is also listed with the color that the edge of the trench should be painted as an RGB hexadecimal color code.

When viewed from above, the above example dig plan would result in the following loop of trench (#) having been dug out from otherwise ground-level terrain (.):

#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######
At this point, the trench could contain 38 cubic meters of lava. However, this is just the edge of the lagoon; the next step is to dig out the interior so that it is one meter deep as well:

#######
#######
#######
..#####
..#####
#######
#####..
#######
.######
.######
Now, the lagoon can contain a much more respectable 62 cubic meters of lava. While the interior is dug out, the edges are also painted according to the color codes in the dig plan.

The Elves are concerned the lagoon won't be large enough; if they follow their dig plan, how many cubic meters of lava could it hold?

*/
import {
  breadthSearch,
  drawGrid,
  extractDataToGraph,
  logGridValues,
  makeSquareGrid,
  polygonArea,
} from '../utils'
import { SquareGrid } from '../types'

// 92615 is too low
// 8450 is too low
export const part1 = (input: string) => {
  const data = input.split('\n').map((line) => {
    const [direction, distance, hex] = line.split(' ')
    return {
      direction,
      distance: Number(distance),
      hex: hex.replace(/[()]/g, ''),
    }
  })

  const trench = new Set<string>()
  trench.add('0,0')
  let current = { x: 0, y: 0 }
  for (let i = 1; i <= data[0].distance; i++) {
    if (data[0].direction === 'R' || data[0].direction === 'L') {
      trench.add(`${i},0`)
      current = { x: i, y: current.y }
    } else {
      trench.add(`0,${i}`)
      current = { x: current.x, y: i }
    }
  }
  // data.splice(0, 1)

  let rowMax = 0
  let rowMin = Infinity
  let colMax = 0
  let colMin = Infinity
  const bounds = data.reduce(
    (acc, { direction, distance }) => {
      if (direction === 'R') {
        acc.x += distance
        if (acc.x > colMax) colMax = acc.x
      } else if (direction === 'L') {
        acc.x -= distance
        if (acc.x < colMin) colMin = acc.x
      } else if (direction === 'D') {
        acc.y += distance
        if (acc.y > rowMax) rowMax = acc.y
      } else if (direction === 'U') {
        acc.y -= distance
        if (acc.y < rowMin) rowMin = acc.y
      }

      // add to the trench
      for (let i = 0; i < distance; i++) {
        const tempx = direction === 'R' ? 1 : direction === 'L' ? -1 : 0
        current.x = current.x + tempx
        const tempy = direction === 'D' ? 1 : direction === 'U' ? -1 : 0
        current.y = current.y + tempy

        // current = { x: col, y: row }
        trench.add(`${current.x},${current.y}`)
      }
      return acc
    },
    { x: 0, y: 0 }
  )
  //  0123456
  //0 #######
  //1 #.....#
  //2 ###...#
  //3 ..#...#
  //4 ..#...#
  //5 ###.###
  //6 #...#..
  //7 ##..###
  //8 .#....#
  //9 .######

  const rowLength = Math.max(Math.abs(rowMin), Math.abs(rowMax))
  const colLength = Math.max(Math.abs(colMin), Math.abs(colMax))
  const allDots = Array.from({ length: rowLength + 1 }, () =>
    Array.from({ length: colLength + 1 }, () => '.')
  )

  // combine the trench and the dots
  const temp: string[][] = allDots.map((row, y) =>
    row.map((_, x) => (trench.has(`${x},${y}`) ? '#' : '.'))
  )

  const graph = extractDataToGraph<string>(
    temp.map((r) => r.join('')).join('\n'),
    '#'
  )

  const nodes = [Object.values(graph.nodes), Object.values(graph.walls)].flat()

  let acc = { col: 0, row: 0 }
  const dataNodes = data.map(({ direction, distance }) => {
    const tempDistance = distance
    const tempx = direction === 'R' ? 1 : direction === 'L' ? -1 : 0
    acc.col = acc.col + tempx * tempDistance
    const tempy = direction === 'D' ? 1 : direction === 'U' ? -1 : 0
    acc.row = acc.row + tempy * tempDistance

    // trench.add(`${current.x},${current.y}`)
    return { col: acc.col, row: acc.row }
  })
  const area = polygonArea<string>([{ col: 0, row: 0 }, ...dataNodes])

  // const grid = makeSquareGrid<string>(bounds.x + 1, bounds.y + 1, trench)

  // find the top left corner that is within the trench
  // let start = ''
  // for (let row = 0; row < grid.height; row++) {
  //   for (let col = 0; col < grid.width; col++) {
  //     if (!grid.walls.has(`${col},${row}`)) {
  //       start = `${col},${row}`
  //       break
  //     }
  //   }
  // }

  // get the last instruction in data that had a L or R and an U or D
  const lastX =
    data
      .slice()
      .reverse()
      .find(({ direction }) => direction === 'L' || direction === 'R') ||
    ({} as { direction: string; distance: number })
  const lastY =
    data
      .slice()
      .reverse()
      .find(({ direction }) => direction === 'U' || direction === 'D') ||
    ({} as { direction: string; distance: number })
  const lastTwo = [lastX, lastY]
  const startPoint = lastTwo.reduce(
    (acc, { direction, distance }) => {
      if (direction === 'R') {
        acc.x -= distance
      } else if (direction === 'L') {
        acc.x += distance
      } else if (direction === 'D') {
        acc.y -= distance
      } else if (direction === 'U') {
        acc.y += distance
      }
      return acc
    },
    { x: 0, y: 0 }
  )

  const parents = breadthSearch<string>(
    graph,
    `${startPoint.x - 1},${startPoint.y - 1}`,
    undefined
  )

  const style = {
    number: {},
    point_to: {},
    path: {},
    start: '',
    goal: `${startPoint.x - 1},${startPoint.y - 1}`,
  }

  const drawnGrid = drawGrid(graph, style)

  const values = logGridValues(
    graph,
    parents,
    `${startPoint.x - 1},${startPoint.y - 1}`
  )
  console.log(
    values
      .map((r) => r.map((v) => (v === undefined ? '?' : v)).join(''))
      .join('\n')
  )
  const lava = values.flat().filter((t) => t !== ' ').length

  return lava
}
