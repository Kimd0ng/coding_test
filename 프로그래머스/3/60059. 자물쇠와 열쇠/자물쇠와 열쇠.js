function solution(key, lock) {
    const M = key.length;
    const N = lock.length;
    const offset = M - 1;
    const boardSize = N + 2 * offset;

    // 1. 확장된 자물쇠 보드 생성 및 초기화
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    // 보드의 정중앙에 원래 자물쇠 배치
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            board[offset + i][offset + j] = lock[i][j];
        }
    }

    // 2. 2차원 배열을 시계 방향으로 90도 회전하는 함수
    function rotate(arr) {
        const len = arr.length;
        const ret = Array.from({ length: len }, () => Array(len).fill(0));
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                ret[j][len - 1 - i] = arr[i][j];
            }
        }
        return ret;
    }

    // 3. 자물쇠 영역이 모두 맞게 채워졌는지 확인하는 함수
    function check() {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                // 자물쇠 영역 중 하나라도 1이 아니라면 (홈이 비었거나 돌기끼리 만난 경우)
                if (board[offset + i][offset + j] !== 1) {
                    return false;
                }
            }
        }
        return true;
    }

    let currentKey = key;

    // 4. 4가지 방향에 대해 확인 (0, 90, 180, 270도)
    for (let r = 0; r < 4; r++) {
        // 보드 위에서 열쇠를 이동시킬 수 있는 모든 시작점
        for (let i = 0; i <= boardSize - M; i++) {
            for (let j = 0; j <= boardSize - M; j++) {
                
                // 열쇠를 보드에 끼워 넣기 (값 더하기)
                for (let ki = 0; ki < M; ki++) {
                    for (let kj = 0; kj < M; kj++) {
                        board[i + ki][j + kj] += currentKey[ki][kj];
                    }
                }

                // 자물쇠가 열리는지 확인
                if (check()) {
                    return true; 
                }

                // 자물쇠가 열리지 않는다면 다시 열쇠 빼기 (원상복구)
                for (let ki = 0; ki < M; ki++) {
                    for (let kj = 0; kj < M; kj++) {
                        board[i + ki][j + kj] -= currentKey[ki][kj];
                    }
                }
            }
        }
        // 다음 탐색을 위해 열쇠 90도 회전
        currentKey = rotate(currentKey);
    }

    // 모든 경우를 다 탐색해도 열리지 않는다면
    return false;
}