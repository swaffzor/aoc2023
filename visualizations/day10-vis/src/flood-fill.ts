// Javascript implementation of the approach

// Function that returns true if
// the given pixel is valid

// FloodFill function
export function floodFill(
  screen: number[][],
  m: number,
  n: number,
  x: number,
  y: number,
  prevC: number,
  newC: number
) {
  function isValid(
    screen: number[][],
    m: number,
    n: number,
    x: number,
    y: number,
    prevC: number,
    newC: number
  ) {
    if (
      x < 0 ||
      x >= m ||
      y < 0 ||
      y >= n ||
      screen[x][y] != prevC ||
      screen[x][y] == newC
    )
      return false
    return true
  }
  const queue: number[][] = []

  // Append the position of starting
  // pixel of the component
  queue.push([x, y])
  // debugger
  const grid = JSON.parse(JSON.stringify(screen))
  // Color the pixel with the new color
  grid[y][x] = newC

  // While the queue is not empty i.e. the
  // whole component having prevC color
  // is not colored with newC color
  let currPixel: number[] = []
  while (queue.length > 0) {
    // Dequeue the front node
    currPixel = queue[queue.length - 1]
    queue.pop()

    const posX = currPixel[0]
    const posY = currPixel[1]

    // Check if the adjacent
    // pixels are valid
    if (isValid(grid, m, n, posX + 1, posY, prevC, newC)) {
      // Color with newC
      // if valid and enqueue
      grid[posY][posX + 1] = newC
      queue.push([posX + 1, posY])
    }

    if (isValid(grid, m, n, posX - 1, posY, prevC, newC)) {
      grid[posY][posX - 1] = newC
      queue.push([posX - 1, posY])
    }

    if (isValid(grid, m, n, posX, posY + 1, prevC, newC)) {
      grid[posY + 1][posX] = newC
      queue.push([posX, posY + 1])
    }

    if (isValid(grid, m, n, posX, posY - 1, prevC, newC)) {
      grid[posY - 1][posX] = newC
      queue.push([posX, posY - 1])
    }
  }
  return grid
}

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

// // Row of the display
// const m = grid.length

// // Column of the display
// const n = grid[0].length

// // Co-ordinate provided by the user
// const x = 4
// const y = 4

// // Current color at that co-ordinate
// const prevC = grid[x][y]

// // New color that has to be filled
// const newC = '3'

// floodFill(grid, m, n, x, y, prevC, newC)

// Printing the updated screen
// for (let i = 0; i < m; i++) {
//   for (let j = 0; j < n; j++) {
//     document.write(screen[i][j] + ' ')
//   }
//   document.write('</br>')
// }

// This code is contributed by divyesh072019.
