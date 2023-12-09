/*
--- Day 9: Mirage Maintenance ---
You pull out your handy Oasis And Sand Instability Sensor and analyze your surroundings. The OASIS produces a report of many values and how they are changing over time (your puzzle input). Each line in the report contains the history of a single value. For example:

0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
To best protect the oasis, your environmental report should include a prediction of the next value in each history. To do this, start by making a new sequence from the difference at each step of your history. If that sequence is not all zeroes, repeat this process, using the sequence you just generated as the input sequence. Once all of the values in your latest sequence are zeroes, you can extrapolate what the next value of the original history should be.

In the above dataset, the first history is 0 3 6 9 12 15. Because the values increase by 3 each step, the first sequence of differences that you generate will be 3 3 3 3 3. Note that this sequence has one fewer value than the input sequence because at each step it considers two numbers from the input. Since these values aren't all zero, repeat the process: the values differ by 0 at each step, so the next sequence is 0 0 0 0. This means you have enough information to extrapolate the history! Visually, these sequences can be arranged like this:

0   3   6   9  12  15
  3   3   3   3   3
    0   0   0   0
To extrapolate, start by adding a new zero to the end of your list of zeroes; because the zeroes represent differences between the two values above them, this also means there is now a placeholder in every sequence above it:

0   3   6   9  12  15   B
  3   3   3   3   3   A
    0   0   0   0   0
You can then start filling in placeholders from the bottom up. A needs to be the result of increasing 3 (the value to its left) by 0 (the value below it); this means A must be 3:

0   3   6   9  12  15   B
  3   3   3   3   3   3
    0   0   0   0   0
Finally, you can fill in B, which needs to be the result of increasing 15 (the value to its left) by 3 (the value below it), or 18:

0   3   6   9  12  15  18
  3   3   3   3   3   3
    0   0   0   0   0
So, the next value of the first history is 18.

Finding all-zero differences for the second history requires an additional sequence:

1   3   6  10  15  21
  2   3   4   5   6
    1   1   1   1
      0   0   0
Then, following the same process as before, work out the next value in each sequence from the bottom up:

1   3   6  10  15  21  28
  2   3   4   5   6   7
    1   1   1   1   1
      0   0   0   0
So, the next value of the second history is 28.

The third history requires even more sequences, but its next value can be found the same way:

10  13  16  21  30  45  68
   3   3   5   9  15  23
     0   2   4   6   8
       2   2   2   2
         0   0   0
So, the next value of the third history is 68.

If you find the next value for each history in this example and add them together, you get 114.

Analyze your OASIS report and extrapolate the next value for each history. What is the sum of these extrapolated values?
*/

const toNumbers = (input: string) =>
  input.split(' ').map((num) => parseInt(num, 10))

export const part1 = (input: string) => {
  const data = input.split('\n').map(toNumbers)
  const differences = data.map((line) => {
    const diffs = calcNextValue(line)
    return diffs
  })
  return differences.reduce((acc, line) => {
    const idk = line.reduce((sum, arr) => {
      return sum + arr[arr.length - 1]
    }, 0)

    return acc + idk
  }, 0)
}

export const calcDifferences = (input: number[]) => {
  const difference = input?.map((num, index) => {
    if (index + 1 < input.length) {
      return input[index + 1] - num
    } else {
      return undefined
    }
  })
  return difference?.filter((num): num is number => num !== undefined)
}

export const calcNextValue = (input: number[]) => {
  const historyCascade: number[][] = [input]
  let i = 0
  let processing = true
  while (processing) {
    const diffs = calcDifferences(i === 0 ? input : historyCascade[i])
    historyCascade.push(diffs)
    processing = !diffs?.every((num) => num === 0)
    i += 1
  }
  return historyCascade
}

export const part2 = (input: string) => {
  const data = input.split('\n').map(toNumbers)
  const differences = data.map((line) => {
    const diffs = calcNextValue(line.reverse())
    return diffs
  })
  return differences.reduce((acc, line) => {
    const idk = line.reduce((sum, arr) => {
      return sum + arr[arr.length - 1]
    }, 0)

    return acc + idk
  }, 0)
}
/*
--- Part Two ---
Of course, it would be nice to have even more history included in your report. Surely it's safe to just extrapolate backwards as well, right?

For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the beginning of your sequence of zeroes, then fill in new first values for each previous sequence.

In particular, here is what the third example history looks like when extrapolating back in time:

5  10  13  16  21  30  45
  5   3   3   5   9  15
   -2   0   2   4   6
      2   2   2   2
        0   0   0
Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: 5.

Doing this for the remaining example data above results in previous values of -3 for the first history and 0 for the second history. Adding all three new values together produces 2.

Analyze your OASIS report again, this time extrapolating the previous value for each history. What is the sum of these extrapolated values?
*/
