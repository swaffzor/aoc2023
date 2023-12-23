import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 21', () => {
  describe('part 1', () => {
    it('solution', () => {
      const input = getPuzzleInput('day21/sampleInput')
      expect(part1(input, 6)).toBe(16)
      console.log('part 1:', part1(getPuzzleInput('day21/input'), 64))
    })
  })
})
