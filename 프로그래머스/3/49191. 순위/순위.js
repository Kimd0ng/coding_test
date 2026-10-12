function solution(n, results) {
    var answer = 0;
    
    let board = Array.from({length : n}, () => Array(n).fill(0));
    
    results.forEach(([i,j]) => {
        board[i - 1][j - 1] = 1;
        board[j - 1][i - 1] = -1;
    });
    
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][k] === 1 && board[k][j] === 1) {
                    board[i][j] = 1;
                    board[j][i] = -1;
                }
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        let knownResults = 0;
        for (let j = 0; j < n; j++) {
            if (board[i][j] !== 0) {
                knownResults++;
            }
        }
        
        if (knownResults === n - 1) {
            answer++;
        }
    }
    
    return answer;
}