import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 16', () => {
  describe('part 1', () => {
    it('sampleInput', () => {
      expect(part1(getPuzzleInput('day16/sampleInput'))).toEqual(46)
      console.log('part 1:', part1(getPuzzleInput('day16/input')))
    })
  })
})
