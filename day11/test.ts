import { getPuzzleInput } from '../utils'
import { part1, part2 } from './solution'

describe('day11', () => {
  it.skip('part1', () => {
    expect(part1(getPuzzleInput('day11/sampleInput'))).toBe(374)
    console.log('part1:', part1(getPuzzleInput('day11/input')))
  })

  describe('part2', () => {
    it.skip('part2 1x', () => {
      expect(part2(getPuzzleInput('day11/sampleInput'), 1)).toBe(374)
    })
    it('part2 10x', () => {
      expect(part2(getPuzzleInput('day11/sampleInput'), 10)).toBe(1030)
    })
    it('part2 100x', () => {
      expect(part2(getPuzzleInput('day11/sampleInput'), 100)).toBe(8410)
      console.log('part2:', part2(getPuzzleInput('day11/input'), 1000000))
    })
  })
})
