import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day8', () => {
  describe('part1', () => {
    it('should return 0', () => {
      const input1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`
      const input2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

      expect(part1(input1)).toBe(2)
      expect(part1(input2)).toBe(6)
      console.log('----------------------------------------')
      console.log('part1:', part1(getPuzzleInput('day8/input')))
      console.log('----------------------------------------')
    })
  })
})
