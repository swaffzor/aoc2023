/* 
--- Day 25: Snowverload ---
You have nowhere near that many stars - you need to find a way to disconnect at least half of the equipment here, but it's already Christmas! You only have time to disconnect three wires.

Fortunately, someone left a wiring diagram (your puzzle input) that shows how the components are connected. For example:

jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr
Each line shows the name of a component, a colon, and then a list of other components to which that component is connected. Connections aren't directional; abc: xyz and xyz: abc both represent the same configuration. Each connection between two components is represented only once, so some components might only ever appear on the left or right side of a colon.

In this example, if you disconnect the wire between hfx/pzl, the wire between bvb/cmg, and the wire between nvd/jqt, you will divide the components into two separate, disconnected groups:

9 components: cmg, frs, lhk, lsr, nvd, pzl, qnr, rsh, and rzs.
6 components: bvb, hfx, jqt, ntq, rhn, and xhk.
Multiplying the sizes of these groups together produces 54.

Find the three wires you need to disconnect in order to divide the components into two separate groups. What do you get if you multiply the sizes of these two groups together?
*/

import { Graph, GraphS } from 'types'

export const part1 = (input: string) => {
  const edges = input.split('\n').reduce((acc, line) => {
    const [from, to] = line.split(': ')
    const iterations = to.split(' ')

    // if from does not exist as a key in acc, set its value to an empty array
    if (!acc[from]) {
      acc[from] = []
    }

    iterations.forEach((iteration) => {
      acc[from].push(iteration)

      // if iteration does not exist as a key in acc, set its value to an empty array
      if (!acc[iteration]) {
        acc[iteration] = []
      }
      acc[iteration].push(from)
    })

    return acc
  }, {} as Record<string, string[]>)

  // Nodes are unique keys in the edges record
  const nodes = Object.keys(edges)

  const neighbors = (id: string) => edges[id] // id is in the form from-to

  const temp = nodes.flatMap((node) => {
    return edges[node].map((neighbor) => {
      return `${node}-${neighbor}`
    })
  })

  const results = breadthSearch({ neighbors }, nodes[0])
  console.log(results)
}

interface MyGraph {
  neighbors: (id: string) => string[]
}

const breadthSearch = (grid: MyGraph, start: string, goal?: string) => {
  const frontier = new Set<string>()
  frontier.add('-' + start)
  const cameFrom = {} as Record<string, string>
  cameFrom[start] = '-' + start // just started, no previous point

  while (frontier.size > 0) {
    const currentCluster = frontier.values().next().value as string
    const current = currentCluster.split('-')[1]

    if (current === goal) {
      break
    }

    const neighbors = Object.values(grid.neighbors(current))

    for (const next of neighbors) {
      const nextPiece = `${current}-${next}`
      if (!(nextPiece in cameFrom)) {
        frontier.add(nextPiece)
        cameFrom[next] = nextPiece
      }
    }

    frontier.delete(currentCluster)
  }
  return cameFrom
}
