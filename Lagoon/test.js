const fs = require("fs");
const input = fs.readFileSync("./Lagoon/text.txt").toString().split("\n");

const dirs = {
    R: [0,1],
    D: [-1,0],
    L: [0,-1],
    U: [1,0]
}

function solve(part2 = Boolean) {
    let pos = [0,0];
    const grid = [];
    let perimeter = 0;

    for (const line of input) {
        let [dir,num] = line.split(' ');

        if (part2) {
            const word = line.split('#')[1].split(')')[0]
            dir = Object.keys(dirs)[parseInt(word.substring(word.length - 1))]
            num = parseInt(word.slice(0, -1), 16).toString()
        }

        const [y,x] = dirs[dir]
        const dist = parseInt(num)
        pos = [pos[0] + dist * y, pos[1] + dist * x]
        perimeter += dist
        grid.push(pos)
    }

    let ans = 0;
    for (let i=0;i<grid.length-1;i++) {
        ans += (grid[i][1] + grid[i+1][1]) * (grid[i][0] - grid[i+1][0])
    }

    return perimeter / 2 + ans / 2 + 1
}

console.log("Part 1 Solution:", solve(false));
console.log("Part 2 Solution:", solve(true));