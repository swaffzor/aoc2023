/*
The researcher has collected a bunch of data and compiled the data into a single giant image (your puzzle input). The image includes empty space (.) and galaxies (#). For example:

...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
The researcher is trying to figure out the sum of the lengths of the shortest path between every pair of galaxies. However, there's a catch: the universe expanded in the time it took the light from those galaxies to reach the observatory.

Due to something involving gravitational effects, only some space expands. In fact, the result is that any rows or columns that contain no galaxies should all actually be twice as big.

In the above example, three columns and two rows contain no galaxies:

   v  v  v
 ...#......
 .......#..
 #.........
>..........<
 ......#...
 .#........
 .........#
>..........<
 .......#..
 #...#.....
   ^  ^  ^
These rows and columns need to be twice as big; the result of cosmic expansion therefore looks like this:

....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......
Equipped with this expanded universe, the shortest path between every pair of galaxies can be found. It can help to assign every galaxy a unique number:

....1........
.........2...
3............
.............
.............
........4....
.5...........
............6
.............
.............
.........7...
8....9.......
In these 9 galaxies, there are 36 pairs. Only count each pair once; order within the pair doesn't matter. For each pair, find any shortest path between the two galaxies using only steps that move up, down, left, or right exactly one . or # at a time. (The shortest path between two galaxies is allowed to pass through another galaxy.)

For example, here is one of the shortest paths between galaxies 5 and 9:

....1........
.........2...
3............
.............
.............
........4....
.5...........
.##.........6
..##.........
...##........
....##...7...
8....9.......
This path has length 9 because it takes a minimum of nine steps to get from galaxy 5 to galaxy 9 (the eight locations marked # plus the step onto galaxy 9 itself). Here are some other example shortest path lengths:

Between galaxy 1 and galaxy 7: 15
Between galaxy 3 and galaxy 6: 17
Between galaxy 8 and galaxy 9: 5
In this example, after expanding the universe, the sum of the shortest path between all 36 pairs of galaxies is 374.

Expand the universe, then find the length of the shortest path between every pair of galaxies. What is the sum of these lengths? 
*/

import { Point } from '../types'
import { extractDataToPointGrid } from '../utils'

export const part1 = (input: string) => {
  const idk = expandTheUniverse(input.split('\n').map((row) => row.split('')))
  const galaxies = extractDataToPointGrid<string>(
    idk.map((row) => row.join('')).join('\n')
  )
    .flat()
    .filter((point) => point.value === '#')

  let galaxyCount = 0
  const galaxyPairs = []
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      galaxyPairs.push([galaxies[i], galaxies[j]])
    }
  }
  const temp = galaxyPairs.map((pair) => getShortestPath(pair[0], pair[1]))
  const sum = temp.reduce((acc, curr) => acc + curr, 0)
  return sum
}

const expandTheUniverse = (data: string[][]) => {
  const rowData: string[][] = []
  data.forEach((row, rowIndex, self) => {
    const isEmpty = row.every((point, colIndex) => point === '.')
    if (isEmpty) {
      rowData.push(row)
    }
    rowData.push(row)
  })

  let newData: string[][] = [...rowData]
  let splicCount = 0
  for (let col = 0; col < rowData[0].length; col++) {
    let isColEmpty = true
    let emptyIndex = col
    for (let row = 0; row < rowData.length; row++) {
      const testCell = rowData[row][col]
      const isGalaxy = testCell !== '.'
      if (isGalaxy) {
        isColEmpty = false
        break
      }
      // console.log('sleepy')
    }
    if (isColEmpty) {
      const idk = JSON.parse(JSON.stringify(newData))
      idk.map((row: string[]) => row.splice(emptyIndex + splicCount, 0, '.'))
      splicCount++
      newData = JSON.parse(JSON.stringify(idk))
    }
  }

  return newData
}
const getShortestPath = (galaxy1: Point<string>, galaxy2: Point<string>) => {
  const a = galaxy2.col - galaxy1.col
  const b = galaxy2.row - galaxy1.row
  const distance = Math.abs(a) + Math.abs(b)
  return distance
}

const getShortestPathPythag = (
  galaxy1: Point<string>,
  galaxy2: Point<string>
) => {
  const a = galaxy1.col - galaxy2.col
  const b = galaxy1.row - galaxy2.row
  const distance = Math.ceil(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)))
  return distance
}
