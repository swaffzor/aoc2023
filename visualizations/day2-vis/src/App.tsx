import React from 'react'
import './App.css'
import { extractData, Roll } from '../../../day2/part1'
import sampleInput from './sampleInput.json'
import input from './input.json'

const GRID_SIZE = 3
function App() {
  const [inputMode, setInputMode] = React.useState<'sample' | 'puzzle'>(
    'puzzle'
  )
  const [renderMode, setRenderMode] = React.useState<'static' | 'animate'>(
    'static'
  )
  const [data, setData] = React.useState<Roll[][]>([])
  const [timeTick, setTimeTick] = React.useState(0)
  const gameData = extractData(
    JSON.stringify(inputMode === 'puzzle' ? input : sampleInput)
  )
  const games = gameData[0].rolls
  const dataSource = renderMode === 'static' ? games : data

  React.useEffect(() => {
    timeTick < games.length ? setData([games[timeTick]]) : setTimeTick(0)
  }, [timeTick])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick((timeTick) => timeTick + 1)
    }, 125)

    return () => clearInterval(interval)
  }, [timeTick])

  React.useEffect(() => {
    setTimeTick(0)
  }, [renderMode, inputMode])

  const buttonStyles =
    'px-2 m-4 text-gray-400 border-2 border-gray-400 rounded-md'

  return (
    <>
      <h1 className="text-3xl">AoC 2023 day 2</h1>
      <button
        className={buttonStyles}
        onClick={() =>
          setInputMode((mode) => (mode === 'puzzle' ? 'sample' : 'puzzle'))
        }
      >
        use {inputMode === 'puzzle' ? 'sample' : 'puzzle'} data
      </button>
      <button
        className={buttonStyles}
        onClick={() =>
          setRenderMode((mode) => (mode === 'static' ? 'animate' : 'static'))
        }
      >
        set mode to {renderMode === 'static' ? 'animate' : 'static'}
      </button>
      <div className={`grid grid-cols-${GRID_SIZE}`}>
        {dataSource.map((game, index) => {
          return (
            <div
              key={`game-row-${index}`}
              className="grid m-0 border-2 border-black"
            >
              {/* Game {index + 1} {JSON.stringify(game)} */}
              {game.map((rolls, index) => {
                return (
                  <PullRow
                    key={`roll-${index}`}
                    pulls={rolls}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App

interface TempComponentProps {
  pulls: Roll
}

const PullRow = ({ pulls }: TempComponentProps) => {
  return (
    <div className="m-0">
      {/* <div className="flex m-0 place-content-evenly"> */}
      {/* Pull {pullIndex} */}
      <PullCell
        color={'red'}
        count={Number(pulls.red)}
      />
      <PullCell
        color={'blue'}
        count={Number(pulls.blue)}
      />
      <PullCell
        color={'green'}
        count={Number(pulls.green)}
      />
    </div>
  )
}

const PullCell = ({ color, count }: { color: string; count: number }) => {
  const sizeStyles = 'w-4 h-4 m-0'
  const dataArr = Array.from({ length: count }, (_, i) => i + 1)
  return count > 0 ? (
    <div className="flex flex-wrap justify-evenly">
      {/* <p className="w-12">{color}:</p> */}
      {dataArr?.map((_, i) => {
        return (
          <div
            key={`data-${i}`}
            className={`${sizeStyles} bg-${color}-500 transition duration-500 ease-in-out `}
          ></div>
        )
      })}
    </div>
  ) : (
    <div className={sizeStyles}></div>
  )
}
