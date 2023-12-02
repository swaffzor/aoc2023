import { getPuzzleInput } from '../utils'
import {
  calcFewestCubes,
  calculatePower,
  extractData,
  part1,
  part2,
} from './part1'

describe('day 2', () => {
  it('part 1', () => {
    expect(part1(getPuzzleInput('day2/sampleInput'))).toBe(8)
    console.log('part1', part1(getPuzzleInput('day2/input')))
  })

  describe('part2', () => {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    // Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    // Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    // // Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

    // In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
    // Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
    // Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
    // Game 4 required at least 14 red, 3 green, and 15 blue cubes.
    // Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
    it('calcFewestCubes sample game 1', () => {
      const input = [
        {
          blue: 3,
          red: 4,
        },
        {
          red: 1,
          green: 2,
          blue: 6,
        },
        {
          green: 2,
        },
      ]
      expect(calcFewestCubes(input)).toEqual({ red: 4, green: 2, blue: 6 })
    })

    it('calcFewestCubes sample game 2', () => {
      const input = [
        {
          blue: 1,
          green: 2,
        },
        {
          green: 3,
          blue: 4,
          red: 1,
        },
        {
          green: 1,
          blue: 1,
        },
      ]
      expect(calcFewestCubes(input)).toEqual({ red: 1, green: 3, blue: 4 })
    })

    it('calcFewestCubes sample game 3', () => {
      const input = [
        {
          green: 8,
          blue: 6,
          red: 20,
        },
        {
          blue: 5,
          red: 4,
          green: 13,
        },
        {
          green: 5,
          red: 1,
        },
      ]
      expect(calcFewestCubes(input)).toEqual({ red: 20, green: 13, blue: 6 })
    })

    it('calcFewestCubes sample game 4', () => {
      const input = [
        {
          green: 1,
          red: 3,
          blue: 6,
        },
        {
          green: 3,
          red: 6,
        },
        {
          green: 3,
          blue: 15,
          red: 14,
        },
      ]
      expect(calcFewestCubes(input)).toEqual({ red: 14, green: 3, blue: 15 })
    })

    it('calcFewestCubes sample game 5', () => {
      const input = [
        {
          red: 6,
          blue: 1,
          green: 3,
        },
        {
          blue: 2,
          red: 1,
          green: 2,
        },
      ]
      expect(calcFewestCubes(input)).toEqual({ red: 6, green: 3, blue: 2 })
    })

    it('calculatePower sample game 1', () => {
      expect(calculatePower({ red: 4, green: 2, blue: 6 })).toEqual(48)
    })
    // 12, 1560, 630, and 36
    it('calculatePower sample game 2', () => {
      expect(calculatePower({ red: 1, green: 3, blue: 4 })).toEqual(12)
    })

    it('calculatePower sample game 3', () => {
      expect(calculatePower({ red: 20, green: 13, blue: 6 })).toEqual(1560)
    })

    it('calculatePower sample game 4', () => {
      expect(calculatePower({ red: 14, green: 3, blue: 15 })).toEqual(630)
    })

    it('calculatePower sample game 5', () => {
      expect(calculatePower({ red: 6, green: 3, blue: 2 })).toEqual(36)
    })

    it('solution', () => {
      expect(part2(getPuzzleInput('day2/sampleInput'))).toBe(2286)
      console.log('part2', part2(getPuzzleInput('day2/input')))
    })
  })
})
