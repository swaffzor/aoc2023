import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 17', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(part1(getPuzzleInput('day17/sampleInput'))).toBe(102)
      console.log('part 1:', part1(getPuzzleInput('day17/input')))
    })
  })
})
