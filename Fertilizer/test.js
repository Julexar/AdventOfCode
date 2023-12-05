const fs = require('fs');

function parseInput(input) {
    const lines = input.split("\n\n");
    const seeds = lines.shift().split(":")[1].trim().split(" ").map(Number);
    const mapMatrix = lines.map((line) =>
        line
            .split("\n")
            .slice(1)
            .map((s) => s.split(" ").map(Number))
            .map(([destStart, srcStart, length]) => ({
                destStart,
                destEnd: destStart + length - 1,
                srcStart,
                srcEnd: srcStart + length - 1,
            }))
    );
    return { seeds, mapMatrix };
}

function lookupLocation(mapMatrix, val) {
    return mapMatrix.reduce((curr, mappings) => {
        for (let i = 0; i < mappings.length; i++) {
            const m = mappings[i];
            if (curr >= m.srcStart && curr <= m.srcEnd) {
                return m.destStart + (curr - m.srcStart);
            }
        }
        return curr;
    }, val);
}

function lookupSeed(mapMatrix, val) {
    return mapMatrix.reduceRight((curr, mappings) => {
        for (let i = 0; i < mappings.length; i++) {
            const m = mappings[i];
            if (curr >= m.destStart && curr <= m.destEnd) {
                return m.srcStart + (curr - m.destStart);
            }
        }
        return curr;
    }, val);
}

function part1(input) {
    const { seeds, mapMatrix } = parseInput(input);
    return Math.min(...seeds.map((s) => lookupLocation(mapMatrix, s)));
}

function part2(input) {
    const { seeds, mapMatrix } = parseInput(input);
    const validSeed = (seed) => {
        for (let i = 0; i < seeds.length; i += 2) {
            if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) return true;
        }
        return false;
    };
    const candidateSeeds = mapMatrix
        .flatMap((mappings, i) => {
            const l = [];
            mappings.forEach((m) => {
                l.push(lookupSeed(mapMatrix.slice(0, i + 1), m.srcStart));
                l.push(lookupSeed(mapMatrix.slice(0, i + 1), m.destStart));
            });
            return l;
        })
        .filter(validSeed);

    return Math.min(...candidateSeeds.map((s) => lookupLocation(mapMatrix, s)));
}

const inputText = fs.readFileSync('./Fertilizer/text.txt', 'utf-8');
console.log("Part 1 Solution:", part1(inputText));
console.log("Part 2 Solution:", part2(inputText));