import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 20', () => {
  describe('part 1', () => {
    it('example 1', () => {
      expect(part1(getPuzzleInput('day20/sampleInput'))).toBe(32000000)
      console.log('part1:', part1(getPuzzleInput('day20/sampleInput')))
    })
  })
})
