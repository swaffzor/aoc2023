import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 18', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(part1(getPuzzleInput('day18/sampleInput'))).toBe(62)
      console.log('part 1:', part1(getPuzzleInput('day18/input')))
    })
  })
})
