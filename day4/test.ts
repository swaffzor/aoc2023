import { getPuzzleInput } from '../utils'
import { part1, part2 } from './solution'

describe('day 4', () => {
  it.skip('part 1', () => {
    // expect(part1(getPuzzleInput('day4/sampleInput'))).toBe(13)
    console.log('part1', part1(getPuzzleInput('day4/input')))
  })
  it('part 2', () => {
    // expect(part2(getPuzzleInput('day4/sampleInput'))).toBe(30)
    console.log('part2', part2(getPuzzleInput('day4/input')))
  })
})
