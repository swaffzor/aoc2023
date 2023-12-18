export interface Point<T> {
  col: number
  row: number
  z?: number
  value?: T | string
}
// export type PointRow = Point[]
// export type PointGrid = PointRow[]

export type Row<T> = Point<T>[]
export type Grid<T> = Row<T>[]

export interface Location<T> extends Point<T> {
  id: string
  value: T
}

/*
https://www.redblobgames.com/pathfinding/grids/graphs.html
A mathematical graph is a set of nodes and edges. The nodes (also called vertices or objects) are connected together by the edges (also called links or connections or arrows or arcs). For any graph we need to know two things:

1) Set of nodes in the graph
2) Set of edges from each node


G-----A-----B-----F
      |     |     |
      D-----C-----E

What does the above graph look like?

Set of nodes: A B C D E F G
Set of edges from each node:
A: A→B, A→D, A→G
B: B→A, B→C, B→F
C: C→B, C→D, C→E
D: D→C, D→A
E: E→C, E→F
F: F→B, F→E
G: G→A

Graph search algorithms don’t really “understand” the layout or properties of a grid. They only understand the connectivity.

*/
export interface Graph<T> {
  neighbors: (id: string) => Point<T>[] // id is a string of the form "col,row"
}

// class SimpleGraph:
//   def __init__(self):
//     self.edges: dict[Location, list[Location]] = {}

//   def neighbors(self, id: Location) -> list[Location]:
//     return self.edges[id]
// convert this Python to TypeScript
// export class SimpleGraph<T> implements Graph<T> {
//   edges: Record<string, Point<T>[]>
//   constructor() {
//     this.edges = {}
//   }
//   neighbors(id: string) {
//     return this.edges[id]
//   }
// }

export interface SimpleGraph<T> {
  edges?: Record<string, Point<T>>
  neighbors: (id: string) => Record<string, Point<T>> // id is a string of the form "col,row"
}

export interface SquareGrid<T> {
  width: number
  height: number
  walls: Set<string>
  inBounds: (point: Point<T>) => boolean
  neighbors: (point: string) => Record<string, Point<T>> // point is a string of the form "col,row"
  // edges: (cost?: number) => Record<string, Point<T>>
}

export interface WeightedGraph<T> extends Graph<T> {
  cost: (from: Location<T>, to: Location<T>) => number
}

export interface WeightedGrid<T> extends SquareGrid<T> {
  weights: Record<string, number>
  cost: (from: Location<T>, to: Location<T>) => number
}

export interface PriorityQueue<T> {
  elements: [T, number][]
  push: (item: T, priority: number) => void
  pop: () => T | undefined
  size: () => number
}
