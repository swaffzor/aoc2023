import fs from 'fs'
import { getFirstDigit, getLastDigit, part1, part2 } from './part1'
import path from 'path'
import { getPuzzleInput } from '../utils'

describe('getPuzzleInput', () => {
  it('should return the puzzle input as a string if no iterator is passed', () => {
    const file = 'day1/sampleInput'
    const puzzleInput = getPuzzleInput(file)
    expect(puzzleInput).toEqual(`1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`)
  })

  it('should return the puzzle input as an array if an iterator is passed', () => {
    const file = 'day1/sampleInput'
    const puzzleInput = getPuzzleInput(file, undefined, (input: string) =>
      input.split('\n')
    )
    expect(puzzleInput).toEqual([
      '1abc2',
      'pqr3stu8vwx',
      'a1b2c3d4e5f',
      'treb7uchet',
    ])
  })
})

describe('day1', () => {
  describe('part1', () => {
    it('sample input should work', () => {
      expect(part1(getPuzzleInput('day1/sampleInput'))).toBe(142)
      console.log('part1: ', part1(getPuzzleInput('day1/input')))
    })

    describe('part2', () => {
      describe('getFirstDigit', () => {
        // two1nine
        // eightwothree
        // abcone2threexyz
        // xtwone3four
        // 4nineeightseven2
        // zoneight234
        // 7pqrstsixteen
        it('two1nine', () => {
          expect(getFirstDigit('two1nine')).toBe(2)
        })

        it('eightwothree', () => {
          expect(getFirstDigit('eightwothree')).toBe(8)
        })

        it('abcone2threexyz', () => {
          expect(getFirstDigit('abcone2threexyz')).toBe(1)
        })

        it('xtwone3four', () => {
          expect(getFirstDigit('xtwone3four')).toBe(2)
        })

        it('4nineeightseven2', () => {
          expect(getFirstDigit('4nineeightseven2')).toBe(4)
        })

        it('zoneight234', () => {
          expect(getFirstDigit('zoneight234')).toBe(1)
        })

        it('7pqrstsixteen', () => {
          expect(getFirstDigit('7pqrstsixteen')).toBe(7)
        })

        it('kpmrk5flx', () => {
          expect(getFirstDigit('kpmrk5flx')).toBe(5)
        })
      })

      describe('getLastDigit', () => {
        // two1nine
        // eightwothree
        // abcone2threexyz
        // xtwone3four
        // 4nineeightseven2
        // zoneight234
        // 7pqrstsixteen
        it('two1nine', () => {
          expect(getLastDigit('two1nine')).toBe(9)
        })

        it('eightwothree', () => {
          expect(getLastDigit('eightwothree')).toBe(3)
        })

        it('abcone2threexyz', () => {
          expect(getLastDigit('abcone2threexyz')).toBe(3)
        })

        it('xtwone3four', () => {
          expect(getLastDigit('xtwone3four')).toBe(4)
        })

        it('4nineeightseven2', () => {
          expect(getLastDigit('4nineeightseven2')).toBe(2)
        })

        it('zoneight234', () => {
          expect(getLastDigit('zoneight234')).toBe(4)
        })

        it('7pqrstsixteen', () => {
          expect(getLastDigit('7pqrstsixteen')).toBe(6)
        })
      })

      it('kpmrk5flx', () => {
        expect(getLastDigit('kpmrk5flx')).toBe(5)
      })

      it('sample input should work', () => {
        expect(part2(getPuzzleInput('day1/sampleInputPart2'))).toBe(281)
        console.log('part2: ', part2(getPuzzleInput('day1/input')))
      })
    })
  })
})
