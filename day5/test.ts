import { getPuzzleInput } from '../utils'
import {
  extractData,
  extractLocations,
  extractSeedsFromRanges,
  location2Seeds,
  part1,
  part2,
  reverseMappingInData,
  seedToLocation,
} from './solution'

describe('day5', () => {
  it('part1', () => {
    expect(part1(getPuzzleInput('day5/sampleInput'))).toBe(35)
    console.log(part1(getPuzzleInput('day5/input')))
  })

  describe.only('part2', () => {
    // it('reverse - data normal into locationToSeed', () => {
    //   const data = extractData(getPuzzleInput('day5/sampleInput'))
    //   // const data = reverseMappingInData(extractData(input))
    //   const possibleSeeds = data['humidity-to-location'].map((mapping) => {
    //     const seed = locationToSeed(data, mapping.dest)
    //     return seed
    //   })
    //   // console.log('possibleSeeds', possibleSeeds)

    //   const min = Math.min(seedToLocation({ ...data, seeds: possibleSeeds }))
    //   expect(min).toBe(46)
    //   // console.log(part2_2(getPuzzleInput('day5/input')))
    // })

    // it.only('location2Seeds', () => {
    //   const data = reverseMappingInData(
    //     extractData(getPuzzleInput('day5/sampleInput'))
    //   )
    //   const possibleSeeds = location2Seeds(data)
    //   expect(possibleSeeds.includes(13)).toBe(true)
    //   expect(possibleSeeds).toContain(13)
    // })

    // it.only('reverse - data reveresed into locationToSeed', () => {
    //   const data = reverseMappingInData(
    //     extractData(getPuzzleInput('day5/sampleInput'))
    //   )
    //   const allSeeds = extractSeedsFromRanges(data.seeds)
    //   const possibleSeeds = location2Seeds(data)
    //   const validSeeds = possibleSeeds.filter((seed) => allSeeds.includes(seed))
    //   // seed 13 is the seed that is closest

    //   const possibleLocations = seedToLocation({ ...data, seeds: validSeeds })
    //   const min = Math.min(possibleLocations)
    //   expect(min).toBe(46)
    // })

    it('location2Seeds works correctly', () => {
      const data = reverseMappingInData(
        extractData(getPuzzleInput('day5/sampleInput'))
      )
      const possibleSeeds = location2Seeds([46, 45, 47], data)

      expect(possibleSeeds).toContain(82)
    })

    it('seedToLocation works correctly', () => {
      const data = extractData(getPuzzleInput('day5/sampleInput'))

      const location = seedToLocation(data)
      expect(location).toBe(35)
    })

    it('reversed works correctly all the way', () => {
      const data = extractData(getPuzzleInput('day5/sampleInput'))
      const reversedData = reverseMappingInData(data)

      const initialLocations = []
      for (let i = 1; i < 101; i++) {
        initialLocations.push(i)
      }
      const allSeeds = extractSeedsFromRanges(data.seeds)
      const possibleSeeds = location2Seeds(
        initialLocations,
        reversedData
      ).filter((seed) => allSeeds.includes(seed))
      const location = seedToLocation({ ...data, seeds: possibleSeeds })
      expect(location).toBe(46)
    })

    it('extracting locations... does not seem to work :_(', () => {
      const data = extractData(getPuzzleInput('day5/sampleInput'))
      const reversedData = reverseMappingInData(data)

      const initialLocations = extractLocations(
        data['humidity-to-location']
      ).sort((a, b) => a - b)
      const possibleSeeds = location2Seeds(initialLocations, reversedData)

      const start = data.seeds[0]
      const offset = data.seeds[1]
      for (let i = start; i < start + offset; i++) {
        const seed = data.seeds[0] + i
      }
      const allSeeds = extractSeedsFromRanges(data.seeds)
      const temp = possibleSeeds.filter((seed) => allSeeds.includes(seed))
      const location = seedToLocation({ ...data, seeds: temp })
      expect(location).toBe(46)
    })

    it('not sure what this is', () => {
      const data = extractData(getPuzzleInput('day5/input'))
      let lowest = Infinity

      for (let s = 0; s < data.seeds.length; s += 2) {
        const start = data.seeds[s]
        const offset = data.seeds[s + 1]
        for (let i = start; i < start + offset; i++) {
          const seed = data.seeds[0] + i
          const location = seedToLocation({ ...data, seeds: [seed] })
          if (location < lowest) {
            lowest = location
            console.log('lowest is now:', lowest)
          }
        }
      }
      // expect(lowest).toBe(46)
      console.log('lowest', lowest)
    })
    // 3155614530
    // 2203588168
    // 1275815384
    // 793980143
    // 583689036 is too high
    // 537243046
    // 20283860

    // 157038976 is wrong
    // 662730 is wrong
    it.only('sort locations smallest to largest and find the seed', () => {
      const data = extractData(getPuzzleInput('day5/input'))
      const reversedData = reverseMappingInData(data)

      const sortedLocations = reversedData['humidity-to-location'].sort(
        (a, b) => {
          return a.src - b.src
        }
      )

      let lowest = Infinity
      const seedCandidates = sortedLocations
        .map((loc) => {
          for (let i = loc.dest; i < loc.dest + loc.len; i++) {
            const seed = loc.dest + i
            const location = seedToLocation({ ...data, seeds: [seed] })
            if (location < lowest) {
              lowest = location
              console.log(
                `${new Date().getHours()}:${new Date().getMinutes()}`,
                'lowest is now:',
                lowest
              )
            }
          }
        })
        .flat()
      // const location = seedToLocation({ ...data, seeds: seedCandidates })
      // console.log('location', location)
    })

    it.skip('for real now', () => {
      // skipping because it doesn't work
      const data = extractData(getPuzzleInput('day5/input'))
      const reversedData = reverseMappingInData(data)

      const initialLocations = []
      for (let i = 1; i < 101; i++) {
        initialLocations.push(i)
      }
      const allSeeds = extractSeedsFromRanges(data.seeds)
      const possibleSeeds = location2Seeds(
        initialLocations,
        reversedData
      ).filter((seed) => allSeeds.includes(seed))
      const location = seedToLocation({ ...data, seeds: possibleSeeds })
      console.log('location', location)
    })

    it.skip('for real now', () => {
      const data = extractData(getPuzzleInput('day5/input'))
      const reversedData = reverseMappingInData(data)

      const initialLocations = []
      for (let i = 1; i < 101; i++) {
        initialLocations.push(i)
      }
      // const allSeeds = extractSeedsFromRanges(data.seeds)
      for (let i = 0; i < data.seeds.length; i += 2) {
        for (let j = 0; j < data.seeds[i + 1]; j++) {
          // seeds.push(data.seeds[i] + j)
          const seedUnderTest = data.seeds[i] + j
          const possibleSeeds = location2Seeds(
            initialLocations,
            reversedData
          ).filter((seed) => seedUnderTest === seed)
          const location = seedToLocation({ ...data, seeds: possibleSeeds })
          console.log('location', location)
        }
      }
    })

    // it('reverse - data normal into seedToLocation', () => {
    //   const data = extractData(getPuzzleInput('day5/input'))
    //   const possibleSeeds = data['humidity-to-location'].map((mapping) => {
    //     const seed = seedToLocation(data)
    //     return seed
    //   })
    //   // console.log('possibleSeeds', possibleSeeds)

    //   const min = Math.min(...possibleSeeds)
    //   expect(min).toBe(46)
    // })

    // it('reverse - data reversed into seedToLocation', () => {
    //   const data = reverseMappingInData(
    //     extractData(getPuzzleInput('day5/sampleInput'))
    //   )
    //   const possibleSeeds = data['humidity-to-location'].map((mapping) => {
    //     const seed = seedToLocation(data)
    //     return seed
    //   })
    //   // console.log('possibleSeeds', possibleSeeds)

    //   const min = Math.min(...possibleSeeds)
    //   expect(min).toBe(46)
    // })
  })
})
