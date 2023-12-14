import { extractDataToPointGrid, getPuzzleInput } from '../utils'
import { calculateLoad, part1, tiltNorth } from './solution'

describe('day 14', () => {
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

  it('part 1', () => {
    expect(part1(getPuzzleInput('day14/sampleInput'))).toBe(136)
    console.log('part 1', part1(getPuzzleInput('day14/input')))
  })
})
