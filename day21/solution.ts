/*
--- Day 21: Step Counter ---
While you wait, one of the Elves that works with the gardener heard how good you are at solving problems and would like your help. He needs to get his steps in for the day, and so he'd like to know which garden plots he can reach with exactly his remaining 64 steps.

He gives you an up-to-date map (your puzzle input) of his starting position (S), garden plots (.), and rocks (#). For example:

...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
The Elf starts at the starting position (S) which also counts as a garden plot. Then, he can take one step north, south, east, or west, but only onto tiles that are garden plots. This would allow him to reach any of the tiles marked O:

...........
.....###.#.
.###.##..#.
..#.#...#..
....#O#....
.##.OS####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
Then, he takes a second step. Since at this point he could be at either tile marked O, his second step would allow him to reach any garden plot that is one step north, south, east, or west of any tile that he could have reached after the first step:

...........
.....###.#.
.###.##..#.
..#.#O..#..
....#.#....
.##O.O####.
.##.O#...#.
.......##..
.##.#.####.
.##..##.##.
...........
After two steps, he could be at any of the tiles marked O above, including the starting position (either by going north-then-south or by going west-then-east).

A single third step leads to even more possibilities:

...........
.....###.#.
.###.##..#.
..#.#.O.#..
...O#O#....
.##.OS####.
.##O.#...#.
....O..##..
.##.#.####.
.##..##.##.
...........
He will continue like this until his steps for the day have been exhausted. After a total of 6 steps, he could reach any of the garden plots marked O:

...........
.....###.#.
.###.##.O#.
.O#O#O.O#..
O.O.#.#.O..
.##O.O####.
.##.O#O..#.
.O.O.O.##..
.##.#.####.
.##O.##.##.
...........
In this example, if the Elf's goal was to get exactly 6 more steps today, he could use them to reach any of 16 garden plots.

However, the Elf actually needs to get 64 steps today, and the map he's handed you is much larger than the example map.

Starting from the garden plot marked S on your map, how many garden plots could the Elf reach in exactly 64 steps?
*/

import { Point, SquareGrid, Location } from '../types'
import { breadthSearch, extractDataToGraph } from '../utils'

export const part1 = (input: string, steps: number) => {
  const graph = extractDataToGraph<string>(input, '#')
  const startPoint =
    Object.values(graph.nodes).find((node) => node.value === 'S') ||
    ({} as Location<string>)
  // const parents = breadthSearch(graph, startPoint.id)

  let nodes: Record<string, string>[] = [{ [startPoint.id]: 'S' }]
  for (let step = 0; step < steps; step++) {
    const node = nodes.shift() || ({} as Record<string, string>)
    const next = getNeighborsForPointQueue(node, graph)
    nodes.push(next)
    // drawGrid(graph, {
    //   start: startPoint.id,
    //   values: nodes.reduce((acc, curr) => {
    //     const temp = Object.keys(curr)
    //     for (let key of temp) {
    //       acc[key] = 'O'
    //     }
    //     return acc
    //   }, {} as Record<string, string>),
    // })
  }
  const numberOfNodes = nodes.reduce((acc, curr) => {
    return acc + Object.keys(curr).length
  }, 0)
  return numberOfNodes
}

const getNeighborsForPointQueue = (
  nodesInput: Record<string, string>,
  graph: SquareGrid<string>
) => {
  let clusters = Object.keys(nodesInput)
  let nextNodes: Record<string, string>[] = []
  while (clusters.length > 0) {
    const node = clusters.shift() || ''
    const neighbors = graph.neighbors(node)
    const possiblePositions = Object.values(neighbors).reduce((acc, curr) => {
      acc[curr.id] = 'O'
      return acc
    }, {} as Record<string, string>)
    nextNodes.push(possiblePositions)
  }
  // combine all the nextNodes into one object
  const combined = nextNodes.reduce((acc, curr) => {
    return { ...acc, ...curr }
  })

  return combined
}

const drawGrid = (graph: SquareGrid<string>, style: Style) => {
  // console.log('___'.repeat(graph.width))
  const result: string[][] = []
  for (let row = 0; row < graph.height; row++) {
    const rowResult: string[] = []
    for (let col = 0; col < graph.width; col++) {
      const tile = drawTile(graph, `${col},${row}`, style)
      // process.stdout.write(tile)
      rowResult.push(tile)
    }
    process.stdout.write(rowResult.join(''))
    process.stdout.write('\n')
    result.push(rowResult)
  }
  process.stdout.write('___'.repeat(graph.width))
  return result
}

export const drawTile = (
  graph: SquareGrid<string>,
  id: string,
  style: Style
): string => {
  let r = '.'
  if (style.number && style.number[id]) {
    r = ` ${style.number[id]} `
  }
  if (style.point_to && style.point_to[id]) {
    const [x1, y1] = id.split(',').map((n) => Number(n))
    const [x2, y2] = style.point_to[id].split(',').map((n) => Number(n))
    if (x2 === x1 + 1) r = '>'
    if (x2 === x1 - 1) r = '<'
    if (y2 === y1 + 1) r = 'v'
    if (y2 === y1 - 1) r = '^'
  }
  if (style.path && style.path[id]) {
    r = '@'
  }
  if (style.start && id === style.start) {
    r = 'S'
  }
  if (style.goal && id === style.goal) {
    r = 'Z'
  }
  if (graph.walls.has(id)) {
    r = '#'
  }
  if (style.values && style.values[id]) {
    r = style.values[id]
  }
  return r
}
interface Style {
  number?: Record<string, number>
  point_to?: Record<string, string>
  path?: Record<string, boolean>
  start?: string
  goal?: string
  values?: Record<string, string>
}
