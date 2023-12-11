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

import path from 'path'
import fs from 'fs'
import { Point } from '../types'

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

const printUniverse = (universe: string[][]) => {
  for (let row = 0; row < universe.length; row++) {
    const rowString = universe[row].join('')
    // console.log(rowString)
  }
}

export const part2 = (input: string, mulitplier: number) => {
  const theUniverse = expandTheUniverse2(
    input.split('\n').map((row) => row.split('')),
    mulitplier
  )
  const galaxies = extractDataToPointGrid<string>(
    theUniverse.map((row) => row.join('')).join('\n')
  )
    .flat()
    .filter((point) => point.value === '#')

  const galaxyPairs = []
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      galaxyPairs.push([galaxies[i], galaxies[j]])
    }
  }

  printUniverse(theUniverse)

  const temp = galaxyPairs.map((pair) =>
    getShortestPath2(pair[0], pair[1], theUniverse, mulitplier)
  )
  const sum = temp.reduce((acc, curr) => acc + curr, 0)
  return sum
  // 10x: 1030
  // 100x: 8410
}

const expandTheUniverse2 = (data: string[][], mulitplier: number) => {
  const rowData: string[][] = []
  data.forEach((row, rowIndex, self) => {
    const isEmpty = row.every((point, colIndex) => point === '.')
    if (isEmpty) {
      rowData.push(row.map((point) => 'X'))
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
      const isGalaxy = testCell === '#'
      if (isGalaxy) {
        isColEmpty = false
        break
      }
      // console.log('sleepy')
    }
    if (isColEmpty) {
      const idk = JSON.parse(JSON.stringify(newData))
      idk.map((row: string[]) => row.splice(emptyIndex + splicCount, 0, 'X'))
      splicCount++
      newData = JSON.parse(JSON.stringify(idk))
    }
  }

  return newData
}

const getShortestPath2 = (
  galaxy1: Point<string>,
  galaxy2: Point<string>,
  theUniverse: string[][],
  mulitplier: number = 1
) => {
  // const a = galaxy2.col - galaxy1.col
  // const b = galaxy2.row - galaxy1.row
  // ..X.#.X...X..
  // ..X...X..#X..
  // #.X...X...X..
  // XXXXXXXXXXXXX
  // ..X...X...X..
  // ..X...X.#.X..
  // .#X...X...X..
  // ..X...X...X.#
  // XXXXXXXXXXXXX
  // ..X...X...X..
  // ..X...X..#X..
  // #.X..#X...X..
  let distance = 0 // Math.abs(a) + Math.abs(b)

  // Check if there is a numerical value between galaxy1 and galaxy2
  const diffRowMax = Math.max(galaxy1.row, galaxy2.row)
  const diffRowMin = Math.min(galaxy1.row, galaxy2.row)
  for (let row = diffRowMin; row < diffRowMax; row++) {
    const point = theUniverse[row][0]
    if (point === 'X') {
      distance += mulitplier - 1
    } else {
      distance += 1
    }
  }
  const diffMaxCol = Math.max(galaxy1.col, galaxy2.col)
  const diffMinCol = Math.min(galaxy1.col, galaxy2.col)
  for (let col = diffMinCol; col < diffMaxCol; col++) {
    const point = theUniverse[0][col]
    if (point === 'X') {
      distance += mulitplier - 1
    } else {
      distance += 1
    }
  }

  return distance
}
//      x1  x10  x100
// 1-2: 15  104
// 1-3: 17  104

/*
--- Part Two ---
The galaxies are much older (and thus much farther apart) than the researcher initially estimated.

Now, instead of the expansion you did before, make each empty row or column one million times larger. That is, each empty row should be replaced with 1000000 empty rows, and each empty column should be replaced with 1000000 empty columns.

(In the example above, if each empty row or column were merely 10 times larger, the sum of the shortest paths between every pair of galaxies would be 1030. If each empty row or column were merely 100 times larger, the sum of the shortest paths between every pair of galaxies would be 8410. However, your universe will need to expand far beyond these values.)

Starting with the same initial image, expand the universe according to these new rules, then find the length of the shortest path between every pair of galaxies. What is the sum of these lengths?
*/
export const getPuzzleInput = <T = string>(
  fileName: string,
  directoryName?: string,
  iterator?: (input: string) => T
): string | T => {
  const inputString = fs.readFileSync(
    path.resolve(directoryName ? directoryName : '', fileName + '.txt'),
    'utf8'
  )
  if (iterator !== undefined) {
    return iterator(inputString)
  } else {
    return inputString
  }
}

export const extractDataToPointGrid = <T>(input: string) => {
  const grid: Point<T>[][] = []
  const lines = input.split('\n')

  for (let row = 0; row < lines.length; row++) {
    grid[row] = []
    for (let col = 0; col < lines[row].length; col++) {
      grid[row][col] = {
        col,
        row,
        value: lines[row][col],
      }
    }
  }
  return grid
}

// part2(getPuzzleInput('sampleInput', 'day11'), 10)
