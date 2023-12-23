import { getPuzzleInput } from '../utils'
import { part1, part2 } from './solution'

describe('day 21', () => {
  describe('part 1', () => {
    it('solution', () => {
      const input = getPuzzleInput('day21/sampleInput')
      expect(part1(input, 6)).toBe(16)
      // console.log('part 1:', part1(getPuzzleInput('day21/input'), 64))
    })
  })
  describe('part 2', () => {
    it.each([
      [6, 16],
      [10, 50],
      [50, 1594],
    ])('%s steps', (steps, expected) => {
      const input = getPuzzleInput('day21/sampleInput2')
      expect(part2(input, steps)).toBe(expected)
      // console.log('part 2:', part2(getPuzzleInput('day21/input'), Infinity))
    })
  })
})
