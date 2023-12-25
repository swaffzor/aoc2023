import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 25', () => {
  describe('part 1', () => {
    it('example 1', () => {
      expect(part1(getPuzzleInput('day25/sampleInput'))).toEqual(54)
      console.log('part 1:', part1(getPuzzleInput('day25/input')))
    })
  })
})
