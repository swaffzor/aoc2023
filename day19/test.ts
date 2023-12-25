import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 19', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(part1(getPuzzleInput('day19/sampleInput'))).toBe(19114)
      console.log('part 1:', part1(getPuzzleInput('day19/input')))
    })
  })
})
