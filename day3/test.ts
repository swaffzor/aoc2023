import { getPuzzleInput } from '../utils'
import {
  extractDataToPointGrid,
  getFullNumber,
  part1,
  part2,
  // part2,
} from './solution'

const grid = [
  [
    {
      col: 0,
      row: 0,
      z: 0,
      value: '4',
    },
    {
      col: 1,
      row: 0,
      z: 0,
      value: '6',
    },
    {
      col: 2,
      row: 0,
      z: 1,
      value: '7',
    },
    {
      col: 3,
      row: 0,
      z: 0,
      value: '.',
    },
    {
      col: 4,
      row: 0,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 0,
      z: 0,
      value: '1',
    },
    {
      col: 6,
      row: 0,
      z: 0,
      value: '1',
    },
    {
      col: 7,
      row: 0,
      z: 0,
      value: '4',
    },
    {
      col: 8,
      row: 0,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 0,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 3,
      row: 1,
      z: 0,
      value: '*',
    },
    {
      col: 4,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 6,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 7,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 8,
      row: 1,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 1,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 2,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 2,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 2,
      z: 0,
      value: '3',
    },
    {
      col: 3,
      row: 2,
      z: 0,
      value: '5',
    },
    {
      col: 4,
      row: 2,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 2,
      z: 0,
      value: '.',
    },
    {
      col: 6,
      row: 2,
      z: 0,
      value: '6',
    },
    {
      col: 7,
      row: 2,
      z: 0,
      value: '3',
    },
    {
      col: 8,
      row: 2,
      z: 0,
      value: '3',
    },
    {
      col: 9,
      row: 2,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 3,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 4,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 6,
      row: 3,
      z: 0,
      value: '#',
    },
    {
      col: 7,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 8,
      row: 3,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 3,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 4,
      z: 0,
      value: '6',
    },
    {
      col: 1,
      row: 4,
      z: 0,
      value: '1',
    },
    {
      col: 2,
      row: 4,
      z: 0,
      value: '7',
    },
    {
      col: 3,
      row: 4,
      z: 0,
      value: '*',
    },
    {
      col: 4,
      row: 4,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 4,
      z: 0,
      value: '.',
    },
    {
      col: 6,
      row: 4,
      z: 0,
      value: '.',
    },
    {
      col: 7,
      row: 4,
      z: 0,
      value: '.',
    },
    {
      col: 8,
      row: 4,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 4,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 5,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 5,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 5,
      z: 0,
      value: '.',
    },
    {
      col: 3,
      row: 5,
      z: 0,
      value: '.',
    },
    {
      col: 4,
      row: 5,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 5,
      z: 0,
      value: '+',
    },
    {
      col: 6,
      row: 5,
      z: 0,
      value: '.',
    },
    {
      col: 7,
      row: 5,
      z: 0,
      value: '5',
    },
    {
      col: 8,
      row: 5,
      z: 0,
      value: '8',
    },
    {
      col: 9,
      row: 5,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 6,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 6,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 6,
      z: 0,
      value: '5',
    },
    {
      col: 3,
      row: 6,
      z: 0,
      value: '9',
    },
    {
      col: 4,
      row: 6,
      z: 0,
      value: '2',
    },
    {
      col: 5,
      row: 6,
      z: 0,
      value: '.',
    },
    {
      col: 6,
      row: 6,
      z: 0,
      value: '.',
    },
    {
      col: 7,
      row: 6,
      z: 0,
      value: '.',
    },
    {
      col: 8,
      row: 6,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 6,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 7,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 7,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 7,
      z: 0,
      value: '.',
    },
    {
      col: 3,
      row: 7,
      z: 0,
      value: '.',
    },
    {
      col: 4,
      row: 7,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 7,
      z: 0,
      value: '.',
    },
    {
      col: 6,
      row: 7,
      z: 0,
      value: '7',
    },
    {
      col: 7,
      row: 7,
      z: 0,
      value: '5',
    },
    {
      col: 8,
      row: 7,
      z: 0,
      value: '5',
    },
    {
      col: 9,
      row: 7,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 2,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 3,
      row: 8,
      z: 0,
      value: '$',
    },
    {
      col: 4,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 8,
      z: 0,
      value: '*',
    },
    {
      col: 6,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 7,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 8,
      row: 8,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 8,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      col: 0,
      row: 9,
      z: 0,
      value: '.',
    },
    {
      col: 1,
      row: 9,
      z: 0,
      value: '6',
    },
    {
      col: 2,
      row: 9,
      z: 0,
      value: '6',
    },
    {
      col: 3,
      row: 9,
      z: 0,
      value: '4',
    },
    {
      col: 4,
      row: 9,
      z: 0,
      value: '.',
    },
    {
      col: 5,
      row: 9,
      z: 0,
      value: '5',
    },
    {
      col: 6,
      row: 9,
      z: 0,
      value: '9',
    },
    {
      col: 7,
      row: 9,
      z: 0,
      value: '8',
    },
    {
      col: 8,
      row: 9,
      z: 0,
      value: '.',
    },
    {
      col: 9,
      row: 9,
      z: 0,
      value: '.',
    },
  ],
]

describe('day 3', () => {
  describe('part1', () => {
    it.skip('getFullNumber sample input line 1', () => {
      const point = {
        col: 2,
        row: 0,
        z: 0,
        value: '7',
      }
      const neighbors = [
        {
          col: 1,
          row: 0,
          z: 0,
          value: '6',
        },
        {
          col: 3,
          row: 0,
          z: 0,
          value: '.',
        },
        {
          col: 2,
          row: 1,
          z: 0,
          value: '.',
        },
        {
          col: 1,
          row: 1,
          z: 0,
          value: '.',
        },
        {
          col: 3,
          row: 1,
          z: 0,
          value: '*',
        },
      ]
      expect(getFullNumber(point, neighbors)).toBe('467')
    })

    it.skip('getFullNumber sample input line 3', () => {
      const point = {
        col: 2,
        row: 2,
        z: 0,
        value: '3',
      }
      const neighbors = [
        {
          col: 1,
          row: 2,
          z: 0,
          value: '.',
        },
        {
          col: 3,
          row: 2,
          z: 0,
          value: '5',
        },
        {
          col: 2,
          row: 1,
          z: 0,
          value: '.',
        },
        {
          col: 2,
          row: 3,
          z: 0,
          value: '.',
        },
        {
          col: 1,
          row: 1,
          z: 0,
          value: '.',
        },
        {
          col: 3,
          row: 1,
          z: 0,
          value: '*',
        },
        {
          col: 1,
          row: 3,
          z: 0,
          value: '.',
        },
        {
          col: 3,
          row: 3,
          z: 0,
          value: '.',
        },
      ]
      expect(getFullNumber(point, neighbors)).toBe('35')
    })

    it.skip('getFullNumber sample input line 3 is 35', () => {
      const point = {
        col: 3,
        row: 2,
        z: 0,
        value: '5',
      }
      const neighbors = [
        {
          col: 2,
          row: 2,
          z: 1,
          value: '3',
        },
        {
          col: 4,
          row: 2,
          z: 0,
          value: '.',
        },
        {
          col: 3,
          row: 1,
          z: 0,
          value: '*',
        },
        {
          col: 3,
          row: 3,
          z: 0,
          value: '.',
        },
        {
          col: 2,
          row: 1,
          z: 0,
          value: '.',
        },
        {
          col: 4,
          row: 1,
          z: 0,
          value: '.',
        },
        {
          col: 2,
          row: 3,
          z: 0,
          value: '.',
        },
        {
          col: 4,
          row: 3,
          z: 0,
          value: '.',
        },
      ]
      expect(getFullNumber(point, neighbors)).toBe('35')
    })

    it('solution', () => {
      // expect(part1(getPuzzleInput('day3/sampleInput'))).toBe(4361)
      console.log('part1', part1(getPuzzleInput('day3/input')))
    })
  })

  describe('part2', () => {
    it.only('solution', () => {
      // expect(part2(getPuzzleInput('day3/sampleInput'))).toBe(467835)
      console.log('part2', part2(getPuzzleInput('day3/input')))
    })
  })
})
