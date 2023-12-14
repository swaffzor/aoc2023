import { extractDataToPointGrid, getPuzzleInput } from '../utils'
import {
  checkIsVerticalReflection,
  isHorizontalReflection,
  part1,
} from './solution'

describe('day 13', () => {
  const input = getPuzzleInput('day13/sampleInput')
  const horizontal = `#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`
  const vertical = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`
  describe('part 1', () => {
    it('isHorizontalReflection', () => {
      expect(isHorizontalReflection(horizontal.split('\n'))).toEqual(400)
    })
    it('not isHorizontalReflection', () => {
      expect(isHorizontalReflection(vertical.split('\n'))).toEqual(0)
    })
    it('isVerticalReflection', () => {
      expect(
        checkIsVerticalReflection(extractDataToPointGrid(vertical))
      ).toEqual(5)
    })
    it('not isVerticalReflection', () => {
      expect(
        checkIsVerticalReflection(extractDataToPointGrid(horizontal))
      ).toEqual(0)
    })
    it('solution', () => {
      expect(part1(input)).toEqual(405)
      console.log('part 1:', part1(getPuzzleInput('day13/input')))
    })
  })
})
