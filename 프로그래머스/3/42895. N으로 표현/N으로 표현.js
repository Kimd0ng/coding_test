function solution(N, number) {
    if (N === number) return 1;
    
    // DP 배열 초기화: N을 사용하는 횟수(1~8)에 따라 Set을 생성
    // dp[i]는 N을 i번 사용해서 만들 수 있는 수들의 집합
    let dp = Array.from({length : 9}, () => new Set());
    
    // 1번부터 8번까지 N을 사용하는 경우를 계산
    for (let i = 1; i <= 8; i++) {
        // N을 i번 연속해서 이어 붙인 숫자 추가 (예: 5, 55, 555)
        dp[i].add(Number(String(N).repeat(i)));

        // N을 j번 사용한 집합과 (i-j)번 사용한 집합을 사칙연산하여 추가
        for (let j = 1; j < i; j++) {
            for (const op1 of dp[j]) {
                for (const op2 of dp[i - j]) {
                    dp[i].add(op1 + op2);
                    dp[i].add(op1 - op2);
                    dp[i].add(op1 * op2);
                    
                    // 0으로 나누는 경우 제외, 나머지는 무시(Math.floor)
                    if (op2 !== 0) {
                        dp[i].add(Math.floor(op1 / op2));
                    }
                }
            }
        }
        
        // i번 사용해서 만든 집합 중에 number가 있다면 i 반환
        if (dp[i].has(number)) {
            return i;
        }
    }
    
    
    // 8번까지 사용해도 number를 만들 수 없다면 -1 반환
    return -1;
}
