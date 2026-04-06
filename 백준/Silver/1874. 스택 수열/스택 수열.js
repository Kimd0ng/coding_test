const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = input.shift();

let ans = [];
let stack = [];

let stackNum = 1;

for (let i = 0; i < n; i++) {
  // 스택에서 꺼내서 만들어야할 배열의 숫자
  let num = input[i];

  // 숫자를 만들기 위해 stack에 동일한 숫자까지 push
  // 예제 1에서는 4까지 push

  // 4를 pop한 이후 다시 여기를 오게 되면
  // stackNum: 4, num: 3 이므로 while문을 지나감
  while (stackNum <= num) {
    stack.push(stackNum);
    stackNum++;
    ans.push('+');
  }

  // num 까지 push가 되었으므로 num을 pop
  // 4를 pop (stack [1, 2, 3])

  // 다시 pop을 진행해서 num: 3과 비교를 진행
  let stackPop = stack.pop();
  ans.push('-');

  // pop 한 숫자와 num이 다른경우 만들수 없음
  // while문을 스킵해 다시 pop을 할 수 밖에 없는 상황에서 입력된 배열의 값과 다른 값이 나오는 경우 안만들어지는 배열
  if (stackPop != num) {
    ans = ['NO'];
    break;
  }
}

console.log(ans.join('\n'));
