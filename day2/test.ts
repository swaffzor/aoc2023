import { getPuzzleInput } from '../utils'
import { extractData, part1 } from './part1'

describe('day 2', () => {
  it('part 1', () => {
    expect(part1(getPuzzleInput('day2/sampleInput'))).toBe(8)
    console.log('part1', part1(getPuzzleInput('day2/input')))
  })
})
