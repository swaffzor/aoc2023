export interface Point<T> {
  col: number
  row: number
  z?: number
  value?: T | string
}
export type Row<T> = Point<T>[]
export type PointGrid<T> = Row<T>[]

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
export interface Grid<T> {
  nodes: Location<T>[]
  neighbors: (id: string) => Point<T>[] // id is a string of the form "col,row"
}

export interface GraphS {
  nodes: Record<string, string>
  edges?: Record<string, string[]>
  neighbors: (id: string, ignoreWalls?: boolean) => Record<string, string> // id is a string of the form "col,row"
}
export interface Graph<T> {
  nodes: Record<string, Location<T>>
  edges?: (pointID: string) => Record<string, Location<T>>
  neighbors: (id: string, ignoreWalls?: boolean) => Record<string, Location<T>> // id is a string of the form "col,row"
}

export interface SquareGrid<T> extends Graph<T> {
  width: number
  height: number
  walls: Set<string>
  inBounds: (point: Point<T>) => boolean
  isValid: (point: Point<T>) => boolean
}

export interface WeightedGraph<T> extends Graph<T> {
  cost: (from: Location<T>, to: Location<T>, cost: number) => number
}

export interface WeightedGrid<T> extends SquareGrid<T> {
  weights: Record<string, number>
  cost: (from: Location<T>, to: Location<T>, cost: number) => number
}

export interface PriorityQueue<T> {
  elements: [T, number][]
  push: (item: T, priority: number) => void
  pop: () => T | undefined
  size: () => number
}

export type Direction = '^' | '>' | 'v' | '<'
