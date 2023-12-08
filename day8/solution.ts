/*
--- Day 8: Haunted Wasteland ---
One of the camel's pouches is labeled "maps" - sure enough, it's full of documents (your puzzle input) about how to navigate the desert. At least, you're pretty sure that's what they are; one of the documents contains a list of left/right instructions, and the rest of the documents seem to describe some kind of network of labeled nodes.

It seems like you're meant to use the left/right instructions to navigate the network. Perhaps if you have the camel follow the same instructions, you can escape the haunted wasteland!

After examining the maps for a bit, two nodes stick out: AAA and ZZZ. You feel like AAA is where you are now, and you have to follow the left/right instructions until you reach ZZZ.

This format defines each node of the network individually. For example:

RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
Starting with AAA, you need to look up the next element based on the next left/right instruction in your input. In this example, start with AAA and go right (R) by choosing the right element of AAA, CCC. Then, L means to choose the left element of CCC, ZZZ. By following the left/right instructions, you reach ZZZ in 2 steps.

Of course, you might not find ZZZ right away. If you run out of left/right instructions, repeat the whole sequence of instructions as necessary: RL really means RLRLRLRLRLRLRLRL... and so on. For example, here is a situation that takes 6 steps to reach ZZZ:

LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
Starting at AAA, follow the left/right instructions. How many steps are required to reach ZZZ?
*/

const extractData = (input: string) => {
  const [directions, map] = input.split('\n\n')
  const lines = map.split('\n').map((line) => line.split(' = '))
  return {
    directions,
    map: lines.map((line) => {
      const [node, value] = line
      const leftRight = value.replace(/[\(\)]/g, '').split(', ')
      return {
        name: node,
        L: leftRight[0],
        R: leftRight[1],
      }
    }),
  }
}

export const part1 = (input: string): number => {
  const data = extractData(input)
  const directions = data.directions.split('')
  const start = data.map.find((line) => line.name === 'AAA') || {
    name: '',
    L: '',
    R: '',
  }

  let steps = 0
  let index = 0
  let current = start
  while (current.name !== 'ZZZ') {
    const direction = directions[index++ % directions.length]
    ;(current = data.map.find((line) =>
      direction === 'L' ? line.name === current.L : line.name === current.R
    ) || {
      name: '',
      L: '',
      R: '',
    }),
      steps++
  }
  return steps
}

/*
--- Part Two ---
After examining the maps a bit longer, your attention is drawn to a curious fact: the number of nodes with names ending in A is equal to the number ending in Z! If you were a ghost, you'd probably just start at every node that ends with A and follow all of the paths at the same time until they all simultaneously end up at nodes that end with Z.

For example:

LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
Here, there are two starting nodes, 11A and 22A (because they both end with A). As you follow each left/right instruction, use that instruction to simultaneously navigate away from both nodes you're currently on. Repeat this process until all of the nodes you're currently on end with Z. (If only some of the nodes you're on end with Z, they act like any other node and you continue as normal.) In this example, you would proceed as follows:

Step 0: You are at 11A and 22A.
Step 1: You choose all of the left paths, leading you to 11B and 22B.
Step 2: You choose all of the right paths, leading you to 11Z and 22C.
Step 3: You choose all of the left paths, leading you to 11B and 22Z.
Step 4: You choose all of the right paths, leading you to 11Z and 22B.
Step 5: You choose all of the left paths, leading you to 11B and 22C.
Step 6: You choose all of the right paths, leading you to 11Z and 22Z.
So, in this example, you end up entirely on nodes that end in Z after 6 steps.

Simultaneously start on every node that ends with A. How many steps does it take before you're only on nodes that end with Z?
*/

export const part2 = (input: string) => {
  const data = extractData(input)
  const directions = data.directions.split('')
  const start = data.map.filter((line) => line.name[2] === 'A') || []

  const temp = start.map((track) => {
    let steps = 0
    let index = 0
    let currentNode = track
    while (currentNode.name[2] !== 'Z') {
      const direction = directions[index++ % directions.length]

      const newNode = data.map.find((line) =>
        direction === 'L'
          ? line.name === currentNode.L
          : line.name === currentNode.R
      ) || {
        name: '',
        L: '',
        R: '',
      }
      currentNode = newNode
      steps++
    }
    return steps
  })
  console.log(temp)
  return temp.reduce(lcm)
  // return temp.reduce((acc, val) => acc * val, 1)
  // 22103062509257 is correct (22,103,062,509,257) (taken the logged values of temp and input into a lowest common multiple calculator)
}

function lcm(a: number, b: number): number {
  let temp = a
  while (true) {
    if (temp % b === 0 && temp % a === 0) return temp
    temp++
  }
}
