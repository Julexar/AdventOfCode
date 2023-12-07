const fs = require('fs');

const hands = fs.readFileSync("./Cards/text.txt", 'utf-8').trim().split('\n').map(l => l.split(' '));

const score = hand => {
    const handSet = new Set(hand);
    const longest = Math.max(...[...handSet].map(c => hand.split('').filter(x => x === c).length));

    if (handSet.size === 5) return 'a';
    if (handSet.size === 4) return 'b';
    if (handSet.size === 3 && longest === 2) return 'c';
    if (handSet.size === 3 && longest === 3) return 'd';
    if (handSet.size === 2 && longest === 3) return 'e';
    if (handSet.size === 2 && longest === 4) return 'f';

    return 'g';
};

const tiebreak = hand => {
    const mapping = { '2': 'a', '3': 'b', '4': 'c', '5': 'd', '6': 'e', '7': 'f', '8': 'g', '9': 'h', 'T': 'i', 'J': 'j', 'Q': 'k', 'K': 'l', 'A': 'm' };
    return hand.split('').map(c => mapping[c]).join('');
};

const p1 = hands => {
    const s = hands
        .map(([hand, bid]) => [hand, parseInt(bid)])
        .sort((a, b) => score(a[0]) + tiebreak(a[0]) > score(b[0]) + tiebreak(b[0]) ? 1 : -1)
        .reduce((acc, [_, bid], i) => acc + (i + 1) * bid, 0);

    console.log("Part 1 Solution: " + s);
};

p1(hands.slice());