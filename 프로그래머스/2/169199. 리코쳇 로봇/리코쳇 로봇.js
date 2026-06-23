// 1. map 만들기
// 2. 이동시키기 (무조건 장애물 충돌까지 이동)
// 3. 멈춘 지점이 G면 스톱
// 4. 절대 도착 못하는 경우 G 4방으로 하나의 D도 존재하지 않으면 불가능

// 최솟값으로 풀이해야되니 일단은 bfs, 한칸이동이 아니라 부딪힐때까지 이동으로 계산

function solution(board) {
    var answer = 0;
    
    let n = board[0].length;
    let m = board.length;
    
    let startY = -1, startX = -1;
    let goalY = -1, goalX = -1;
    
    // 1. map 만들기 (R과 G의 시작 위치 파악)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'R') {
                startY = i;
                startX = j;
            } else if (board[i][j] === 'G') {
                goalY = i;
                goalX = j;
            }
        }
    }
    
    // 방향 벡터 (상, 하, 좌, 우)
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    // 4. 절대 도착 못하는 경우 (G 4방으로 하나의 D나 벽이 존재하지 않으면 불가능)
    // -> G에 멈추려면 반드시 G 다음 칸이 막혀있어야 하므로, 이를 검사해 빠른 종료(Early Exit) 처리
    let canStopAtGoal = false;
    for (let i = 0; i < 4; i++) {
        const ny = goalY + dy[i];
        const nx = goalX + dx[i];
        // 맵 가장자리(벽)이거나 장애물(D)이 하나라도 인접해 있으면 멈출 수 있음
        if (ny < 0 || ny >= m || nx < 0 || nx >= n || board[ny][nx] === 'D') {
            canStopAtGoal = true;
            break;
        }
    }
    
    // 멈출 수 없는 구조라면 바로 -1 리턴
    if (!canStopAtGoal) return -1;

    // BFS 초기 세팅
    // shift()는 O(N)이므로, 배열 인덱스(head)를 사용해 시간 초과 방지
    const queue = [[startY, startX, 0]]; // [y좌표, x좌표, 이동 횟수]
    let head = 0; 
    
    // 방문 처리 배열
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    visited[startY][startX] = true;

    // 최솟값 풀이를 위한 BFS 탐색 시작
    while (head < queue.length) {
        const [y, x, count] = queue[head++];

        // 3. 멈춘 지점이 G면 스톱
        if (y === goalY && x === goalX) {
            return count;
        }

        for (let i = 0; i < 4; i++) {
            let ny = y;
            let nx = x;

            // 2. 이동시키기 (장애물 충돌 또는 벽에 부딪힐 때까지 계속 이동)
            while (true) {
                const nextY = ny + dy[i];
                const nextX = nx + dx[i];

                // 맵을 벗어나거나 장애물(D)을 만나면 현재 위치(ny, nx)에서 스톱
                if (nextY < 0 || nextY >= m || nextX < 0 || nextX >= n || board[nextY][nextX] === 'D') {
                    break;
                }
                
                // 조건에 걸리지 않으면 한 칸 전진
                ny = nextY;
                nx = nextX;
            }

            // 멈춘 최종 지점이 처음 방문하는 곳이라면 큐에 삽입
            if (!visited[ny][nx]) {
                visited[ny][nx] = true;
                queue.push([ny, nx, count + 1]);
            }
        }
    }

    // 큐를 다 돌았는데도 G에 도착하지 못했다면 불가능
    return -1;
}