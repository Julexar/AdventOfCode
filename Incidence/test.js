const fs = require("fs");
const input = fs.readFileSync('./Incidence/text.txt');
const data = input.toString().trim().split(/\n\n/).map(m => m.split('\n'));

const patterns = data;
const mirrorsP1 = [];
const mirrorsP2 = [];
let totalPart1 = 0;
let totalPart2 = 0;

for (const pattern of patterns) {
    processPattern(pattern, false)
    processPattern(transpose(pattern), true)
}

function processPattern(pattern, isVertical) {
    const total = isVertical ? 1 : 100
    const dir = isVertical ? "vertical" : "horizontal"
    for (let i=1;i<pattern.length;i++) {
        if (checkHorizontalP1(pattern, i)) {
            mirrorsP1.push({dir: dir, pos: i})
            totalPart1 += total * i
            continue;
        }

        const check = checkHorizontalP2(pattern, i)
        if (check) {
            mirrorsP2.push({dir: dir, pos: i, smudge: check})
            totalPart2 += total * i
            continue;
        }
    }
}

function checkHorizontalP1(pattern, row) {
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
        if (pattern[i] !== pattern[j]) return false
    }
    return true
}

function checkHorizontalP2(pattern, row) {
    let smudgeRow = NaN, smudgeCol = NaN;
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
        const pi = pattern[i], pj = pattern[j];
        for (let k = 0; k < pi.length; k++) {
            if (pi[k] !== pj[k]) {
                if (!isNaN(smudgeRow)) return;
                smudgeRow = i;
                smudgeCol = k;
            }
        }
    }
    if (!isNaN(smudgeRow)) return { row: smudgeRow, col: smudgeCol };
}

function transpose(pattern) {
    const result = Array(pattern[0].length).fill("");
    for (const row of pattern) {
        [...row].forEach((c, i) => result[i] += c);
    }
    return result;
}

console.log("Part 1 Solution:", totalPart1);
console.log("Part 2 Solution:", totalPart2);