/* 
As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
*/
export const part1 = (input: string) => {
  const inputLines = input.split('\n')
  const calibrationValues = inputLines.map((line) => {
    const first = line.split('').find((char) => Number(char))
    const last = line
      .split('')
      .reverse()
      .find((char) => Number(char))
    return Number(`${first}${last}`)
  })

  const total = calibrationValues.reduce((acc, curr) => acc + curr, 0)
  return total
}

/*
--- Part Two ---

Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/
export const part2 = (input: string) => {
  const inputLines = input.split('\n')
  const idk = inputLines.map((line) => {
    const first = getFirstDigit(line)
    const last = getLastDigit(line)
    const solution = Number(`${first}${last}`)
    return solution
  })
  return idk.reduce((acc, curr) => acc + curr, 0)
}

export const getFirstDigit = (line: string) => {
  const digitMap: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }
  const digitKeys = Object.entries(digitMap)
  const firstNumberIndex = line.split('').findIndex((char) => Number(char))
  const firstArray: Record<number, number>[] = []
  digitKeys.forEach((digit) => {
    const maths = line.indexOf(digit[0])
    if (maths >= 0) {
      firstArray.push([maths, digit[1]])
    }
  })
  const firstIndex = firstArray.sort((a, b) => a[0] - b[0])[0]
  const includesNumerals = firstNumberIndex >= 0
  const first =
    includesNumerals && firstNumberIndex < firstIndex[0]
      ? Number(line[firstNumberIndex])
      : firstIndex[1]
  return first
}

export const getLastDigit = (line: string) => {
  const digitMap: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }
  const digitKeys = Object.entries(digitMap)
  const firstNumberIndex =
    line.length -
    line
      .split('')
      .reverse()
      .findIndex((char) => Number(char)) -
    1
  const firstArray: Record<number, number>[] = []
  digitKeys.forEach((digit) => {
    const maths = line.indexOf(digit[0])
    if (maths >= 0) {
      firstArray.push([maths, digit[1]])
    }
  })
  const firstIndex = firstArray.sort((a, b) => b[0] - a[0])[0]
  const includesNumerals = firstNumberIndex !== line.length
  const first =
    includesNumerals && firstNumberIndex > firstIndex[0]
      ? Number(line[firstNumberIndex])
      : firstIndex[1]
  return first
}

// export const part2Try1 = (input: string) => {
//   const digitMap = [
//     { word: 'one', value: 1 },
//     { word: 'two', value: 2 },
//     { word: 'three', value: 3 },
//     { word: 'four', value: 4 },
//     { word: 'five', value: 5 },
//     { word: 'six', value: 6 },
//     { word: 'seven', value: 7 },
//     { word: 'eight', value: 8 },
//     { word: 'nine', value: 9 },
//   ]
//   const inputLines = input.split('\n')
//   const calibrationValues = inputLines.map((line) => {
//     const wordMap = digitMap.map((digit) => digit.word)
//     const firstNumberIndex = line.split('').findIndex((char) => Number(char))

//     const firstWordValue = wordMap.findIndex((word) => line.includes(word)) + 1
//     const firstWordIndex = line.indexOf(wordMap[firstWordValue - 1])
//     const first =
//       firstNumberIndex <= firstWordIndex
//         ? line[firstNumberIndex]
//         : firstWordValue
//     //figure out the index the first number is at in the line

//     const last = 0
//     return Number(`${first}${last}`)
//   })

//   const total = calibrationValues.reduce((acc, curr) => acc + curr, 0)
//   return total
// }
