import { Point } from '../types'
import {
  extractDataToPointGrid,
  getPuzzleInput,
  gridToString,
  rotateCCW,
  rotateCW,
  rotatePointsCCW,
} from '../utils'
import {
  calculateLoad,
  part1,
  part2,
  spinCycle,
  spinCycle2,
  tiltEast2,
  tiltNorth,
  tiltSouth2,
  tiltWest2,
} from './solution'

describe('day 14', () => {
  describe('part 1', () => {
    it('tiltNorth', () => {
      const expected = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`
      const input = getPuzzleInput('day14/sampleInput')
      const data = extractDataToPointGrid<string>(input)
      const temp = tiltNorth(data)
        .map((row) => row.map((point) => point.value).join(''))
        .join('\n')
      expect(temp).toBe(expected)
    })

    it('calculateLoad', () => {
      const input = [
        [
          {
            col: 0,
            row: 0,
            value: 'O',
          },
          {
            col: 1,
            row: 0,
            value: 'O',
          },
          {
            col: 2,
            row: 0,
            value: 'O',
          },
          {
            col: 3,
            row: 0,
            value: 'O',
          },
          {
            col: 4,
            row: 0,
            value: '.',
          },
          {
            col: 5,
            row: 0,
            value: '#',
          },
          {
            col: 6,
            row: 0,
            value: '.',
          },
          {
            col: 7,
            row: 0,
            value: 'O',
          },
          {
            col: 8,
            row: 0,
            value: '.',
          },
          {
            col: 9,
            row: 0,
            value: '.',
          },
        ],
        [
          {
            col: 0,
            row: 1,
            value: 'O',
          },
          {
            col: 1,
            row: 1,
            value: 'O',
          },
          {
            col: 2,
            row: 1,
            value: '.',
          },
          {
            col: 3,
            row: 1,
            value: '.',
          },
          {
            col: 4,
            row: 1,
            value: '#',
          },
          {
            col: 5,
            row: 1,
            value: '.',
          },
          {
            col: 6,
            row: 1,
            value: '.',
          },
          {
            col: 7,
            row: 1,
            value: '.',
          },
          {
            col: 8,
            row: 1,
            value: '.',
          },
          {
            col: 9,
            row: 1,
            value: '#',
          },
        ],
        [
          {
            col: 0,
            row: 2,
            value: 'O',
          },
          {
            col: 1,
            row: 2,
            value: 'O',
          },
          {
            col: 2,
            row: 2,
            value: '.',
          },
          {
            col: 3,
            row: 2,
            value: '.',
          },
          {
            col: 4,
            row: 2,
            value: 'O',
          },
          {
            col: 5,
            row: 2,
            value: '#',
          },
          {
            col: 6,
            row: 2,
            value: '#',
          },
          {
            col: 7,
            row: 2,
            value: '.',
          },
          {
            col: 8,
            row: 2,
            value: '.',
          },
          {
            col: 9,
            row: 2,
            value: 'O',
          },
        ],
        [
          {
            col: 0,
            row: 3,
            value: 'O',
          },
          {
            col: 1,
            row: 3,
            value: '.',
          },
          {
            col: 2,
            row: 3,
            value: '.',
          },
          {
            col: 3,
            row: 3,
            value: '#',
          },
          {
            col: 4,
            row: 3,
            value: '.',
          },
          {
            col: 5,
            row: 3,
            value: 'O',
          },
          {
            col: 6,
            row: 3,
            value: 'O',
          },
          {
            col: 7,
            row: 3,
            value: '.',
          },
          {
            col: 8,
            row: 3,
            value: '.',
          },
          {
            col: 9,
            row: 3,
            value: '.',
          },
        ],
        [
          {
            col: 0,
            row: 4,
            value: '.',
          },
          {
            col: 1,
            row: 4,
            value: '.',
          },
          {
            col: 2,
            row: 4,
            value: '.',
          },
          {
            col: 3,
            row: 4,
            value: '.',
          },
          {
            col: 4,
            row: 4,
            value: '.',
          },
          {
            col: 5,
            row: 4,
            value: '.',
          },
          {
            col: 6,
            row: 4,
            value: '.',
          },
          {
            col: 7,
            row: 4,
            value: '.',
          },
          {
            col: 8,
            row: 4,
            value: '#',
          },
          {
            col: 9,
            row: 4,
            value: '.',
          },
        ],
        [
          {
            col: 0,
            row: 5,
            value: '.',
          },
          {
            col: 1,
            row: 5,
            value: '.',
          },
          {
            col: 2,
            row: 5,
            value: '#',
          },
          {
            col: 3,
            row: 5,
            value: '.',
          },
          {
            col: 4,
            row: 5,
            value: '.',
          },
          {
            col: 5,
            row: 5,
            value: '.',
          },
          {
            col: 6,
            row: 5,
            value: '.',
          },
          {
            col: 7,
            row: 5,
            value: '#',
          },
          {
            col: 8,
            row: 5,
            value: '.',
          },
          {
            col: 9,
            row: 5,
            value: '#',
          },
        ],
        [
          {
            col: 0,
            row: 6,
            value: '.',
          },
          {
            col: 1,
            row: 6,
            value: '.',
          },
          {
            col: 2,
            row: 6,
            value: 'O',
          },
          {
            col: 3,
            row: 6,
            value: '.',
          },
          {
            col: 4,
            row: 6,
            value: '.',
          },
          {
            col: 5,
            row: 6,
            value: '#',
          },
          {
            col: 6,
            row: 6,
            value: '.',
          },
          {
            col: 7,
            row: 6,
            value: 'O',
          },
          {
            col: 8,
            row: 6,
            value: '.',
          },
          {
            col: 9,
            row: 6,
            value: 'O',
          },
        ],
        [
          {
            col: 0,
            row: 7,
            value: '.',
          },
          {
            col: 1,
            row: 7,
            value: '.',
          },
          {
            col: 2,
            row: 7,
            value: 'O',
          },
          {
            col: 3,
            row: 7,
            value: '.',
          },
          {
            col: 4,
            row: 7,
            value: '.',
          },
          {
            col: 5,
            row: 7,
            value: '.',
          },
          {
            col: 6,
            row: 7,
            value: '.',
          },
          {
            col: 7,
            row: 7,
            value: '.',
          },
          {
            col: 8,
            row: 7,
            value: '.',
          },
          {
            col: 9,
            row: 7,
            value: '.',
          },
        ],
        [
          {
            col: 0,
            row: 8,
            value: '#',
          },
          {
            col: 1,
            row: 8,
            value: '.',
          },
          {
            col: 2,
            row: 8,
            value: '.',
          },
          {
            col: 3,
            row: 8,
            value: '.',
          },
          {
            col: 4,
            row: 8,
            value: '.',
          },
          {
            col: 5,
            row: 8,
            value: '#',
          },
          {
            col: 6,
            row: 8,
            value: '#',
          },
          {
            col: 7,
            row: 8,
            value: '#',
          },
          {
            col: 8,
            row: 8,
            value: '.',
          },
          {
            col: 9,
            row: 8,
            value: '.',
          },
        ],
        [
          {
            col: 0,
            row: 9,
            value: '#',
          },
          {
            col: 1,
            row: 9,
            value: '.',
          },
          {
            col: 2,
            row: 9,
            value: '.',
          },
          {
            col: 3,
            row: 9,
            value: '.',
          },
          {
            col: 4,
            row: 9,
            value: '.',
          },
          {
            col: 5,
            row: 9,
            value: '#',
          },
          {
            col: 6,
            row: 9,
            value: '.',
          },
          {
            col: 7,
            row: 9,
            value: '.',
          },
          {
            col: 8,
            row: 9,
            value: '.',
          },
          {
            col: 9,
            row: 9,
            value: '.',
          },
        ],
      ]
      expect(calculateLoad(input)).toBe(136)
    })

    it('solution', () => {
      expect(part1(getPuzzleInput('day14/sampleInput'))).toBe(136)
      console.log('part 1', part1(getPuzzleInput('day14/input')))
    })
  })
  describe('part 2', () => {
    const sampleInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

    const expectedSouth = `.....#....
....#....#
...O.##...
...#......
O.O....O#O
O.#..O.#.#
O....#....
OO....OO..
#OO..###..
#OO.O#...O`

    it('rotate twice and tilt north', () => {
      const data = extractDataToPointGrid<string>(sampleInput)
      const rotatedCW90 = rotatePointsCCW(data)
      const rotated180 = rotatePointsCCW(rotatedCW90)
      const tilted = tiltNorth(rotated180)
      const rotatedBack = rotateCCW(rotateCCW(tilted))
        .map((row) => row.map((point) => point.value).join(''))
        .join('\n')
      expect(rotatedBack).toEqual(expectedSouth)
    })

    it('rotate both ways with strings', () => {
      const input = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]
      const rotatedCW90 = rotateCW<string>(input)
      expect(rotatedCW90).toEqual([
        ['g', 'd', 'a'],
        ['h', 'e', 'b'],
        ['i', 'f', 'c'],
      ])
      const rotated180 = rotateCW<string>(rotatedCW90)
      expect(rotated180).toEqual([
        ['i', 'h', 'g'],
        ['f', 'e', 'd'],
        ['c', 'b', 'a'],
      ])

      const rotatedCCW90 = rotateCCW<string>(input)
      expect(rotatedCCW90).toEqual([
        ['c', 'f', 'i'],
        ['b', 'e', 'h'],
        ['a', 'd', 'g'],
      ])

      const rotatedCCW180 = rotateCCW<string>(rotatedCCW90)
      expect(rotatedCCW180).toEqual(rotated180)
    })

    it('east works correctly', () => {
      const expected = `....O#....
.OOO#....#
.....##...
.OO#....OO
......OO#.
.O#...O#.#
....O#..OO
.........O
#....###..
#..OO#....`

      /*
O....#....  ....O#....
O.OO#....#  .OOO#....#
.....##...  .....##...
OO.#O....O  .OO#....OO
.O.....O#.  ......OO#.
O.#..O.#.#  .O#...O#.#
..O..#O..O  ....O#..OO
.......O..  .........O
#....###..  #....###..
#OO..#....  #..OO#....
      */
      const data = extractDataToPointGrid<string>(sampleInput)
      // const tiltedEast = tiltEast(data)
      // const string1 = gridToString(tiltedEast)
      // expect(string1).toEqual(expected)
      const tiltedEast2 = tiltEast2(data)
      const string2 = gridToString(tiltedEast2)
      expect(string2).toEqual(expected)
    })

    it('west works correctly', () => {
      /*
O....#....  O....#....
O.OO#....#  OOO.#....#
.....##...  .....##...
OO.#O....O  OO.#OO....
.O.....O#.  OO......#.
O.#..O.#.#  O.#O...#.#
..O..#O..O  O....#OO..
.......O..  O.........
#....###..  #....###..
#OO..#....  #OO..#....
      */

      const expected = `O....#....
OOO.#....#
.....##...
OO.#OO....
OO......#.
O.#O...#.#
O....#OO..
O.........
#....###..
#OO..#....`

      const data = extractDataToPointGrid<string>(sampleInput)
      // const tiltedWest = tiltWest(data)
      // const string1 = gridToString(tiltedWest)
      // expect(string1).toEqual(expected)
      const tiltedWest2 = tiltWest2(data)
      const string2 = gridToString(tiltedWest2)
      expect(string2).toEqual(expected)
    })

    it('south works correclty', () => {
      const data = extractDataToPointGrid<string>(sampleInput)
      // const tiltedSouth = tiltSouth(data)
      // const string1 = gridToString(tiltedSouth)
      // expect(string1).toEqual(expectedSouth)
      const tiltedSouth2 = tiltSouth2(data)
      const string2 = gridToString(tiltedSouth2)
      expect(string2).toEqual(expectedSouth)
    })

    it('tilt each direction 1 cycle', () => {
      const expected = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`

      const data = extractDataToPointGrid<string>(sampleInput)
      const tiltedNorth = tiltNorth(data)
      const titledWest = tiltWest2(tiltedNorth)
      const titledSouth = tiltSouth2(titledWest)
      const titledEast = tiltEast2(titledSouth)
      expect(gridToString(titledEast)).toEqual(expected)
    })

    it('spinCycle 2 times', () => {
      const expected = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`

      const data = extractDataToPointGrid<string>(sampleInput)
      const spun = spinCycle(data, 2)
      expect(gridToString(spun)).toEqual(expected)
    })

    it('spinCycle 3 times', () => {
      const expected = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`

      const data = extractDataToPointGrid<string>(sampleInput)
      const spun = gridToString(spinCycle(data, 3))
      expect(spun).toEqual(expected)
    })
    it('spinCycle2 after 13 times', () => {
      const expected = `.....#....
....#...O#
.....##...
...#......
.....OOO#.
.O#...O#.#
....O#...O
......OOOO
#....###.O
#.OOO#..OO`

      const data = extractDataToPointGrid<string>(sampleInput)
      const spun = gridToString(spinCycle2(data, 13))
      expect(spun).toEqual(expected)
    })

    it.only('solution', () => {
      // expect(part2(getPuzzleInput('day14/sampleInput'))).toBe(64)
      expect(part2(sampleInput)).toBe(64)
      console.log('part 2', part2(getPuzzleInput('day14/input')))
    })
  })
})
