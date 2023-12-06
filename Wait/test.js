const fs = require('fs');

const findRoots = (b, c) => {
    const D = Math.sqrt(b * b - 4 * c);
    const root1 = (-b + D) / 2;
    const root2 = (-b - D) / 2;
    const roots = [Math.ceil(Math.min(root1, root2)), Math.floor(Math.max(root1, root2))];
    return roots;
};
  
const waysToWinARace = (time, distance) => {
    const roots = findRoots(-time, distance + 1);
    const intersection = [Math.max(0, roots[0]), Math.min(roots[1], time)];
    return intersection[1] - intersection[0] + 1;
};
  
const parseInput = (input) => {
    return input
      .split(": ")[1]
      .split(" ")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));
};
  
const partOne = (inputs) => {
    const [raceTimes, raceDistances] = inputs.map(parseInput);
  
    const waysToWinRaces = raceTimes.map((time, i) => waysToWinARace(time, raceDistances[i]));
  
    return waysToWinRaces.reduce((acc, curr) => acc * curr, 1);
};

const solveQuadratic = (a, b, c) => {
    const determinant = b * b - 4.0 * a * c;
    const root1 = (-b + Math.sqrt(determinant)) / (2 * a);
    const root2 = (-b - Math.sqrt(determinant)) / (2 * a);
    return Math.ceil(root2) - Math.ceil(root1);
};

const partTwo = (input) => {
  const [time, distance] = input
    .map(line => line.substring(line.indexOf(':') + 1).replace(/\s/g, ''))
    .map(val => parseInt(val))
    .filter(val => !isNaN(val));
  
  return solveQuadratic(-1.0, time, -distance);
};

const inputs = fs.readFileSync("./Wait/text.txt", 'utf8').trim().split('\n')

console.log("Part 1 Result:", partOne(inputs));
console.log("Part 2 Result:", partTwo(inputs));