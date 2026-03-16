const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const arr = [];
let line = 1;

for (let i = 0; i < N; i++) arr.push(Number(input[line++]));

const minTree = new Int32Array(N * 4);
const maxTree = new Int32Array(N * 4);

// 트리 초기화 (빌드)
function init(node, start, end) {
  if (start === end) {
    minTree[node] = arr[start];
    maxTree[node] = arr[start];
    return;
  }

  const mid = Math.floor((start + end) / 2);
  init(node * 2, start, mid);
  init(node * 2 + 1, mid + 1, end);

  minTree[node] = Math.min(minTree[node * 2], minTree[node * 2 + 1]);
  maxTree[node] = Math.max(maxTree[node * 2], maxTree[node * 2 + 1]);
}

// 구간 쿼리 (최솟값, 최댓값 조회)
function query(node, start, end, left, right) {
  // 범위를 완전히 벗어난 경우
  if (left > end || right < start) {
    return [Infinity, -Infinity];
  }

  // 범위에 완전히 포함된 경우
  if (left <= start && end <= right) {
    return [minTree[node], maxTree[node]];
  }

  const mid = Math.floor((start + end) / 2);
  const [lMin, lMax] = query(node * 2, start, mid, left, right);
  const [rMin, rMax] = query(node * 2 + 1, mid + 1, end, left, right);

  return [Math.min(lMin, rMin), Math.max(lMax, rMax)];
}

// 트리 빌드
init(1, 0, N - 1);

// 쿼리 처리 및 결과 저장
const results = [];
for (let i = 0; i < M; i++) {
  const [left, right] = input[line++].split(' ').map(Number);

  const [minVal, maxVal] = query(1, 0, N - 1, left - 1, right - 1);
  results.push(`${minVal} ${maxVal}`);
}

process.stdout.write(results.join('\n') + '\n');
