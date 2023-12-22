const fs = require('fs');

const input = fs.readFileSync('./Slabs/text.txt', 'utf8').trim();
let ans = 0;

let bricks = input.split('\n').map(line => {
    const [sloc, eloc] = line.split('~');
    const [sx, sy, sz] = sloc.split(',').map(Number);
    const [ex, ey, ez] = eloc.split(',').map(Number);
    return [sx, sy, sz, ex, ey, ez];
});

function isSolid(bset, x, y, z) {
    if (z === 0) {
        return true;
    }
    return bset.has(`${x},${y},${z}`);
}

function bfall(bricks) {
    let fell = false;
    const bset = new Set();

    for (const [sx, sy, sz, ex, ey, ez] of bricks) {
        for (let x = sx; x <= ex; x++) {
            for (let y = sy; y <= ey; y++) {
                bset.add(`${x},${y},${ez}`);
            }
        }
    }

    const newBricks = [];

    for (const b of bricks) {
        let supp = false;
        const [sx, sy, sz, ex, ey, ez] = b;

        for (let x = sx; x <= ex; x++) {
            for (let y = sy; y <= ey; y++) {
                if (isSolid(bset, x, y, sz - 1)) {
                    supp = true;
                    break;
                }
            }

            if (supp) {
                break;
            }
        }

        if (!supp) {
            fell = true;
            newBricks.push([sx, sy, sz - 1, ex, ey, ez - 1]);
        } else {
            newBricks.push(b);
        }
    }

    return [fell, newBricks];
}

let fell = true;
let cnt = 0;

while (fell) {
    cnt++;
    [fell, bricks] = bfall(bricks);
}

const bcopy = bricks.slice();

ans = 0;

for (let i = 0; i < bcopy.length; i++) {
    const bcopy2 = bcopy.slice();
    bcopy2.splice(i, 1);

    if (!bfall(bcopy2)[0]) {
        ans++;
    }
}

console.log("Part 1 Solution:", ans);

ans = 0;

for (let i = 0; i < bcopy.length; i++) {
    let bcopy2 = bcopy.slice();
    bcopy2.splice(i, 1);
    const bcopy3 = bcopy2.slice();
    let fell = true;

    while (fell) {
        [fell, bcopy2] = bfall(bcopy2);
    }

    let mm = 0;

    for (let j = 0; j < bcopy2.length; j++) {
        const [a, b] = [bcopy2[j], bcopy3[j]];

        if (a.join(',') !== b.join(',')) {
            mm++;
        }
    }

    ans += mm;
}

console.log("Part 2 Solution:", ans);