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
*/

import { Point } from '../types'
import { extractDataToPointGrid } from '../utils'

export const part1 = (input: string) => {
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
// 28428 is too low

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
        // verticalLIne =
        //   (leftIndex < 2 && rightIndex === columnLength - 1) ||
        //   (leftIndex === 0 && rightIndex < columnLength - 2)
        //     ? verticalLIne
        //     : 0
        break
      }
    }
  }
  return verticalLIne
}

//0 #...##..#
//1 #....#..#
//2 ..##..###
//3 #####.##.
//4 #####.##.
//5 ..##..###
//6 #....#..#
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
            horizontalLine = 0
            break
          }
          horizontalLine = endIndex
        }
        // horizontalLine =
        //   (topIndex < 2 && bottomIndex === rows.length - 1) ||
        //   (topIndex === 0 && bottomIndex >= rows.length - 2)
        //     ? horizontalLine
        //     : 0
        break
      }
      break
    }
  }

  return horizontalLine * 100
}
