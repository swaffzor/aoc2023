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

export interface Graph<T> {
  neighbors: (id: string) => Point<T>[] // id is a string of the form "col,row"
}

export interface SimpleGraph<T> extends Graph<T> {
  edges?: Record<string, Point<T>[]>
}

export interface SquareGrid<T> {
  width: number
  height: number
  walls: Set<string>
  inBounds: (point: Point<T>) => boolean
  neighbors: (point: string) => Point<T>[] // point is a string of the form "col,row"
}
