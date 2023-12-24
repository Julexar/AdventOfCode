const fs = require('fs');
const { Queue } = require('queue-typescript');
const graphlib = require('graphlib');

function readInput() {
    const data = fs.readFileSync('./Walk/text.txt', 'utf8');

    return data.trim().split('\n');
}

function find_max_path(grid, S = [1, 0], E = [grid[0].length - 2, grid.length - 1], part = 1) {
    const q = new Queue();
    q.enqueue([S, new Set()]);
    const paths = [];

    while (q.length !== 0) {
        const [p, path] = q.dequeue();
        if (p[0] === E[0] && p[1] === E[1]) {
            paths.push(path.size);
            continue;
        }
        const [x, y] = p;
        let dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]];

        if (part === 1) {
            if (grid[y][x] === 'v') dirs = [[0, +1]];
            if (grid[y][x] === '^') dirs = [[0, -1]];
            if (grid[y][x] === '>') dirs = [[+1, 0]];
            if (grid[y][x] === '<') dirs = [[-1, 0]];
        }

        for (const [dx, dy] of dirs) {
            const xn = x + dx;
            const yn = y + dy;

            if (xn < 0 || xn >= grid[0].length || yn < 0 || yn >= grid.length) {
                continue;
            }

            if (grid[yn][xn] === '#') {
                continue;
            }

            const pnew = [xn, yn];

            if (path.has(pnew.toString())) {
                continue;
            } else {
                const pathnew = new Set(path);
                pathnew.add(pnew.toString());
                q.enqueue([pnew, pathnew]);
            }
        }
    }

    return Math.max(...paths);
}

function solvePart1() {
    const grid = readInput();
    const S = [1, 0];
    const E = [grid[0].length - 2, grid.length - 1];
    return find_max_path(grid, S, E);
}

console.log("Part 1 Solution:", solvePart1());

function mapNodes(grid) {
    const nodes = [
        [1, 0],
        [grid[0].length - 2, grid.length - 1]
    ];

    for (let x = 1; x < grid[0].length - 1; x++) {
        for (let y = 1; y < grid.length - 1; y++) {
            if (grid[y][x] !== "#") {
                const neighbors = [
                    [x - 1, y],
                    [x + 1, y],
                    [x, y - 1],
                    [x, y + 1]
                ].filter(([dx, dy]) => {
                    return dx >= 0 && dy >= 0 && dy < grid.length && dx < grid[0].length && grid[dy][dx] !== "#";
                });

                if (neighbors.length > 2) {
                    nodes.push([x, y]);
                }
            }
        }
    }

    const nodeMap = {};
    for (const n of nodes) {
        const paths = {};
        const queue = new Queue();
        queue.enqueue([n[0], n[1], new Set([`${n[0]},${n[1]}`])]);

        while (queue.length !== 0) {
            const [px, py, path] = queue.dequeue();
            if (path.size > 0) {
                paths[`${px},${py}`] = path.size - 1;
            }

            for (const [dx, dy] of [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ]) {
                const xn = px + dx;
                const yn = py + dy;

                if (xn < 0 || xn >= grid[0].length || yn < 0 || yn >= grid.length) {
                    continue;
                }

                if (grid[yn][xn] === "#") {
                    continue;
                }

                const pNewString = `${xn},${yn}`;

                if (!path.has(pNewString)) {
                    const pathNew = new Set([...path, pNewString]);
                    queue.enqueue([xn, yn, pathNew]);
                }
            }
        }

        nodeMap[`${n[0]},${n[1]}`] = paths;
    }

    return nodeMap;
}

function solvePart2() {
    const grid = readInput();
    const S = [1, 0];
    const E = [grid[0].length - 2, grid.length - 1];
    const nodeMap = mapNodes(grid);
    const G = new graphlib.Graph();

    for (const [n, c] of Object.entries(nodeMap)) {
        for (const [m, d] of Object.entries(c)) {
            G.setEdge(n, m, { weight: d });
        }
    }

    const paths = [];
    const visited = new Set();

    const dfs = (node, currentPath) => {
        visited.add(node);

        if (node === E.toString()) {
            paths.push(currentPath);
        } else {
            for (const neighbor of G.neighbors(node)) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor, currentPath + G.edge(node, neighbor).weight);
                }
            }
        }

        visited.delete(node);
    };

    dfs(S.toString(), 0);

    return Math.max(...paths);
}

console.log("Part 2 Solution:", solvePart2());