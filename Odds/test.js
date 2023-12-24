const fs = require('fs');
const { init } = require('z3-solver');

function isInArea(x, y, minP, maxP) {
    return x >= minP && x <= maxP && y >= minP && y <= maxP;
}

const getIntersections = (input, minP, maxP) => {
    const hailStones = input.split('\n').map((line) => {
      const [x, y, z] = line.split('@')[0].split(',').map(Number);
      const [vx, vy, vz] = line.split('@')[1].split(',').map(Number);
      return { x, y, z, vx, vy, vz, m: vy / vx };
    });
  
    let inTestArea = 0;
  
    for (let i = 0; i < hailStones.length - 1; i++) {
      const stoneA = hailStones[i];
      for (let j = i + 1; j < hailStones.length; j++) {
        const stoneB = hailStones[j];
  
        const interSection =
          (stoneA.m * stoneA.x - stoneB.m * stoneB.x + stoneB.y - stoneA.y) /
          (stoneA.m - stoneB.m);
        const x = interSection;
        const y = stoneA.m * (interSection - stoneA.x) + stoneA.y;
  
        const tA = (x - stoneA.x) / stoneA.vx;
        const tB = (x - stoneB.x) / stoneB.vx;
  
        const inFuture = tA > 0 && tB > 0;
  
        let inArea = isInArea(x, y, minP, maxP);
  
        if (inArea && inFuture) {
          inTestArea++;
        }
      }
    }
  
    return inTestArea;
};

const getStartingCoordinates = async (input) => {
    const hailStones = input
      .split('\n')
      .slice(0, 3)
      .map((line) => {
        const [x, y, z] = line.split('@')[0].split(',').map(Number);
        const [vx, vy, vz] = line.split('@')[1].split(',').map(Number);
        return { x, y, z, vx, vy, vz, m: vy / vx };
      });
  
    const { Context } = await init();
    const Z3 = Context('main');
  
    const x = Z3.Real.const('x');
    const y = Z3.Real.const('y');
    const z = Z3.Real.const('z');
  
    const vx = Z3.Real.const('vx');
    const vy = Z3.Real.const('vy');
    const vz = Z3.Real.const('vz');
  
    const solver = new Z3.Solver();
  
    for (let i = 0; i < hailStones.length; i++) {
      const stone = hailStones[i];
      const t = Z3.Real.const(`t${i}`);
  
      solver.add(t.ge(0));
      solver.add(x.add(vx.mul(t)).eq(t.mul(stone.vx).add(stone.x)));
      solver.add(y.add(vy.mul(t)).eq(t.mul(stone.vy).add(stone.y)));
      solver.add(z.add(vz.mul(t)).eq(t.mul(stone.vz).add(stone.z)));
    }
  
    const isSat = await solver.check();
  
    if (isSat !== 'sat') return -1;
  
    const model = solver.model();
    const rx = Number(model.eval(x));
    const ry = Number(model.eval(y));
    const rz = Number(model.eval(z));
  
    return rx + ry + rz;
};

const input = fs.readFileSync('./Odds/text.txt', 'utf8');

console.log('Part 1 Solution:', getIntersections(input, 200000000000000, 400000000000000));
async function part2() {
    console.log('Part 2 Solution:', await getStartingCoordinates(input));
    return;
}
part2()