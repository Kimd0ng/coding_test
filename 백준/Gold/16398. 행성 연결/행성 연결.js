const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const matrix = input.slice(1).map((item) => item.split(' ').map(Number));

const visited = Array(n).fill(false);
const minEdge = Array(n).fill(Infinity);
minEdge[0] = 0; // 0번 노드(코드상 1번)부터 시작

let totalCost = 0;

for (let i = 0; i < n; i++) {
  let curr = -1;
  let minVal = Infinity;

  // 방문하지 않은 노드 중 연결 비용이 가장 저렴한 노드 선택
  for (let j = 0; j < n; j++) {
    if (!visited[j] && minEdge[j] < minVal) {
      minVal = minEdge[j];
      curr = j;
    }
  }

  if (curr === -1) break; // 연결 불가능한 경우

  visited[curr] = true;
  totalCost += minVal;

  // 선택된 노드와 연결된 다른 노드들의 최소 간선 비용 갱신
  for (let next = 0; next < n; next++) {
    const cost = matrix[curr][next];
    if (!visited[next] && cost !== 0 && minEdge[next] > cost) {
      minEdge[next] = cost;
    }
  }
}

console.log(totalCost); // 이것이 모든 노드를 연결한 최소 비용
