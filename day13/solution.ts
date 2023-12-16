/*
--- Day 13: Point of Incidence ---
You note down the patterns of ash (.) and rocks (#) that you see as you walk (your puzzle input); perhaps by carefully analyzing these patterns, you can figure out where the mirrors are!

For example:

#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

 01 23 45 67 8
 #. .. ## .. #
 #. .. .# .. #
 .. ## .. ## #
 ## ## #. ## .
 ## ## #. ## .
 .. ## .. ## #
 #. .. .# .. #


#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
To find the reflection in each pattern, you need to find a perfect reflection across either a horizontal line between two rows or across a vertical line between two columns.

In the first pattern, the reflection is across a vertical line between two columns; arrows on each of the two columns point at the line between the columns:

123456789
    ><   
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.
    ><   
123456789
In this pattern, the line of reflection is the vertical line between columns 5 and 6. Because the vertical line is not perfectly in the middle of the pattern, part of the pattern (column 1) has nowhere to reflect onto and can be ignored; every other column has a reflected column within the pattern and must match exactly: column 2 matches column 9, column 3 matches 8, 4 matches 7, and 5 matches 6.

The second pattern reflects across a horizontal line instead:

1 #...##..# 1
2 #....#..# 2
3 ..##..### 3
4v#####.##.v4
5^#####.##.^5
6 ..##..### 6
7 #....#..# 7
This pattern reflects across the horizontal line between rows 4 and 5. Row 1 would reflect with a hypothetical row 8, but since that's not in the pattern, row 1 doesn't need to match anything. The remaining rows match: row 2 matches row 7, row 3 matches row 6, and row 4 matches row 5.

To summarize your pattern notes, add up the number of columns to the left of each vertical line of reflection; to that, also add 100 multiplied by the number of rows above each horizontal line of reflection. In the above example, the first pattern's vertical line has 5 columns to its left and the second pattern's horizontal line has 4 rows above it, a total of 405.

Find the line of reflection in each of the patterns in your notes. What number do you get after summarizing all of your notes?

#.###..#..### 0-
.#...##.####. 1v
.#...##.####. 2^
#.###..#..### 3-
.#######.##.# 4
.#..##.#.#..# 5
..#..#.##.#.. 6
##..##..###.# 7
######.##..#. 8X
######.##.... 9X
##..##..###.# A
..#..#.##.#.. B
.#..##.#.#..# C

*/

import { Point } from '../types'
import { extractDataToPointGrid } from '../utils'

const getColumnFromRows = (rows: string[], col: number) =>
  rows
    .map((row) =>
      row.split('').map((point, cIndex, self) => {
        return cIndex === col ? point : ''
      })
    )
    .flat()
    .join('')

const getMatches = (
  allColumns: string[],
  matchColumn: string,
  type: 'vertical' | 'horizontal'
) => {
  const foundIndex = allColumns
    .map((col, i) => (col === matchColumn ? i : -1))
    .filter((i) => i > -1)
  if (foundIndex.length > 1) {
    // confirm each column matches
    for (let i = 0; i < matchColumn.length; i++) {
      const start = foundIndex[0] + i
      const end = foundIndex[foundIndex.length - 1] - i
      if ((end - start) % 2 === 0) {
        return 0
      }
      if (start > end) {
        return start
      }
      const leftt = allColumns[start]
      const right = allColumns[end]
      if (leftt !== right) {
        break
      }
    }
  }

  return 0
}

export const part1 = (input: string) => {
  const patterns = input.split('\n\n')
  const reflections = patterns.map((pattern) => {
    const rows = pattern.split('\n')
    const points: number[] = []

    // check for vertical reflection
    const columnSize = rows[0].length
    const allColumns: string[] = []
    for (let i = 0; i < columnSize; i++) {
      allColumns.push(getColumnFromRows(rows, i))
    }
    const firstColumn = getColumnFromRows(rows, 0)
    const lastColumn = getColumnFromRows(rows, rows[0].length - 1)
    const firstPass = getMatches(allColumns, firstColumn, 'vertical')
    const lastPass = getMatches(allColumns, lastColumn, 'vertical')
    firstPass > 0 && points.push(firstPass)
    lastPass > 0 && points.push(lastPass)

    // check for horizontal reflection
    if (points.length === 0) {
      const allRows = [...rows]
      const firstRow = rows[0]
      const lastRow = rows[rows.length - 1]
      const firstHPass = getMatches(allRows, firstRow, 'horizontal')
      const lastHPass = getMatches(allRows, lastRow, 'horizontal')
      firstHPass > 0 && points.push(firstHPass * 100)
      lastHPass > 0 && points.push(lastHPass * 100)
    }

    return points //.reduce((acc, curr) => acc + curr, 0)
  })
  return reflections.flat().reduce((acc, curr) => acc + curr, 0)
}

export const part1_1 = (input: string) => {
  const data = input.split('\n\n')
  const answer: number[] = []

  for (let i = 0; i < data.length; i++) {
    const pointGrid = extractDataToPointGrid<string>(data[i])
    const isVertical = checkIsVerticalReflection(pointGrid)
    const combinedRows = pointGrid.map((row) =>
      row.map((point) => point?.value || '').join('')
    )
    const isHorizontal = isHorizontalReflection(combinedRows)
    answer.push(isVertical, isHorizontal)
  }
  return answer.reduce((acc, curr) => acc + curr, 0)
}
// 36725
// 35111

// 34511 is too high
// 30543 X
// 29543 X
// 28428 is too low

// 26309
// 26411
// 5819
// 5751
// 5714

//  012345678
//0 #.##..##.
//1 ..#.##.#.
//2 ##......#
//3 ##......#
//4 ..#.##.#.
//5 ..##..##.
//6 #.#.##.#.

const columnsEqual = (left: Point<string>[], right: Point<string>[]) =>
  left.map((l) => l.value).join('') === right.map((r) => r.value).join('')

export const checkIsVerticalReflection = (grid: Point<string>[][]) => {
  let verticalLIne = 0
  const flatGrid = grid.flat()
  const columnLength = flatGrid.filter((point) => point?.row === 0).length
  for (let leftIndex = 0; leftIndex < columnLength; leftIndex++) {
    for (
      let rightIndex = columnLength - 1;
      rightIndex > leftIndex;
      rightIndex--
    ) {
      const left = flatGrid.filter((point) => point?.col === leftIndex)
      const right = flatGrid.filter((point) => point?.col === rightIndex)

      if (columnsEqual(left, right)) {
        // match found, check if all each successive value matches
        for (let j = 1; j < rightIndex - 1 - j; j++) {
          const startIndex = leftIndex + j
          const endIndex = rightIndex - j
          const ell = flatGrid.filter((point) => point?.col === startIndex)
          const arrr = flatGrid.filter((point) => point?.col === endIndex)
          if (!columnsEqual(ell, arrr)) {
            verticalLIne = 0
            break
          }
          verticalLIne = startIndex
        }
        break
      }
    }
  }

  if (verticalLIne !== 0) {
    const iterations = Math.floor(columnLength / 2)
    for (let i = 0; i < iterations; i++) {
      const left = flatGrid.filter(
        (point) => point?.col === verticalLIne - 1 - i
      )
      const right = flatGrid.filter((point) => point?.col === verticalLIne + i)
      if (!columnsEqual(left, right)) {
        return 0
      }
      if (verticalLIne + i === columnLength - 1) {
        // || verticalLIne - 1 - i === 0) {
        // we've reached a boundary of the array
        console.log('reached boundary')
        return verticalLIne
      }
      if (verticalLIne - 1 - i === 0) {
        console.log('reached boundary')
        return verticalLIne
      }
    }
  }
  return 0
}
//  012345678
//    ><
//0 #...##..#  #. . . ##..#
//1 #....#..#  #. . . .#..#
//2 ..##..###  .. # # ..###
//3 #####.##.  ## # # #.##.
//4 #####.##.  ## # # #.##.
//5 ..##..###  .. # # ..###
//6 #....#..#  #. . . .#..#
export const isHorizontalReflection = (rows: string[]) => {
  let horizontalLine = 0

  for (let topIndex = 0; topIndex < rows.length; topIndex++) {
    for (
      let bottomIndex = rows.length - 1;
      bottomIndex > topIndex;
      bottomIndex--
    ) {
      const top = rows[topIndex]
      const bottom = rows[bottomIndex]
      if (top === bottom) {
        // match found, check if all each successive value matches
        for (let j = 1; j < bottomIndex - 1 - j; j++) {
          const startIndex = topIndex + j
          const endIndex = bottomIndex - j
          const start = rows[startIndex]
          const end = rows[endIndex]
          if (start !== end) {
            // horizontalLine = 0
            break
          }
          horizontalLine = endIndex
        }
        break
      }
      break
    }
  }

  // if horizontalLine is not 0, verify that the reflection doesn't have leftovers on BOTH sides after folding
  // 1 #...##..# 1
  // 2 #....#..# 2
  // 3 ..##..### 3
  // 4v#####.##.v4
  // 5^#####.##.^5
  // 6 ..##..### 6
  // 7 #....#..# 7
  if (horizontalLine !== 0) {
    const iterations = Math.floor(rows.length / 2)
    for (let i = 0; i < iterations; i++) {
      const top = rows[horizontalLine - 1 - i]
      const bottom = rows[horizontalLine + i]
      if (bottom !== top) {
        return 0
      }
      if (horizontalLine + i === rows.length - 1) {
        // || horizontalLine - 1 - i === 0) {
        // we've reached a boundary of the array
        console.log('reached boundary')
        return horizontalLine * 100
      }
      if (horizontalLine - 1 - i === 0) {
        console.log('reached boundary')
        return horizontalLine * 100
      }
    }
  }
  // there is another case where the reflection is not perfect
  return 0
}