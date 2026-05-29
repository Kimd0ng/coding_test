function solution(m, n, puddles) {
    // 1. (n + 1) x (m + 1) 크기의 DP 배열을 0으로 초기화
    // n이 행(세로), m이 열(가로)
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    const MOD = 1000000007;

    // 2. 물웅덩이 위치를 -1로 표시
    // puddles의 좌표는 [가로(x), 세로(y)] 순서이므로 dp[y][x]로 접근해야 함
    for (let [x, y] of puddles) {
        dp[y][x] = -1;
    }

    // 3. 시작 위치 초기화
    dp[1][1] = 1;

    // 4. DP 실행 (위쪽과 왼쪽에서 오는 경로의 수를 더함)
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            // 시작점은 이미 1로 세팅했으므로 패스
            if (i === 1 && j === 1) continue;

            // 물웅덩이를 만난 경우
            if (dp[i][j] === -1) {
                dp[i][j] = 0; // 해당 위치를 통과하는 경로는 0개
                continue;
            }

            // 위쪽(i-1, j)에서 오는 경로의 수
            let up = dp[i - 1][j];
            // 왼쪽(i, j-1)에서 오는 경로의 수
            let left = dp[i][j - 1];

            // 두 경로를 더한 후 1,000,000,007로 나눈 나머지를 저장
            dp[i][j] = (up + left) % MOD;
        }
    }

    // 도착점(n, m)의 경로 수 반환
    return dp[n][m];
}