function solution(maps) {
    const answer = [];
    // 문자열을 배열로 변환하여 방문 처리를 용이하게 함
    const grid = maps.map(row => row.split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    
    // 상하좌우 이동을 위한 방향 벡터
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    // 지도 전체를 순회
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 바다가 아닌 땅(숫자)을 발견한 경우 BFS 시작
            if (grid[i][j] !== 'X') {
                let sum = 0; // 해당 섬의 총 식량
                let queue = [[i, j]];
                
                sum += Number(grid[i][j]);
                grid[i][j] = 'X'; // 방문한 곳은 'X'로 변경하여 중복 방문 방지

                while (queue.length > 0) {
                    const [cx, cy] = queue.shift();

                    // 상하좌우 4방향 탐색
                    for (let d = 0; d < 4; d++) {
                        const nx = cx + dx[d];
                        const ny = cy + dy[d];

                        // 지도 범위 내에 있고, 바다가 아닌 경우
                        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] !== 'X') {
                            sum += Number(grid[nx][ny]);
                            grid[nx][ny] = 'X'; // 방문 처리
                            queue.push([nx, ny]);
                        }
                    }
                }
                // 탐색이 종료되면 합산된 식량을 배열에 추가
                answer.push(sum);
            }
        }
    }

    // 섬이 존재하면 오름차순 정렬, 존재하지 않으면 [-1] 반환
    return answer.length > 0 ? answer.sort((a, b) => a - b) : [-1];
}