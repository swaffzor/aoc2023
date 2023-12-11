/* eslint-disable no-debugger */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import { useState } from 'react'
import { Pipe, PipePoint, doTheWork } from '../../../day10/solution'
// import { getPointNeighbors } from '../../../utils'
import { floodFill } from './flood-fill'

const doIT = (grid: number[][], point: PipePoint) => {
  // const grid = [
  //   ['1', '1', '1', '1', '1', '1', '1', '1'],
  //   ['1', '1', '1', '1', '1', '1', '0', '0'],
  //   ['1', '0', '0', '1', '1', '0', '1', '1'],
  //   ['1', '2', '2', '2', '2', '0', '1', '0'],
  //   ['1', '1', '1', '2', '2', '0', '1', '0'],
  //   ['1', '1', '1', '2', '2', '2', '2', '0'],
  //   ['1', '1', '1', '1', '1', '2', '1', '1'],
  //   ['1', '1', '1', '1', '1', '2', '2', '1'],
  // ]

  // Row of the display
  const m = grid.length

  // Column of the display
  const n = grid[0].length

  // Co-ordinate provided by the user
  // const x = 4
  // const y = 4

  // Current color at that co-ordinate
  // const prevC = grid[x][y]

  // New color that has to be filled
  const newC = -2
  debugger
  const newGrid = floodFill(
    grid,
    m,
    n,
    point.col,
    point.row,
    point.distance,
    newC
  ) as number[][]
  console.log(newGrid)
  return newGrid
}

const CELL = 1
const PIXEL = 3 * CELL

const cellLayouts = `w-1 h-1`
const coloredCellStyles = (point: PipePoint) =>
  point.distance === -2 ? 'bg-cyan-200' : `bg-green-500`
const startColor = `bg-blue-700`
const dotCellStyles = `bg-red-500`

function App() {
  const [isSampleMode, setInputMode] = useState(0)
  const [count, setCount] = useState(0)

  const input = doTheWork(isSampleMode)
  const [theGrid, setTheGrid] = useState(input)

  const pieceMap = (point: PipePoint) => {
    switch (point.distance === -1 ? '.' : point.value) {
      case '.' as Pipe:
        return (
          <PipeCellDot
            size={cellLayouts}
            color={dotCellStyles}
            onClick={(isCounted) => {
              setCount((val) => val + (isCounted ? 1 : -1))
              const newGrid = doIT(
                theGrid.map((row) => row.map((point) => point.distance)),
                point
              )
              // setTheGrid(newGrid)
              // set the distance to -2 if
              // const temp = getPointNeighbors(point, input)
            }}
          />
        )
      case 'L':
        return (
          <PipeCellL
            size={cellLayouts}
            color={coloredCellStyles(point)}
          />
        )
      case '|':
        return (
          <PipeCellVert
            size={cellLayouts}
            color={coloredCellStyles(point)}
          />
        )
      case 'S':
        return (
          <PipeCellStart
            size={cellLayouts}
            color={startColor}
          />
        )
      case 'F':
        return (
          <PipeCellF
            size={cellLayouts}
            color={coloredCellStyles(point)}
          />
        )
      case '7':
        return (
          <PipeCell7
            size={cellLayouts}
            color={coloredCellStyles(point)}
          />
        )
      case '-':
        return (
          <PipeCellHoriz
            size={cellLayouts}
            color={coloredCellStyles(point)}
          />
        )
      case 'J':
        return (
          <PipeCellJ
            size={cellLayouts}
            color={coloredCellStyles(point)}
          />
        )
      default:
        return <PipeCellBlank />
    }
  }
  return (
    <div
      key="idk"
      className="justify-start "
    >
      <div className="sticky flex justify-start top-2">
        <button
          className="p-2 bg-purple-500 rounded-sm hover:bg-purple-300 active:bg-purple-700"
          onClick={() => setInputMode((val) => val + 1)}
        >
          change input
        </button>
        <div className="flex flex-wrap content-center p-2 mx-4 bg-purple-500 border-2 rounded-sm ">
          count: {count}
        </div>
      </div>

      {/* <div className={`grid grid-cols-3 grid-rows-3 bg-gray-100`}>
        <PipeCellF />
        <PipeCellHoriz />
        <PipeCell7 />
        <PipeCellVert />
        <PipeCellBlank />
        <PipeCellVert />
        <PipeCellL />
        <PipeCellHoriz />
        <PipeCellJ />
      </div> */}
      {input.map((rowValue, row) => (
        <>
          <div
            className="flex"
            key={`${row}-row`}
          >
            {rowValue.map((pipePoint, col) => {
              return (
                <div key={`${pipePoint.row}${pipePoint.col}-col`}>
                  {pieceMap(pipePoint)}
                </div>
              )
            })}
          </div>
        </>
      ))}
    </div>
  )
}

export default App

interface PipeCellProps {
  color?: string
  size?: string
  misc?: string
  grid?: PipePoint[][]
  onClick?: (isCounted: boolean) => void
}
const PipeCellF = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}

const PipeCell7 = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}

const PipeCellHoriz = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}

const PipeCellL = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}
const PipeCellJ = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}
const PipeCellVert = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}
const PipeCellDot = ({ color, size, misc, grid, onClick }: PipeCellProps) => {
  const [isCounted, setIsCounted] = useState(false)
  const handleClick = () => {
    setIsCounted(!isCounted)
    onClick && onClick(!isCounted)
  }
  return (
    <>
      <div
        className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}
        onClick={handleClick}
      >
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div
          className={[size, misc, isCounted ? 'bg-purple-700' : color].join(
            ' '
          )}
        ></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}
const PipeCellBlank = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3`}>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}
const PipeCellStart = ({ color, size, misc, onClick }: PipeCellProps) => {
  return (
    <>
      <div
        className={`grid w-${PIXEL} h-${PIXEL} grid-cols-3 grid-rows-3 ${startColor}`}
      >
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc, color].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
        <div className={[size, misc].join(' ')}></div>
      </div>
    </>
  )
}
// 58 is not right
// 59 is not right
// 336 is too low
// 337 is CORRECT
