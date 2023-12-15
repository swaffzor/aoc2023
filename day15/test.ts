import { getPuzzleInput } from '../utils'
import { part1 } from './solution'

describe('day 15', () => {
  it('part1', () => {
    expect(part1('HASH')).toBe(52)
    expect(part1('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7')).toBe(
      1320
    )
    console.log('part 1:', part1(getPuzzleInput('day15/input')))
  })
})
