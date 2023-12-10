import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 10', () => {
  describe('part 1', () => {
    it('example 1', () => {
      expect(part1(getPuzzleInput('day10/sampleInput'))).toBe(8)
      console.log('part1:', part1(getPuzzleInput('day10/input')))
    })
  })
})
