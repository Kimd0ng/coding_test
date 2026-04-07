const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\r?\n/);

const k = Number(input[0]);

const stack = [];
let line = 0;
let ans = 0;

for (let i = 0; i < k; i++) {
  if (input[++line] != 0) stack.push(Number(input[line]));
  else stack.pop();
}

while (stack.length) {
  ans += stack.pop();
}

console.log(ans);
