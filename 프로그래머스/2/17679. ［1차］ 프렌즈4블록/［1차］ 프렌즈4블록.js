function solution(m, n, board) {
    var answer = 0;
    
    // 전체 순회하면서 2x2 탐색
    // 제거할 부분 기록
    // 기록된 부분 동시 제거
    // 이후 아래쪽으로 동시이동
    
    // 문자열로 들어온 배열을 2차원 배열로 수정
    board = board.map(v => v.split(""))
    
    while(board) {
        let deleteBlock = findDelete(board, m, n);
        if (deleteBlock.length == 0) break;
        
        for (let deletePoint of deleteBlock) {
            if (board[deletePoint[0]][deletePoint[1]] != "."){
                answer++;
                board[deletePoint[0]][deletePoint[1]] = ".";
            }
        }
        
        blockDown(board, m, n);
    }    
    
    return answer;
}


function findDelete(board, m, n){
    
    let deleteBlock = [];
    
    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n - 1; j++) {
            let temp = board[i][j];
            
            if (temp != ".") {
                if ((board[i + 1][j] == temp) && (board[i][j + 1] == temp) && (board[i + 1][j + 1] == temp)) {
                    deleteBlock.push([i,j]);
                    deleteBlock.push([i + 1,j]);
                    deleteBlock.push([i,j + 1]);
                    deleteBlock.push([i + 1,j + 1]);
                }
            }
        }
    }
    
    return deleteBlock;
}


function blockDown(board, m, n) {
    for (let j = 0; j < n; j++) { // 열(Column) 기준 순회
        let columnBlocks = [];
        
        // 1. 현재 열에서 비어있지 않은 블록만 추출
        for (let i = 0; i < m; i++) {
            if (board[i][j] !== ".") {
                columnBlocks.push(board[i][j]);
            }
        }
        
        // 2. 추출한 블록을 아래쪽부터 채우기 (나머지는 위에서부터 ".")
        // 예: m이 6이고 블록이 3개면, index 0~2는 ".", index 3~5는 블록
        let emptyCount = m - columnBlocks.length;
        
        for (let i = 0; i < m; i++) {
            if (i < emptyCount) {
                board[i][j] = ".";
            } else {
                board[i][j] = columnBlocks[i - emptyCount];
            }
        }
    }
}