const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const arr = input.slice(1).map((item) => item.split(" ").map(Number));

const home = [];
const chicken = [];

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (arr[i][j] === 1) {
            home.push([i, j]);
        } else if (arr[i][j] === 2) {
            chicken.push([i, j]);
        }
    }
}

// 집과 치킨집 사이의 거리의 합을 구하는 함수
const findMin = () => {
    let sum = 0;
    for (let i = 0; i < home.length; i++) {
        let min = Infinity;
        const [hx, hy] = home[i];
        for (let j = 0; j < chicken.length; j++) {
            if (check[j] === true) {
                const [cx, cy] = chicken[j];
                const temp = Math.abs(hx - cx) + Math.abs(hy - cy);
                min = Math.min(min, temp);
            }
        }
        sum += min;
    }
    return sum;
}

const check = new Array(chicken.length).fill(false);
let answer = Infinity;

const DFS = (idx, cnt) => {
    if (cnt === m) {
        answer = Math.min(answer, findMin(home, chicken));
        return;
    } else {
        for (let i = idx; i < chicken.length; i++) {
            if (check[i] === true) continue;
            check[i] = true;
            DFS(i, cnt + 1);
            check[i] = false;
        }
    }
}

DFS(0, 0);
console.log(answer);
