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
import { breadthSearch, logGridValues, makeSquareGrid } from '../utils'
import { SquareGrid } from '../types'

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
  data.splice(0, 1)

  const bounds = data.reduce(
    (acc, { direction, distance }) => {
      if (direction === 'R' || direction === 'L') {
        acc.x += distance
      } else if (direction === 'U' || direction === 'D') {
        acc.y += distance
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

  const grid = makeSquareGrid<string>(
    bounds.x + 1,
    bounds.y + 1,
    { '1,1': { row: 1, col: 1 } },
    trench
  )

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
    grid,
    `${startPoint.x - 1},${startPoint.y - 1}`,
    undefined
  )

  // find the lowest col and row that is within the trench
  const findPath = (start: string, goal: string) => {
    let current = goal
    const path = []
    while (current !== start) {
      path.push(current)
      current = parents[current]
    }
    path.push(start)
    return path.reverse()
  }
  // const path = findPath('1,0', '4,4')

  interface Style {
    number?: Record<string, number>
    point_to?: Record<string, string>
    path?: Record<string, boolean>
    start?: string
    goal?: string
  }

  const drawGrid = (graph: SquareGrid<string>, style: Style) => {
    // console.log('___'.repeat(graph.width))
    const result: string[][] = []
    for (let row = 0; row < graph.height; row++) {
      const rowResult: string[] = []
      for (let col = 0; col < graph.width; col++) {
        // process.stdout.write(drawTile(graph, `${col},${row}`, style))
        rowResult.push(drawTile(graph, `${col},${row}`, style))
      }
      // process.stdout.write('\n')
      result.push(rowResult)
    }
    // process.stdout.write('___'.repeat(graph.width))
    return result
  }
  const drawTile = (
    graph: SquareGrid<string>,
    id: string,
    style: Style
  ): string => {
    let r = ' . '
    if (style.number && style.number[id]) {
      r = ` ${style.number[id]} `
    }
    if (style.point_to && style.point_to[id]) {
      const [x1, y1] = id.split(',').map((n) => Number(n))
      const [x2, y2] = style.point_to[id].split(',').map((n) => Number(n))
      if (x2 === x1 + 1) r = ' > '
      if (x2 === x1 - 1) r = ' < '
      if (y2 === y1 + 1) r = ' v '
      if (y2 === y1 - 1) r = ' ^ '
    }
    if (style.path && style.path[id]) {
      r = ' @ '
    }
    if (style.start && id === style.start) {
      r = ' A '
    }
    if (style.goal && id === style.goal) {
      r = ' Z '
    }
    if (graph.walls.has(id)) {
      r = '###'
    }
    return r
  }

  const style = {
    number: {},
    point_to: {},
    path: {},
    start: '',
    goal: `${startPoint.x - 1},${startPoint.y - 1}`,
  }

  const drawnGrid = drawGrid(grid, style)

  const values = logGridValues(
    grid,
    parents,
    `${startPoint.x - 1},${startPoint.y - 1}`
  )
  // console.log(
  //   values
  //     .map((r) => r.map((v) => (v === undefined ? '?' : v)).join(''))
  //     .join('\n')
  // )
  const lava = values.flat().filter((t) => t !== ' ').length
  return lava
}
