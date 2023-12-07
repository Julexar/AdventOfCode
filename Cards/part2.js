const fs = require('fs');
  
const sortTwoHands = (handA, handB) => {
    const permutationsA = getAllPossibleValues(handA)
    const permutationsB = getAllPossibleValues(handB)
    const handValueA = permutationsA.map((hand) => determineHandValue(hand)).sort((a, b) => b - a)[0];
    const handValueB = permutationsB.map((hand) => determineHandValue(hand)).sort((a, b) => b - a)[0];
    if (handValueA > handValueB) return -1;
    if (handValueB > handValueA) return 1;
    return determineTieBreaker(handA, handB);
};
  
const containsWildCard = /J/
const getAllPossibleValues = (hand) => {
    if (!containsWildCard.test(hand)) {
      return [hand]
    }
  
    const handSet = getHandSet(hand)
    const permutations = []
    for (let key in handSet) {
      const s = hand
      permutations.push(s.replace(/J/g, key))
    }
  
    return permutations
}
  
const determineHandValue = (hand) => {
    const handSet = getHandSet(hand)
  
    let hasPair = false;
    let hasThreeOfAKind = false;
    for (let key in handSet) {
      const val = handSet[key];
      if (val === 5) {
        return 7;
      } else if (val === 4) {
        return 6;
      } else if ((val === 3 && hasPair) || (val === 2 && hasThreeOfAKind)) {
        return 5;
      } else if (val === 2 && hasPair) {
        return 3;
      } else if (val === 3) {
        hasThreeOfAKind = true;
      } else if (val === 2) {
        hasPair = true;
      }
    }
  
    if (hasThreeOfAKind) return 4;
    if (hasPair) return 2;
    return 1;
};
  
const getHandSet = (hand) => {
    const handSet = {};
    for (let i = 0; i < hand.length; i++) {
      handSet[hand[i]] = handSet[hand[i]] || 0;
      handSet[hand[i]] += 1;
    }
    return handSet
}
  
const faceCardVals = {
    T: 10,
    J: 1,
    Q: 12,
    K: 13,
    A: 14,
};
  
const determineTieBreaker = (handA, handB) => {
    for (let i = 0; i < handA.length; i++) {
      const cardA = handA[i];
      const cardB = handB[i];
      const handAVal = isNaN(+cardA) ? faceCardVals[cardA] : +cardA;
      const handBVal = isNaN(+cardB) ? faceCardVals[cardB] : +cardB;
  
      if (handAVal > handBVal) return -1;
      if (handBVal > handAVal) return 1;
    }
  
    return 0;
};

const lines = fs.readFileSync("./Cards/text.txt", 'utf8').trim().split('\n');

lines.sort((a, b) => {
    const handA = a.split(" ")[0];
    const handB = b.split(" ")[0];
    return sortTwoHands(handA, handB);
});

lines.reverse();
let totalWinnings = 0;
for (let i = 0; i < lines.length; i++) {
    const bid = lines[i].split(" ")[1];
    totalWinnings += (bid * (i + 1));
}

console.log("Part 2 Solution:", totalWinnings);