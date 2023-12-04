import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 4', () => {
  it('part 1', () => {
    expect(part1(getPuzzleInput('day4/sampleInput'))).toBe(13)
    console.log('part1', part1(getPuzzleInput('day4/input')))
  })
})
