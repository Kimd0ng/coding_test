const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let line = 0;
const T = Number(input[line++]);

for (let t = 0; t < T; t++) {
    const [n, d, c] = input[line++].split(' ').map(Number);
    const adj = Array.from({ length: n + 1 }, () => []);

    // b가 감염되면 a가 s초 뒤에 감염됨 (b -> a 방향의 가중치 s)
    for (let i = 0; i < d; i++) {
        const [a, b, s] = input[line++].split(' ').map(Number);
        adj[b].push([a, s]);
    }

    const dist = Array(n + 1).fill(Infinity);
    dist[c] = 0;

    // 단순 다익스트라
    const queue = [[c, 0]];

    while (queue.length > 0) {
        const [curr, currDist] = queue.shift();

        if (dist[curr] < currDist) continue;

        for (const [next, time] of adj[curr]) {
            if (dist[next] > dist[curr] + time) {
                dist[next] = dist[curr] + time;
                queue.push([next, dist[next]]);
            }
        }
    }

    let count = 0;
    let maxTime = 0;

    for (let i = 1; i <= n; i++) {
        if (dist[i] !== Infinity) {
            count++;
            maxTime = Math.max(maxTime, dist[i]);
        }
    }

    console.log(`${count} ${maxTime}`);
}
