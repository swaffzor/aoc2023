import { getPuzzleInput } from '../utils'
import { part1, part2 } from './solution'

describe('day 19', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(part1(getPuzzleInput('day19/sampleInput'))).toBe(19114)
      console.log('part 1:', part1(getPuzzleInput('day19/input')))
    })
  })
  describe('part 2', () => {
    it('example', () => {
      expect(part2(getPuzzleInput('day19/sampleInput'))).toBe(167409079868000)
      console.log('part 2:', part2(getPuzzleInput('day19/input')))
    })
  })
})
