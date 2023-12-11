import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day11', () => {
  it('part1', () => {
    expect(part1(getPuzzleInput('day11/sampleInput'))).toBe(374)
    console.log('part1:', part1(getPuzzleInput('day11/input')))
  })
})
