import { part1 } from './solution'

const input = `Time:      7  15   30
Distance:  9  40  200`

describe('day 6', () => {
  describe('part 1', () => {
    it('example', () => {
      expect(part1('sample')).toEqual(288)
      console.log(part1('puzzle'))
    })
  })
})
