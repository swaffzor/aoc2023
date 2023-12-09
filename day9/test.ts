import { getPuzzleInput } from '../utils'
import { calcNextValue, part1 } from './solution'

const temp = (input: string) => {
  return input.split('\n')
}

describe('day 9', () => {
  describe('part1', () => {
    // 0 3 6 9 12 15
    // 1 3 6 10 15 21
    // 10 13 16 21 30 45
    it('calcNextValue sampleInput line 1', () => {
      expect(calcNextValue([0, 3, 6, 9, 12, 15])).toEqual([
        [0, 3, 6, 9, 12, 15],
        [3, 3, 3, 3, 3],
        [0, 0, 0, 0],
      ])
    })
    it('calcNextValue sampleInput line 2', () => {
      expect(calcNextValue([1, 3, 6, 10, 15, 21])).toEqual([
        [1, 3, 6, 10, 15, 21],
        [2, 3, 4, 5, 6],
        [1, 1, 1, 1],
        [0, 0, 0],
      ])
    })
    it('calcNextValue sampleInput line 3', () => {
      expect(calcNextValue([10, 13, 16, 21, 30, 45])).toEqual([
        [10, 13, 16, 21, 30, 45],
        [3, 3, 5, 9, 15],
        [0, 2, 4, 6],
        [2, 2, 2],
        [0, 0],
      ])
    })
    it('solution', () => {
      expect(part1(getPuzzleInput('day9/sampleInput'))).toEqual(114)
      console.log('part1:', part1(getPuzzleInput('day9/input')))
    })
  })
})
