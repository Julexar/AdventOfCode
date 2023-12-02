const fs = require('fs');

const data = fs.readFileSync("./Cube\ Conundrum/text.txt", 'utf8');
const lines = data.split('\n').filter((line) => line);

const games = lines.map((line) => line.split(': ')[1].split('; '));

function part1(games) {
  let answer = 0;
  const bag = { red: 12, blue: 14, green: 13 };
  const gameCounts = [];

  for (let index = 0; index < games.length; index++) {
    const game = games[index];
    const counts = {};

    for (const pulls of game) {
      for (const pull of pulls.split(', ')) {
        const [count, colour] = pull.split(' ');
        const parsedCount = parseInt(count);

        const existingCount = counts[colour];
        if (!existingCount || existingCount < parsedCount) {
          counts[colour] = parsedCount;
        }
      }
    }

    if (Object.keys(bag).every((k) => bag[k] >= counts[k])) {
      answer += index + 1;
    }

    gameCounts.push(counts);
  }

  return [answer, gameCounts];
}

const [part1Answer, gameCounts] = part1(games);
console.log('Part 1 answer is:', part1Answer);

function part2(gameCounts) {
  let answer = 0;

  for (const counts of gameCounts) {
    let multiplication = 1;
    for (const count of Object.values(counts)) {
      multiplication *= count;
    }
    answer += multiplication;
  }

  return answer;
}

console.log('Part 2 answer is:', part2(gameCounts));