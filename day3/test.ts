import { getPuzzleInput } from '../utils'
import {
  extractDataToPointGrid,
  part1,
  // part2,
} from './solution'

describe('day 3', () => {
  describe('part1', () => {
    // it('extractDataToPointGrid sample input', () => {
    //   expect(extractDataToPointGrid(getPuzzleInput('day3/sampleInput'))).toBe(

    //   )
    // })

    it('solution', () => {
      expect(part1(getPuzzleInput('day3/sampleInput'))).toBe(4361)
      console.log('part1', part1(getPuzzleInput('day3/input')))
    })
  })
})
