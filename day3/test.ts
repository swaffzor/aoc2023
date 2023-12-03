import { getPuzzleInput } from '../utils'
import {
  extractDataToPointGrid,
  getFullNumber,
  part1,
  // part2,
} from './solution'

const grid = [
  [
    {
      x: 0,
      y: 0,
      z: 0,
      value: '4',
    },
    {
      x: 1,
      y: 0,
      z: 0,
      value: '6',
    },
    {
      x: 2,
      y: 0,
      z: 1,
      value: '7',
    },
    {
      x: 3,
      y: 0,
      z: 0,
      value: '.',
    },
    {
      x: 4,
      y: 0,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 0,
      z: 0,
      value: '1',
    },
    {
      x: 6,
      y: 0,
      z: 0,
      value: '1',
    },
    {
      x: 7,
      y: 0,
      z: 0,
      value: '4',
    },
    {
      x: 8,
      y: 0,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 0,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 3,
      y: 1,
      z: 0,
      value: '*',
    },
    {
      x: 4,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 6,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 7,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 8,
      y: 1,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 1,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 2,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 2,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 2,
      z: 0,
      value: '3',
    },
    {
      x: 3,
      y: 2,
      z: 0,
      value: '5',
    },
    {
      x: 4,
      y: 2,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 2,
      z: 0,
      value: '.',
    },
    {
      x: 6,
      y: 2,
      z: 0,
      value: '6',
    },
    {
      x: 7,
      y: 2,
      z: 0,
      value: '3',
    },
    {
      x: 8,
      y: 2,
      z: 0,
      value: '3',
    },
    {
      x: 9,
      y: 2,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 3,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 4,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 6,
      y: 3,
      z: 0,
      value: '#',
    },
    {
      x: 7,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 8,
      y: 3,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 3,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 4,
      z: 0,
      value: '6',
    },
    {
      x: 1,
      y: 4,
      z: 0,
      value: '1',
    },
    {
      x: 2,
      y: 4,
      z: 0,
      value: '7',
    },
    {
      x: 3,
      y: 4,
      z: 0,
      value: '*',
    },
    {
      x: 4,
      y: 4,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 4,
      z: 0,
      value: '.',
    },
    {
      x: 6,
      y: 4,
      z: 0,
      value: '.',
    },
    {
      x: 7,
      y: 4,
      z: 0,
      value: '.',
    },
    {
      x: 8,
      y: 4,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 4,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 5,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 5,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 5,
      z: 0,
      value: '.',
    },
    {
      x: 3,
      y: 5,
      z: 0,
      value: '.',
    },
    {
      x: 4,
      y: 5,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 5,
      z: 0,
      value: '+',
    },
    {
      x: 6,
      y: 5,
      z: 0,
      value: '.',
    },
    {
      x: 7,
      y: 5,
      z: 0,
      value: '5',
    },
    {
      x: 8,
      y: 5,
      z: 0,
      value: '8',
    },
    {
      x: 9,
      y: 5,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 6,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 6,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 6,
      z: 0,
      value: '5',
    },
    {
      x: 3,
      y: 6,
      z: 0,
      value: '9',
    },
    {
      x: 4,
      y: 6,
      z: 0,
      value: '2',
    },
    {
      x: 5,
      y: 6,
      z: 0,
      value: '.',
    },
    {
      x: 6,
      y: 6,
      z: 0,
      value: '.',
    },
    {
      x: 7,
      y: 6,
      z: 0,
      value: '.',
    },
    {
      x: 8,
      y: 6,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 6,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 7,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 7,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 7,
      z: 0,
      value: '.',
    },
    {
      x: 3,
      y: 7,
      z: 0,
      value: '.',
    },
    {
      x: 4,
      y: 7,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 7,
      z: 0,
      value: '.',
    },
    {
      x: 6,
      y: 7,
      z: 0,
      value: '7',
    },
    {
      x: 7,
      y: 7,
      z: 0,
      value: '5',
    },
    {
      x: 8,
      y: 7,
      z: 0,
      value: '5',
    },
    {
      x: 9,
      y: 7,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 2,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 3,
      y: 8,
      z: 0,
      value: '$',
    },
    {
      x: 4,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 8,
      z: 0,
      value: '*',
    },
    {
      x: 6,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 7,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 8,
      y: 8,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 8,
      z: 0,
      value: '.',
    },
  ],
  [
    {
      x: 0,
      y: 9,
      z: 0,
      value: '.',
    },
    {
      x: 1,
      y: 9,
      z: 0,
      value: '6',
    },
    {
      x: 2,
      y: 9,
      z: 0,
      value: '6',
    },
    {
      x: 3,
      y: 9,
      z: 0,
      value: '4',
    },
    {
      x: 4,
      y: 9,
      z: 0,
      value: '.',
    },
    {
      x: 5,
      y: 9,
      z: 0,
      value: '5',
    },
    {
      x: 6,
      y: 9,
      z: 0,
      value: '9',
    },
    {
      x: 7,
      y: 9,
      z: 0,
      value: '8',
    },
    {
      x: 8,
      y: 9,
      z: 0,
      value: '.',
    },
    {
      x: 9,
      y: 9,
      z: 0,
      value: '.',
    },
  ],
]

describe('day 3', () => {
  describe('part1', () => {
    it('getFullNumber sample input line 1', () => {
      const point = {
        x: 2,
        y: 0,
        z: 0,
        value: '7',
      }
      const neighbors = [
        {
          x: 1,
          y: 0,
          z: 0,
          value: '6',
        },
        {
          x: 3,
          y: 0,
          z: 0,
          value: '.',
        },
        {
          x: 2,
          y: 1,
          z: 0,
          value: '.',
        },
        {
          x: 1,
          y: 1,
          z: 0,
          value: '.',
        },
        {
          x: 3,
          y: 1,
          z: 0,
          value: '*',
        },
      ]
      expect(getFullNumber(point, neighbors)).toBe('467')
    })

    it('getFullNumber sample input line 3', () => {
      const point = {
        x: 2,
        y: 2,
        z: 0,
        value: '3',
      }
      const neighbors = [
        {
          x: 1,
          y: 2,
          z: 0,
          value: '.',
        },
        {
          x: 3,
          y: 2,
          z: 0,
          value: '5',
        },
        {
          x: 2,
          y: 1,
          z: 0,
          value: '.',
        },
        {
          x: 2,
          y: 3,
          z: 0,
          value: '.',
        },
        {
          x: 1,
          y: 1,
          z: 0,
          value: '.',
        },
        {
          x: 3,
          y: 1,
          z: 0,
          value: '*',
        },
        {
          x: 1,
          y: 3,
          z: 0,
          value: '.',
        },
        {
          x: 3,
          y: 3,
          z: 0,
          value: '.',
        },
      ]
      expect(getFullNumber(point, neighbors)).toBe('35')
    })

    it('getFullNumber sample input line 3 is 35', () => {
      const point = {
        x: 3,
        y: 2,
        z: 0,
        value: '5',
      }
      const neighbors = [
        {
          x: 2,
          y: 2,
          z: 1,
          value: '3',
        },
        {
          x: 4,
          y: 2,
          z: 0,
          value: '.',
        },
        {
          x: 3,
          y: 1,
          z: 0,
          value: '*',
        },
        {
          x: 3,
          y: 3,
          z: 0,
          value: '.',
        },
        {
          x: 2,
          y: 1,
          z: 0,
          value: '.',
        },
        {
          x: 4,
          y: 1,
          z: 0,
          value: '.',
        },
        {
          x: 2,
          y: 3,
          z: 0,
          value: '.',
        },
        {
          x: 4,
          y: 3,
          z: 0,
          value: '.',
        },
      ]
      expect(getFullNumber(point, neighbors)).toBe('35')
    })

    it.only('solution', () => {
      // expect(part1(getPuzzleInput('day3/sampleInput'))).toBe(4361)
      console.log('part1', part1(getPuzzleInput('day3/input')))
    })
  })
})
