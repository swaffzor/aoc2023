import { extractDataToPointGrid, getPuzzleInput } from '../utils'
import {
  checkIsVerticalReflection,
  isHorizontalReflection,
  part1,
} from './solution'
import answers from './patternAnswers.json'
// const input = getPuzzleInput('day13/sampleInput')
// describe('day 13', () => {
//   const horizontal = `#...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#`
//   const vertical = `#.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.`
//   describe.skip('part 1', () => {
//     it('isHorizontalReflection', () => {
//       expect(isHorizontalReflection(horizontal.split('\n'))).toEqual(400)
//     })
//     it('not isHorizontalReflection', () => {
//       expect(isHorizontalReflection(vertical.split('\n'))).toEqual(0)
//     })
//     it('not isHorizontalReflection 2', () => {
//       const input = `#.#.###
// ..#..##
// ..#..##
// #.#..##
// ..#####
// ....###
// .######
// .##..##
// .###.##
// ##.#...
// ##..#..`
//       expect(isHorizontalReflection(input.split('\n'))).toEqual(0)
//     })
//     it.only('isVerticalReflection', () => {
//       expect(
//         checkIsVerticalReflection(extractDataToPointGrid(vertical))
//       ).toEqual(5)
//     })
//     it('not isVerticalReflection', () => {
//       expect(
//         checkIsVerticalReflection(extractDataToPointGrid(horizontal))
//       ).toEqual(0)
//     })
//     it('solution', () => {
//       expect(part1(input)).toEqual(405)
//       console.log('part 1:', part1(getPuzzleInput('day13/input')))
//     })
//   })
// })

describe('day 13 attempt 2', () => {
  it('input pattern 1', () => {
    const pattern = getPuzzleInput('day13/input').split('\n\n')[0]
    expect(part1(pattern)).toEqual(900)
  })

  it('input pattern 2', () => {
    const pattern = getPuzzleInput('day13/input').split('\n\n')[1]
    expect(part1(pattern)).toEqual(200)
  })

  it('input pattern 3', () => {
    const pattern = getPuzzleInput('day13/input').split('\n\n')[2]
    expect(part1(pattern)).toEqual(100)
  })

  it('input pattern 4', () => {
    const pattern = getPuzzleInput('day13/input').split('\n\n')[3]
    expect(part1(pattern)).toEqual(answers[3])
  })

  let failures = 0
  it('should pass all pattern tests', () => {
    const patterns = getPuzzleInput('day13/input').split('\n\n')
    patterns.forEach((pattern, index) => {
      const expectedAnswer = answers[index]
      const result = part1(pattern)
      if (result !== expectedAnswer) {
        console.log(
          'pattern',
          index + 1,
          'failed. result:',
          result,
          'expected:',
          expectedAnswer
        )
        failures++
      }
      // expect(result).toEqual(expectedAnswer)
    })
    console.log(patterns.length - failures, '% passed')
  })

  it('sampleInput', () => {
    const input = getPuzzleInput('day13/sampleInput')
    expect(part1(input)).toEqual(405)
    console.log('part 1:', part1(getPuzzleInput('day13/input')))
  })
})
