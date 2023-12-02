import * as fs from 'fs'
import * as path from 'path'

export const getPuzzleInput = <T = string>(
  fileName: string,
  iterator?: (input: string) => T
): string | T => {
  const inputString = fs.readFileSync(
    path.resolve(__dirname, fileName + '.txt'),
    'utf8'
  )
  if (iterator !== undefined) {
    return iterator(inputString)
  } else {
    return inputString
  }
}
