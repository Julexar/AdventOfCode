const fs = require('fs');
const math = require('mathjs');

const lines = fs.readFileSync('./Propagation/text.txt', 'utf-8').split('\n');

const adj = {}, conjs = {}, ffs = {};
let rxConj = '';

lines.forEach(line => {
  const [module, dests] = line.split(' -> ');
  const destArray = dests.split(', ');
  const t = module[0];

  if (module === 'broadcaster') adj['broadcaster'] = destArray;
  else adj[t === '&' ? module.slice(1) : module.slice(1)] = destArray;

  if (destArray.includes('rx')) rxConj = module.slice(1);

  if (t === '&') conjs[module.slice(1)] = {};
  if (t === '%') ffs[module.slice(1)] = false;
});

Object.entries(adj).forEach(([label, dests]) => dests.forEach(dest => dest in conjs && (conjs[dest][label] = 0)));

let lowPulses = 0, highPulses = 0, presses = 0, rxConjPresses = {};

function press() {
  presses++;

  lowPulses += 1 + adj.broadcaster.length;
  const queue = adj.broadcaster.map(dest => [0, 'broadcaster', dest]);

  while (queue.length > 0) {
    const [pulse, src, label] = queue.shift();

    if (label === 'rx') continue;

    let toSend = label in conjs ? (conjs[label][src] = pulse, Object.values(conjs[label]).some(n => n === 0) ? 1 : 0) : 0;

    if (label in ffs) {
      if (pulse === 1) continue;
      ffs[label] = !ffs[label];
      toSend = pulse === 0 && ffs[label] ? 1 : 0;
    }

    (toSend === 1 ? highPulses += adj[label].length : lowPulses += adj[label].length);
    adj[label].forEach(dest => queue.push([toSend, label, dest]));

    Object.entries(conjs[rxConj]).forEach(([conjLabel, val]) => val === 1 && !(conjLabel in rxConjPresses) && (rxConjPresses[conjLabel] = presses));
  }
}

for (let i = 0; i < 1000; i++) press();

console.log('Part 1 Solution:', lowPulses * highPulses);

while (Object.keys(rxConjPresses).length < 4) press();

console.log('Part 2 Solution:', Object.values(rxConjPresses).reduce((a, b) => a * b) / math.gcd(...Object.values(rxConjPresses)));