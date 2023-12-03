export interface Point<T> {
  x: number
  y: number
  z?: number
  value?: T | string
}
// export type PointRow = Point[]
// export type PointGrid = PointRow[]

export type Row<T> = Point<T>[]
export type Grid<T> = Row<T>[]
