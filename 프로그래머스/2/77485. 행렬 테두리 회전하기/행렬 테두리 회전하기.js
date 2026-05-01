function solution(rows, columns, queries) {
    var answer = [];
    
    // 초기 배열 할당
    let map = [];
    let cnt = 1;
    for (let i = 0; i < rows; i++) {
        map[i] = [];
        for (let j = 0; j < columns; j++) {
            map[i][j] = cnt++;
        }
    }
    
    // 2. 각 쿼리 처리
    queries.forEach(query => {
        const [x1, y1, x2, y2] = query.map(v => v - 1);
        let temp = map[x1][y1];
        let min = temp;

        // 왼쪽 변 (아래 -> 위)
        for (let i = x1; i < x2; i++) {
            map[i][y1] = map[i + 1][y1];
            min = Math.min(min, map[i][y1]);
        }
        // 아래쪽 변 (오른쪽 -> 왼쪽)
        for (let i = y1; i < y2; i++) {
            map[x2][i] = map[x2][i + 1];
            min = Math.min(min, map[x2][i]);
        }
        // 오른쪽 변 (위 -> 아래)
        for (let i = x2; i > x1; i--) {
            map[i][y2] = map[i - 1][y2];
            min = Math.min(min, map[i][y2]);
        }
        // 위쪽 변 (왼쪽 -> 오른쪽)
        for (let i = y2; i > y1 + 1; i--) {
            map[x1][i] = map[x1][i - 1];
            min = Math.min(min, map[x1][i]);
        }
        
        map[x1][y1 + 1] = temp; // 미리 빼둔 값 배치
        answer.push(min);
    });

    return answer;
}