const fs = require('fs');

function runP2() {
    const values = [];
    const pFirst = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
    const pLast = /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/;
  
    try {
      const data = fs.readFileSync('./text.txt', 'utf8'); // Change 'input.txt' to your input file
  
      data.split('\n').forEach((line) => {
        const first = parseNum(line.match(pFirst)[1]);
        const reversedLine = [...line].reverse().join('');
        const last = parseNum(reversedLine.match(pLast)[1]);
        values.push(parseInt(first + last, 10));
      });
  
      const sum = values.reduce((acc, value) => acc + value, 0);
      console.log("Sum of parsed numbers:", sum);
    } catch (err) {
      console.error("Error reading the file:", err);
    }
  }
  
  function parseNum(num) {
    switch (num) {
      case 'one': return '1';
      case 'two': return '2';
      case 'three': return '3';
      case 'four': return '4';
      case 'five': return '5';
      case 'six': return '6';
      case 'seven': return '7';
      case 'eight': return '8';
      case 'nine': return '9';
      case 'eno': return '1';
      case 'owt': return '2';
      case 'eerht': return '3';
      case 'ruof': return '4';
      case 'evif': return '5';
      case 'xis': return '6';
      case 'neves': return '7';
      case 'thgie': return '8';
      case 'enin': return '9';
      default: return num;
    }
  }
  
  runP2();