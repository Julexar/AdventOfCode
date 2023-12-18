const fs = require("fs");
const { Heap } = require('heap-js')
const input = fs.readFileSync("./Crucible/text.txt", "utf-8")

const directions = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    down: { x: 0, y: 1 },
    up: { x: 0, y: -1 }
}
const neighbors = Object.values(directions)

function parseCityBlocks (input) {
    const blocks = input.split('\n').map((line, y) => line.split('').map((char, x) => {
      return {
        x,
        y,
        val: Number.parseInt(char)
      }
    }))
    return blocks
}

class Visited {
    visited = new Set()
    minSteps = 0
    maxSteps = 0
    constructor (minSteps, maxSteps) {
      this.minSteps = minSteps
      this.maxSteps = maxSteps
    }
  
    check ({ row, col, rowDir, colDir, consecutive }) {
      const key =
        (row << 24) | (col << 16) | ((rowDir & 3) << 14) | ((colDir & 3) << 12) | consecutive
      if (this.visited.has(key)) return true
      if (consecutive >= this.minSteps) { for (let i = 0; i <= this.maxSteps - consecutive; ++i) this.visited.add(key + i) } else this.visited.add(key)
      return false
    }
}

function checkNeighbour (cityMap, positions, pos, rowDir, colDir, minSteps, maxSteps) {
    const nextRow = pos.row + rowDir
    const nextCol = pos.col + colDir
    const sameDirection = rowDir === pos.rowDir && colDir === pos.colDir
  
    // Boundary check
    if (nextRow < 0 || nextRow >= cityMap.length || nextCol < 0 || nextCol >= cityMap[0].length) return
    // Backwards check
    if (rowDir === -pos.rowDir && colDir === -pos.colDir) return
    // Max steps check
    if (pos.consecutive === maxSteps && sameDirection) return
    // Min steps check
    if (pos.consecutive < minSteps && !sameDirection && !(pos.row === 0 && pos.col === 0)) return
  
    positions.push({
      parent: pos,
      row: nextRow,
      col: nextCol,
      rowDir,
      colDir,
      consecutive: sameDirection ? pos.consecutive + 1 : 1,
      heat: pos.heat + cityMap[nextRow][nextCol].val
    })
}

function findPath (cityMap, start, end, minSteps, maxSteps) {
    const positions = new Heap((a, b) => a.heat - b.heat)
    const visited = new Visited(minSteps, maxSteps)
    positions.push({ row: start.x, col: start.y, rowDir: 0, colDir: 0, consecutive: 0, heat: 0 })
    while (positions.length > 0) {
      const pos = positions.pop()
      if (visited.check(pos)) {
        continue
      }
      if (pos.row === end.y && pos.col === end.x && pos.consecutive >= minSteps) {
        return pos.heat

      }
      neighbors.forEach(direction => {
        checkNeighbour(cityMap, positions, pos, direction.x, direction.y, minSteps, maxSteps)
      })
    }
    throw new Error('Could not reach destination:' + JSON.stringify(end))
}

const cityMap = parseCityBlocks(input)
const start = cityMap[0][0]
const end = cityMap[cityMap.length - 1][cityMap[0].length - 1]
const heat1 = findPath(cityMap, start, end, 0, 3)

const solutionP1 = heat1

console.log('Part 1 Solution:', solutionP1)

const heat2 = findPath(cityMap, start, end, 4, 10)

const solutionP2 = heat2

console.log('Part 2 Solution:', solutionP2)