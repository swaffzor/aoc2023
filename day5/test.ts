import { getPuzzleInput } from '../utils'
import { part1, part2 } from './solution'

describe('day5', () => {
  it('part1', () => {
    expect(part1(getPuzzleInput('day5/sampleInput'))).toBe(35)
    console.log(part1(getPuzzleInput('day5/input')))
  })

  it.only('part2', () => {
    // expect(part2(getPuzzleInput('day5/sampleInput'))).toBe(46)
    console.log(part2(getPuzzleInput('day5/input')))
  })
})
