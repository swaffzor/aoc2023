import { getPuzzleInput } from '../utils'
import { isValid, part1 } from './solution'

describe('day12', () => {
  describe('part1', () => {
    it.each([
      [{ row: '....###', groups: [1, 1, 3] }, false],
      [{ row: '#...###', groups: [1, 1, 3] }, false],
      [{ row: '.##.###', groups: [1, 1, 3] }, false],
      [{ row: '.#..###', groups: [1, 1, 3] }, false],
      [{ row: '#.#.###', groups: [1, 1, 3] }, true],
      [{ row: '..#.###', groups: [1, 1, 3] }, false],
      [{ row: '##..###', groups: [1, 1, 3] }, false],
      [{ row: '...........##.', groups: [1, 1, 3] }, false],
      [{ row: '..........###.', groups: [1, 1, 3] }, false],
      [{ row: '......#....##.', groups: [1, 1, 3] }, false],
      [{ row: '......#...###.', groups: [1, 1, 3] }, false],
      [{ row: '.....#.....##.', groups: [1, 1, 3] }, false],
      [{ row: '.....#....###.', groups: [1, 1, 3] }, false],
      [{ row: '.....##....##.', groups: [1, 1, 3] }, false],
      [{ row: '.....##...###.', groups: [1, 1, 3] }, false],
      [{ row: '..#........##.', groups: [1, 1, 3] }, false],
      [{ row: '..#.......###.', groups: [1, 1, 3] }, false],
      [{ row: '..#...#....##.', groups: [1, 1, 3] }, false],
      [{ row: '..#...#...###.', groups: [1, 1, 3] }, true],
      [{ row: '..#..#.....##.', groups: [1, 1, 3] }, false],
      [{ row: '..#..#....###.', groups: [1, 1, 3] }, true],
      [{ row: '..#..##....##.', groups: [1, 1, 3] }, false],
      [{ row: '..#..##...###.', groups: [1, 1, 3] }, false],
      [{ row: '.#.........##.', groups: [1, 1, 3] }, false],
      [{ row: '.#........###.', groups: [1, 1, 3] }, false],
      [{ row: '.#....#....##.', groups: [1, 1, 3] }, false],
      [{ row: '.#....#...###.', groups: [1, 1, 3] }, true],
      [{ row: '.#...#.....##.', groups: [1, 1, 3] }, false],
      [{ row: '.#...#....###.', groups: [1, 1, 3] }, true],
      [{ row: '.#...##....##.', groups: [1, 1, 3] }, false],
      [{ row: '.#...##...###.', groups: [1, 1, 3] }, false],
      [{ row: '.##........##.', groups: [1, 1, 3] }, false],
      [{ row: '.##.......###.', groups: [1, 1, 3] }, false],
      [{ row: '.##...#....##.', groups: [1, 1, 3] }, false],
      [{ row: '.##...#...###.', groups: [1, 1, 3] }, false],
      [{ row: '.##..#.....##.', groups: [1, 1, 3] }, false],
      [{ row: '.##..#....###.', groups: [1, 1, 3] }, false],
      [{ row: '.##..##....##.', groups: [1, 1, 3] }, false],
      [{ row: '.##..##...###.', groups: [1, 1, 3] }, false],
    ])('isValid %s', (record, expected) => {
      expect(isValid(record)).toBe(expected)
    })

    it('solution', () => {
      expect(part1(getPuzzleInput('day12/sampleInput'))).toBe(21)
      console.log('part1:', part1(getPuzzleInput('day12/input')))
    })
  })
})
