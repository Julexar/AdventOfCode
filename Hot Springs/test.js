const fs = require('fs');

const input = fs.readFileSync('./Hot\ Springs/text.txt', 'utf8');

const records = parseInput(input);

for (const record of records) {
    const damagedIndices = [...record.conditions.matchAll(/\?/g)].map(m => m.index);

    record.possibleArrangements = [];
    for (let bits = 0; bits < 1 << damagedIndices.length; bits++) {
        let i = 0;
        const arrangement = record.conditions.replace(/\?/g, m => ".#"[bits >> i++ & 1]);
        const runs = [...arrangement.matchAll(/#+/g)].map(m => m[0].length);
        if (arrayEqual(runs, record.runLengths)) {
            record.possibleArrangements.push(arrangement);
        }
        record.possibleCount = record.possibleArrangements.length;
    }
}

const totalArrangementsPart1 = records.map(r => r.possibleCount).reduce((a, b) => a + b);
console.log(`Part 1 Solution: ${totalArrangementsPart1}`);

for (const record of records) {
    record.conditions += '?' + record.conditions + '?' + record.conditions + '?' + record.conditions + '?' + record.conditions;
    record.runLengths = [...record.runLengths, ...record.runLengths, ...record.runLengths, ...record.runLengths, ...record.runLengths];

    const minLength = record.runLengths.reduce((a, b) => a + b + 1);
    record.possibleCount = countArrangements(record.conditions, 0, record.runLengths, minLength, []);
}

const totalArrangementsPart2 = records.map(r => r.possibleCount).reduce((a, b) => a + b);
console.log(`Part 2 Solution: ${totalArrangementsPart2}`);

function parseInput(input) {
    return input.trim().split('\n').map(line => {
        const [conditions, runString] = line.split(' ');
        const runLengths = runString.split(',').map(r => parseInt(r));
        return { conditions, runLengths };
    });
}

function countArrangements(conditions, pos, runs, minLength, memo) {
    function memoize(result) {
        return (memo[pos] ??= [])[runs.length] = result;
    }

    if (typeof memo[pos]?.[runs.length] === "number") {
        return memo[pos][runs.length];
    }
    if (runs.length === 0) {
        return conditions.indexOf('#', pos) >= 0 ? 0 : 1;
    } else if (pos + minLength > conditions.length) {
        return memoize(0);
    } else if (conditions[pos] === '.') {
        let nextPos = pos;
        while (conditions[nextPos] === '.') nextPos++;
        return memoize(countArrangements(conditions, nextPos, runs, minLength, memo));
    } else if (pos >= conditions.length) {
        return memoize(runs.length === 0 ? 1 : 0);
    } else if (conditions[pos] === '#') {
        if (conditions.length - pos < runs[0]) return memoize(0);
        for (let i = 0; i < runs[0]; i++) {
            if (conditions[pos + i] === '.') return memoize(0);
        }
        if (conditions[pos + runs[0]] === '#') return memoize(0);
        return memoize(countArrangements(conditions, pos + runs[0] + 1, runs.slice(1), minLength - runs[0] - 1, memo));
    } else if (conditions[pos] === '?') {
        let result = countArrangements(conditions, pos + 1, runs, minLength, memo);

        if (conditions.length - pos < runs[0]) return memoize(result);
        for (let i = 0; i < runs[0]; i++) {
            if (conditions[pos + i] === '.') return memoize(result);
        }
        if (conditions[pos + runs[0]] === '#') return memoize(result);

        result += countArrangements(conditions, pos + runs[0] + 1, runs.slice(1), minLength - runs[0] - 1, memo);
        return memoize(result);
    }
    throw Error("This shouldn't happen");
}

function arrayEqual(a, b) {
    return a.length === b.length && a.every((e, i) => e === b[i]);
}