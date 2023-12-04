/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import './App.css'
import { extractData, Roll } from '../../../day2/part1'
import sampleInput from './sampleInput.json'
import input from './input.json'

const MyContext = React.createContext({
  isOpacityOn: false,
  inputMode: 'puzzle' as 'sample' | 'puzzle',
  setInputMode: (mode: 'sample' | 'puzzle') => {},
  renderMode: 'static' as 'static' | 'animate',
  setRenderMode: (mode: 'static' | 'animate') => {},
  justifyMode: 'evenly' as 'start' | 'end' | 'evenly' | 'between',
  setJustifyMode: (mode: 'start' | 'end' | 'evenly' | 'between') => {},
  useTransition: true,
  setUseTransition: (val: boolean) => {},
  useBorder: true,
  setUseBorder: (val: boolean) => {},
  size: 4,
  setSize: (val: number) => {},
  gridCols: 3,
  setGridCols: (val: number) => {},
})

const GRID_SIZE = 3
function App() {
  const [inputMode, setInputMode] = React.useState<'sample' | 'puzzle'>(
    'puzzle'
  )
  const [renderMode, setRenderMode] = React.useState<'static' | 'animate'>(
    'static'
  )
  const [justifyMode, setJustifyMode] = React.useState<
    'start' | 'end' | 'evenly' | 'between'
  >('evenly')
  const [data, setData] = React.useState<Roll[][]>([])
  const [timeTick, setTimeTick] = React.useState(0)
  const [isOpacityOn, setIsOpacityOn] = React.useState(false)
  const [useTransition, setUseTransition] = React.useState(true)
  const [useBorder, setUseBorder] = React.useState(true)
  const [size, setSize] = React.useState(4)
  const [gridCols, setGridCols] = React.useState(3)

  const gameData = extractData(
    JSON.stringify(inputMode === 'puzzle' ? input : sampleInput)
  )
  const games = gameData[0].rolls
  const dataSource = renderMode === 'static' ? games : data

  React.useEffect(() => {
    if (renderMode === 'animate' && timeTick < games.length) {
      setTimeout(() => {
        setIsOpacityOn(true)
        setTimeout(() => {
          setIsOpacityOn(false)
          setTimeout(() => {
            setData([games[timeTick]])
            renderMode === 'animate' && setTimeTick((tick) => tick + 1)
          }, 150)
        }, 150)
      }, 150)
    }
  }, [timeTick])

  React.useEffect(() => {
    if (renderMode === 'static') {
      setTimeout(() => {
        setIsOpacityOn(true)
      }, 550)
    } else {
      setTimeTick(0)
    }
  }, [renderMode, inputMode])

  const buttonStyles =
    'px-2 my-4 mx-2 text-gray-400 border-2 border-gray-400 rounded-md'

  const buttons = [
    {
      label: `use ${inputMode === 'puzzle' ? 'sample' : 'puzzle'} data`,
      action: () =>
        setInputMode((mode) => (mode === 'puzzle' ? 'sample' : 'puzzle')),
    },

    {
      label: 'toggle justify',
      action: () =>
        setJustifyMode((mode) =>
          mode === 'start'
            ? 'evenly'
            : mode === 'evenly'
            ? 'between'
            : mode === 'between'
            ? 'end'
            : 'start'
        ),
    },
    {
      label: `use ${useBorder ? 'no' : ''} border`,
      action: () => setUseBorder((val) => !val),
    },
    {
      label: 'bigger',
      action: () => setSize((val) => val + (val === 1 ? 1 : 2)),
    },
    {
      label: `${size} (reset)`,
      action: () => setSize(4),
    },
    {
      label: 'smaller',
      action: () => setSize((val) => val - ([1, 2].includes(val) ? 1 : 2)),
    },
    {
      label: `set mode to ${renderMode === 'static' ? 'animate' : 'static'}`,
      action: () =>
        setRenderMode((mode) => (mode === 'static' ? 'animate' : 'static')),
    },
    {
      label: `use ${useTransition ? 'no' : ''} transition`,
      action: () => setUseTransition((val) => !val),
      mode: 'animate',
    },
    {
      label: timeTick,
      action: () => setTimeTick((val) => val + 1),
      mode: 'animate',
    },
  ]

  return (
    <MyContext.Provider
      value={{
        isOpacityOn,
        inputMode,
        setInputMode,
        renderMode,
        setRenderMode,
        justifyMode,
        setJustifyMode,
        useTransition,
        setUseTransition,
        useBorder,
        setUseBorder,
        size,
        setSize,
        gridCols,
        setGridCols,
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">AoC 2023 day 2 part 2</h1>

        <div className="sticky top-0 flex flex-wrap justify-center">
          {buttons.map((button, index) => {
            return (
              <button
                key={`button-${index}`}
                className={buttonStyles}
                onClick={button.action}
              >
                {button.label}
              </button>
            )
          })}
          <input
            type="text"
            className={`w-4 h-8 border-2 border-gray-400 rounded-md`}
            value={gridCols}
            onChange={(e) => setGridCols(Number(e.target.value))}
          />
        </div>

        <div
          className={`grid grid-cols-${gridCols} grid-flow-dense auto-cols-max gap-0`}
        >
          {/* <div className={`grid grid-cols-${GRID_SIZE} gap-0`}> */}
          {dataSource.map((game, index) => {
            return (
              <div
                key={`game-row-${index}`}
                className={`grid m-0 w-auto ${
                  useBorder ? 'border border-gray-400' : ''
                }}`}
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
      </div>
    </MyContext.Provider>
  )
}

export default App

const PullRow = ({ pulls }: { pulls: Roll }) => {
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
  const dataArr = Array.from({ length: count }, (_, i) => i + 1)
  const { isOpacityOn, justifyMode, useTransition, size } =
    React.useContext(MyContext)
  const sizeStyles = `w-${size} h-${size} m-0`

  return (
    <div className={`flex flex-wrap justify-${justifyMode}`}>
      {dataArr?.map((_, i) => {
        return (
          <div
            key={`data-${i}`}
            className={`${sizeStyles} bg-${color}-500  ${
              useTransition
                ? `transition-bg-opacity duration-100 ease-in-out ${
                    isOpacityOn ? 'bg-opacity-100' : 'bg-opacity-0'
                  }`
                : ''
            }`}
          ></div>
        )
      })}
    </div>
  )
}
