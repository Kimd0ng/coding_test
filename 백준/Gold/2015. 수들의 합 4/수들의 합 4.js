const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let answer = 0;
let prefix = new Array(arr.length);
let sum = 0;
let obj = {};

for (let i = 0; i < arr.length; i++) {
  // 1번부터 누적합
  sum += arr[i];
  // 누적합이 K와 동일하면 answer++
  if (sum == k) answer++;
  // 누적합에 대입
  prefix[i] = sum;
  // 누적합에서 k만큼 뺏을때 값이 있다면 k가 다른범위 누적합에서 나옴
  if (obj[sum - k]) answer += obj[sum - k];
  // obj에 지금까지 나온 누적합들을 저장
  if (!obj[sum]) obj[sum] = 1;
  else obj[sum]++;
}

console.log(answer);
