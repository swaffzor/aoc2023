import fs from 'fs'
import { getPuzzleInput } from '../utils'
/*
--- Day 5: If You Give A Seed A Fertilizer ---

The almanac (your puzzle input) lists all of the seeds that need to be planted. It also lists what type of soil to use with each kind of seed, what type of fertilizer to use with each kind of soil, what type of water to use with each kind of fertilizer, and so on. Every type of seed, soil, fertilizer and so on is identified with a number, but numbers are reused by each category - that is, soil 123 and fertilizer 123 aren't necessarily related to each other.

For example:

seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
The almanac starts by listing which seeds need to be planted: seeds 79, 14, 55, and 13.

The rest of the almanac contains a list of maps which describe how to convert numbers from a source category into numbers in a destination category. That is, the section that starts with seed-to-soil map: describes how to convert a seed number (the source) to a soil number (the destination). This lets the gardener and his team know which soil to use with which seeds, which water to use with which fertilizer, and so on.

Rather than list every source number and its corresponding destination number one by one, the maps describe entire ranges of numbers that can be converted. Each line within a map contains three numbers: the destination range start, the source range start, and the range length.

Consider again the example seed-to-soil map:

50 98 2
52 50 48
The first line has a destination range start of 50, a source range start of 98, and a range length of 2. This line means that the source range starts at 98 and contains two values: 98 and 99. The destination range is the same length, but it starts at 50, so its two values are 50 and 51. With this information, you know that seed number 98 corresponds to soil number 50 and that seed number 99 corresponds to soil number 51.

The second line means that the source range starts at 50 and contains 48 values: 50, 51, ..., 96, 97. This corresponds to a destination range starting at 52 and also containing 48 values: 52, 53, ..., 98, 99. So, seed number 53 corresponds to soil number 55.

Any source numbers that aren't mapped correspond to the same destination number. So, seed number 10 corresponds to soil number 10.

So, the entire list of seed numbers and their corresponding soil numbers looks like this:

seed  soil
0     0
1     1
...   ...
48    48
49    49
50    52
51    53
...   ...
96    98
97    99
98    50
99    51
With this map, you can look up the soil number required for each initial seed number:

Seed number 79 corresponds to soil number 81.
Seed number 14 corresponds to soil number 14.
Seed number 55 corresponds to soil number 57.
Seed number 13 corresponds to soil number 13.
The gardener and his team want to get started as soon as possible, so they'd like to know the closest location that needs a seed. Using these maps, find the lowest location number that corresponds to any of the initial seeds. To do this, you'll need to convert each seed number through other categories until you can find its corresponding location number. In this example, the corresponding types are:

Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
So, the lowest location number in this example is 35.

What is the lowest location number that corresponds to any of the initial seed numbers?

*/
type MapRanges = { dest: number; src: number; len: number }
type Map = {
  [key in Mapping]: MapRanges[]
}
type Mapping =
  | 'seed-to-soil'
  | 'soil-to-fertilizer'
  | 'fertilizer-to-water'
  | 'water-to-light'
  | 'light-to-temperature'
  | 'temperature-to-humidity'
  | 'humidity-to-location'

interface MapSet {
  seeds: number[]
  'seed-to-soil': MapRanges[]
  'soil-to-fertilizer': MapRanges[]
  'fertilizer-to-water': MapRanges[]
  'water-to-light': MapRanges[]
  'light-to-temperature': MapRanges[]
  'temperature-to-humidity': MapRanges[]
  'humidity-to-location': MapRanges[]
}

export const extractData = (input: string): MapSet => {
  const lines = input.split('\n')
  const seeds = lines[0].split(': ')[1].split(' ').map(Number)
  let mappings: Map = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
  }
  let currentMapping = '' as Mapping
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line === '') continue
    if (line.includes(':')) {
      currentMapping = line.split(' map:')[0] as Mapping
      mappings = {
        ...mappings,
        [currentMapping]: [],
      }
    } else {
      const [dest, src, len] = line.split(' ').map(Number)
      mappings[currentMapping].push({ dest, src, len })
    }
  }

  return {
    seeds,
    ...mappings,
  }
}

const convert = (
  input: number,
  mappings: { dest: number; src: number; len: number }[]
): number => {
  for (let i = 0; i < mappings.length; i++) {
    const { dest, src, len } = mappings[i]
    if (input >= src && input < src + len) {
      return dest + (input - src)
    }
  }
  return input
}

export const part1 = (input: string): number =>
  seedToLocation(extractData(input))

export const seedToLocation = (data: MapSet): number => {
  const soil = data.seeds.map((seed) => convert(seed, data['seed-to-soil']))
  const fertilizer = soil.map((soil) =>
    convert(soil, data['soil-to-fertilizer'])
  )
  const water = fertilizer.map((fertilizer) =>
    convert(fertilizer, data['fertilizer-to-water'])
  )
  const light = water.map((water) => convert(water, data['water-to-light']))
  const temperature = light.map((light) =>
    convert(light, data['light-to-temperature'])
  )
  const humidity = temperature.map((temperature) =>
    convert(temperature, data['temperature-to-humidity'])
  )
  const location = humidity.map((humidity) =>
    convert(humidity, data['humidity-to-location'])
  )
  return Math.min(...location)
}

/*
--- Part Two ---

Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

seeds: 79 14 55 13
This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
*/
// export const part2_2 = (input: string): number => {
//   const data = extractData(input)
//   // const data = reverseMappingInData(extractData(input))
//   const possibleSeeds = data['humidity-to-location'].map((mapping) => {
//     const seed = locationToSeed(data, mapping.dest)
//     return seed
//   })
//   console.log('possibleSeeds', possibleSeeds)

//   const min = Math.min(seedToLocation({ ...data, seeds: possibleSeeds }))
//   return min
// }

export const part2 = (input: string): number => {
  // const data = extractData(input)
  // extractSeedsFromRanges(data.seeds)
  // const newData = getPuzzleInput('day5/seeds')
  //   .split('\n')
  //   .map((item) => parseInt(item))
  //   .filter(Number)
  // const temp = seedToLocation({ ...data, seeds: newData })
  // return temp
  return -1
}

export const extractSeedsFromRanges = (input: number[]) => {
  const seeds = [] as number[]
  for (let i = 0; i < input.length; i += 2) {
    for (let j = 0; j < input[i + 1]; j++) {
      // fs.appendFileSync('day5/seeds.txt', `${input[i] + j}\n`)
      seeds.push(input[i] + j)
    }
  }
  return seeds
}

const swapDestAndSrc = (mapping: MapRanges[]): MapRanges[] => {
  return mapping.map((m) => {
    return { dest: m.src, src: m.dest, len: m.len }
  })
}

export const reverseMappingInData = (data: MapSet): MapSet => {
  return {
    ...data,
    'seed-to-soil': swapDestAndSrc(data['seed-to-soil']),
    'soil-to-fertilizer': swapDestAndSrc(data['soil-to-fertilizer']),
    'fertilizer-to-water': swapDestAndSrc(data['fertilizer-to-water']),
    'water-to-light': swapDestAndSrc(data['water-to-light']),
    'light-to-temperature': swapDestAndSrc(data['light-to-temperature']),
    'temperature-to-humidity': swapDestAndSrc(data['temperature-to-humidity']),
    'humidity-to-location': swapDestAndSrc(data['humidity-to-location']),
  }
}

// write a function called locationToSeed that takes a location and returns the seed that corresponds to it. the reverse of seedToLocation
// export const locationToSeed = (data: MapSet, location: number): number => {
//   const humidity = convert(location, data['humidity-to-location'])
//   const temperature = convert(humidity, data['temperature-to-humidity'])
//   const light = convert(temperature, data['light-to-temperature'])
//   const water = convert(light, data['water-to-light'])
//   const fertilizer = convert(water, data['fertilizer-to-water'])
//   const soil = convert(fertilizer, data['soil-to-fertilizer'])
//   const seed = convert(soil, data['seed-to-soil'])
//   return seed
// }

export const location2Seeds = (locations: number[], data: MapSet): number[] => {
  // the lowest location number can be obtained from seed number 82
  // location 46

  // humidity 46,
  const humidity = locations.map((location) => {
    return convert(location, data['humidity-to-location'])
  })
  // temperature 45,
  const temperature = humidity.map((mapping) =>
    convert(mapping, data['temperature-to-humidity'])
  )
  // light 77,
  const light = temperature.map((mapping) =>
    convert(mapping, data['light-to-temperature'])
  )
  // water 84,
  const water = light.map((mapping) => convert(mapping, data['water-to-light']))
  // fertilizer 84,
  const fertilizer = water.map((mapping) =>
    convert(mapping, data['fertilizer-to-water'])
  )
  // soil 84,
  const soil = fertilizer.map((mapping) =>
    convert(mapping, data['soil-to-fertilizer'])
  )
  // seed 82,
  const seeds = soil.map((mapping) => convert(mapping, data['seed-to-soil']))
  return seeds
}

export const extractLocations = (locations: MapRanges[]): number[] => {
  const temp = locations.flatMap((mapping) => {
    const { dest, src, len } = mapping
    return [...Array(len).keys()].map((i) => dest + i)
  })
  return temp
}
