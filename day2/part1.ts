/*
For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
*/

export type Roll = {
  red?: number
  green?: number
  blue?: number
}
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
export const extractData = (input: string) => {
  const lines = input.split('\n')
  const temp = lines.map((line): { game: number; rolls: Roll[][] } => {
    const [game, ...rolls] = line.split(': ')
    return {
      game: Number(game.split(' ')[1]),
      // rolls: rolls.flatMap((roll) => roll.split('; ')),
      // assign to rolls an array of objects where one object has the color as it's key and the count as it's value
      // ex: [{ blue: 3, red: 4 }, { red: 1, green: 2, blue: 6 }, { green: 2 }]
      rolls: rolls.map((roll) => {
        // rolls: "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        const rollColorCounts = roll.split('; ')
        return rollColorCounts.map((rollColorCount) => {
          // rollColorCount: "3 blue, 4 red"
          const colorAndCountArr = rollColorCount.split(', ')
          return colorAndCountArr.reduce((acc, colorAndCount) => {
            const [count, color] = colorAndCount.split(' ')
            return {
              ...acc,
              [color.replace(',', '')]: parseInt(count),
            } as Roll
          }, {} as Roll)
        })
      }),
    }
  })
  // console.log('temp: ', temp)
  return temp
}
/*
[
  {
    game: "1",
    rolls: [
      [
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
      ],
    ],
  },
  ...
]
*/

export const part1 = (input: string) => {
  const gameData = extractData(input)
  const possibleGames = gameData
    .map((game) => {
      const { rolls } = game
      return rolls.flatMap((roll) => {
        return roll.every((colorCount) =>
          isGamePossible(colorCount.red, colorCount.green, colorCount.blue)
        )
      })
    })
    .flat()
  const sum = possibleGames.reduce((acc, possibleGame, index) => {
    return acc + (possibleGame ? index + 1 : 0)
  }, 0)
  return sum
}

// The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
const RED_MAX = 12
const GREEN_MAX = 13
const BLUE_MAX = 14
export const isGamePossible = (red?: number, green?: number, blue?: number) => {
  return (
    (red || 0) <= RED_MAX &&
    (green || 0) <= GREEN_MAX &&
    (blue || 0) <= BLUE_MAX
  )
}

/*
--- Part Two ---

The Elf says they've stopped producing snow because they aren't getting any water! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!

As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

Again consider the example games from earlier:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
Game 4 required at least 14 red, 3 green, and 15 blue cubes.
Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.

The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
*/

export const part2 = (input: string) => {
  const gameData = extractData(input)
  const fewestCubes = gameData.map((game) => calcFewestCubes(game.rolls.flat()))
  const sumOfPower = fewestCubes.reduce((acc, curr) => {
    return acc + calculatePower(curr)
  }, 0)
  return sumOfPower
}
export const calcFewestCubes = (rolls: Roll[]) => {
  const fewest = rolls.reduce((acc, roll) => {
    const red = Math.max(acc?.red || 0, roll.red || 0)
    const green = Math.max(acc?.green || 0, roll.green || 0)
    const blue = Math.max(acc?.blue || 0, roll.blue || 0)
    return {
      red,
      green,
      blue,
    }
  })
  return fewest
}

export const calculatePower = (fewest: Roll) => {
  const { red, green, blue } = fewest
  return (red || 0) * (green || 0) * (blue || 0)
}
