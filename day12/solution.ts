/*
--- Day 12: Hot Springs ---
There's just one problem - many of the springs have fallen into disrepair, so they're not actually sure which springs would even be safe to use! Worse yet, their condition records of which springs are damaged (your puzzle input) are also damaged! You'll need to help them repair the damaged records.

In the giant field just outside, the springs are arranged into rows. For each row, the condition records show every spring and whether it is operational (.) or damaged (#). This is the part of the condition records that is itself damaged; for some springs, it is simply unknown (?) whether the spring is operational or damaged.

However, the engineer that produced the condition records also duplicated some of this information in a different format! After the list of springs for a given row, the size of each contiguous group of damaged springs is listed in the order those groups appear in the row. This list always accounts for every damaged spring, and each number is the entire size of its contiguous group (that is, groups are always separated by at least one operational spring: #### would always be 4, never 2,2).

So, condition records with no unknown spring conditions might look like this:

#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1
However, the condition records are partially damaged; some of the springs' conditions are actually unknown (?). For example:

???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
Equipped with this information, it is your job to figure out how many different arrangements of operational and broken springs fit the given criteria in each row.

In the first line (???.### 1,1,3), there is exactly one way separate groups of one, one, and three broken springs (in that order) can appear in that row: the first three unknown springs must be broken, then operational, then broken (#.#), making the whole row #.#.###.

The second line is more interesting: .??..??...?##. 1,1,3 could be a total of four different arrangements. The last ? must always be broken (to satisfy the final contiguous group of three broken springs), and each ?? must hide exactly one of the two broken springs. (Neither ?? could be both broken springs or they would form a single contiguous group of two; if that were true, the numbers afterward would have been 2,3 instead.) Since each ?? can either be #. or .#, there are four possible arrangements of springs.

The last line is actually consistent with ten different arrangements! Because the first number is 3, the first and second ? must both be . (if either were #, the first number would have to be 4 or higher). However, the remaining run of unknown spring conditions have many different ways they could hold groups of two and one broken springs:

?###???????? 3,2,1
.###.##.#...
.###.##..#..
.###.##...#.
.###.##....#
.###..##.#..
.###..##..#.
.###..##...#
.###...##.#.
.###...##..#
.###....##.#
In this example, the number of possible arrangements for each row is:

???.### 1,1,3 - 1 arrangement
.??..??...?##. 1,1,3 - 4 arrangements
?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
????.#...#... 4,1,1 - 1 arrangement
????.######..#####. 1,6,5 - 4 arrangements
?###???????? 3,2,1 - 10 arrangements
Adding all of the possible arrangement counts together produces a total of 21 arrangements.

For each row, count all of the different arrangements of operational and broken springs that meet the given criteria. What is the sum of those counts?
*/

interface Report {
  row: string
  groups: number[]
}

const extractData = (input: string) => {
  const rows = input.split('\n')
  const reports: Report[] = rows.map((row) => {
    const [rowString, groupsString] = row.split(' ')
    const groups = groupsString.split(',').map(Number)
    return { row: rowString, groups }
  })
  return reports
}
export const part1 = (input: string): number => {
  const data = extractData(input)
  const temp = data.map(generatePossibilities)
  return temp.reduce((acc, curr) => acc + curr, 0)
}
// ???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1

export const isValid = (record: Report) => {
  const damaged = record.row
    .split('.')
    .filter((s) => !s.includes('.') && s !== '')

  if (damaged.length !== record.groups.length) {
    return false
  }

  for (let i = 0; i < damaged.length; i++) {
    if (damaged[i].length !== record.groups[i]) {
      return false
    }
    const uut = damaged[i].split('').filter((s) => s === '#')
    const expected = record.groups[i]
    if (uut.length !== expected) {
      return false
    }
  }
  return true
}

export const memo = new Map()

export const generateMemoPossibilities = (record: Report) => {
  const { row } = record

  if (memo.has(row)) {
    return memo.get(row)
  }

  const possibilities: string[] = []

  const generateCombinations = (str: string) => {
    const index = str.indexOf('?')
    if (index === -1) {
      possibilities.push(str)
      return
    }

    generateCombinations(str.slice(0, index) + '.' + str.slice(index + 1))
    generateCombinations(str.slice(0, index) + '#' + str.slice(index + 1))
  }

  generateCombinations(row)

  const result = possibilities.reduce((acc, curr) => {
    return isValid({ ...record, row: curr }) ? acc + 1 : acc
  }, 0)

  memo.set(row, result)

  return result
}

export const generatePossibilities = (record: Report) => {
  const possibilities: string[] = []

  const generateCombinations = (str: string) => {
    const index = str.indexOf('?')
    if (index === -1) {
      possibilities.push(str)
      return
    }

    generateCombinations(str.slice(0, index) + '.' + str.slice(index + 1))
    generateCombinations(str.slice(0, index) + '#' + str.slice(index + 1))
  }

  generateCombinations(record.row)

  return possibilities.reduce((acc, curr) => {
    return isValid({ ...record, row: curr }) ? acc + 1 : acc
  }, 0)
}

/*
--- Part Two ---

As you look out at the field of springs, you feel like there are way more springs than the condition records list. When you examine the records, you discover that they were actually folded up this whole time!

To unfold the records, on each row, replace the list of spring conditions with five copies of itself (separated by '?') and replace the list of contiguous groups of damaged springs with five copies of itself (separated by ,).

So, this row:

.# 1
Would become:

.#?.#?.#?.#?.# 1,1,1,1,1
The first line of the above example:
???.### 1,1,3
would become:

???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3

In the above example, after unfolding, the number of possible arrangements for some rows is now much larger:

???.### 1,1,3 - 1 arrangement
.??..??...?##. 1,1,3 - 16384 arrangements
?#?#?#?#?#?#?#? 1,3,1,6 - 1 arrangement
????.#...#... 4,1,1 - 16 arrangements
????.######..#####. 1,6,5 - 2500 arrangements
?###???????? 3,2,1 - 506250 arrangements
After unfolding, adding all of the possible arrangement counts together produces 525152.

Unfold your condition records; what is the new sum of possible arrangement counts?
*/

export const part2 = (input: string): number => {
  const data = extractData(input)
  const unfolded = data.map(unfold)
  const temp = unfolded.map(generateMemoPossibilities)
  return temp.reduce((acc, curr) => acc + curr, 0)
}

// write a function that replace the list of spring conditions with five copies of itself (separated by ' ') and replace the list of contiguous groups of damaged springs with five copies of itself (separated by ,).
const unfold = (record: Report) => {
  const row = record.row + `?${record.row}`.repeat(4)

  const groups = JSON.parse(JSON.stringify(record.groups))
  for (let i = 0; i < 4; i++) {
    groups.push(...record.groups)
  }

  return { row, groups }
}
