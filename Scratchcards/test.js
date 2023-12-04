const fs = require('fs');

const extractNums = (str) => [...str.matchAll(/\d+/g)].map((r) => r[0]);

const getWins = (card) => {
  const [left, right] = card.split("|");
  const winning = extractNums(left.slice(left.indexOf(":")));
  return extractNums(right).filter((n) => winning.includes(n));
};

const part1 = (input) => {
  const allWins = input.split("\n").map(getWins);
  return allWins.reduce((sumTotal, wins) => {
    if (wins.length) return sumTotal + 2 ** (wins.length - 1);
    else return sumTotal;
  }, 0);
};

const part2 = (input) => {
  const lines = input.split("\n");
  const copies = Array(lines.length).fill(1);
  return lines.map(getWins).reduce((total, wins, i) => {
    for (let j = 0; j < wins.length; j++) copies[j + i + 1] += copies[i];
    return total + copies[i];
  }, 0);
};

const input = fs.readFileSync("./Scratchcards/text.txt", "utf-8");

console.log("Part 1 Solution: ", part1(input));
console.log("Part 2 Solution: " + part2(input));