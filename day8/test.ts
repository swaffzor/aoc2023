import { getPuzzleInput } from '../utils'
import { part1, part2 } from './solution'

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
    })
  })
  describe('part2', () => {
    it.only('part2 ', () => {
      const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
      expect(part2(input)).toBe(6)
      console.log(part2(getPuzzleInput('day8/input')))
    })
  })
})
