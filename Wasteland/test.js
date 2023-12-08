const fs = require("fs");

class Day8 {
    static solvePart1() {
        const lines = fs.readFileSync("./Wasteland/text.txt", 'utf-8').trim().split('\n');
        const moves = lines[0];
        const nodes = lines.slice(2).reduce((acc, line) => {
            const [name, neighbors] = line.split(' = ');
            const [left, right] = neighbors.slice(1, -1).split(', ');
            acc[name] = { first: left, second: right };
            return acc;
        }, {});
        
        let current = 'AAA';
        let step = 0;

        while (current !== 'ZZZ') {
            const node = nodes[current];
            current = moves[step % moves.length] === 'L' ? node.first : node.second;
            step++;
        }

        return step;
    };

    static solvePart2() {
        const lines = fs.readFileSync("./Wasteland/text.txt", 'utf-8').trim().split('\n');
        const moves = lines[0];
        const nodes = lines.slice(2).reduce((acc, line) => {
            const [name, neighbors] = line.split(' = ');
            const [left, right] = neighbors.slice(1, -1).split(', ');
            acc[name] = { first: left, second: right };
            return acc;
        }, {});

        let steps = 1;

        for (const key of Object.keys(nodes).filter(k => k.endsWith('A'))) {
            let step = 0;
            let current = key;

            while (!current.endsWith('Z')) {
                const node = nodes[current];
                current = moves[step % moves.length] === 'L' ? node.first : node.second;
                step++;
            }

            steps = steps * step / gcd(steps, step);
        }

        return steps;
    }
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

console.log(`Part 1 Solution:`, Day8.solvePart1());
console.log(`Part 2 Solution:`, Day8.solvePart2());