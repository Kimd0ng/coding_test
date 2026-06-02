// 처음 시작을 지정
// 구간의 길이 단위로 나눠서 값을 개별 저장
    // 다음 구간 계산에 활용
// +일때 -일때 어떻게 해야 무조건 최대값이 나올지 생각하기
// +와 - 앞뒤의 구간합 최적의 해가 보장되는지 확인














function solution(arr) {
    // 숫자 연산자 분리
    const nums = [];
    const ops = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            nums.push(Number(arr[i]));
        } else {
            ops.push(arr[i]);
        }
    }
    
    const n = nums.length;
    
    // DP 테이블 초기화 (최댓값은 무한소, 최솟값은 무한대로 빈 배열 생성)
    const maxDP = Array.from({ length: n }, () => Array(n).fill(-Infinity));
    const minDP = Array.from({ length: n }, () => Array(n).fill(Infinity));
    
    // 길이가 1인 구간 초기화
    for (let i = 0; i < n; i++) {
        maxDP[i][i] = nums[i];
        minDP[i][i] = nums[i];
    }
    
    // len은 두 숫자 인덱스의 '차이' (구간의 크기)
    for (let len = 1; len < n; len++) {
        // i는 구간의 시작점
        for (let i = 0; i < n - len; i++) {
            let j = i + len; // j는 구간의 끝점
        
            // k는 i와 j 사이를 나누는 기준점 (분할점)
            for (let k = i; k < j; k++) {
                const op = ops[k]; // k번째 숫자 뒤에 있는 연산자
                 
                if (op === '+') {
                    // 더하기일 때는 max는 max끼리, min은 min끼리
                    maxDP[i][j] = Math.max(maxDP[i][j], maxDP[i][k] + maxDP[k+1][j]);
                    minDP[i][j] = Math.min(minDP[i][j], minDP[i][k] + minDP[k+1][j]);
                } else if (op === '-') {
                    // 빼기일 때는 max-min 조합과 min-max 조합으로 교차 계산
                    maxDP[i][j] = Math.max(maxDP[i][j], maxDP[i][k] - minDP[k+1][j]);
                    minDP[i][j] = Math.min(minDP[i][j], minDP[i][k] - maxDP[k+1][j]);
                }
            }
        }
    }
    
    // 구간 DP 진행 (len은 구간의 크기 차이)
    for (let len = 1; len < n; len++) {
        for (let i = 0; i < n - len; i++) {
            let j = i + len;
            
            // i부터 j까지의 구간을 k를 기준으로 쪼갬
            for (let k = i; k < j; k++) {
                const op = ops[k];
                
                if (op === '+') {
                    maxDP[i][j] = Math.max(maxDP[i][j], maxDP[i][k] + maxDP[k+1][j]);
                    minDP[i][j] = Math.min(minDP[i][j], minDP[i][k] + minDP[k+1][j]);
                } else if (op === '-') {
                    maxDP[i][j] = Math.max(maxDP[i][j], maxDP[i][k] - minDP[k+1][j]);
                    minDP[i][j] = Math.min(minDP[i][j], minDP[i][k] - maxDP[k+1][j]);
                }
            }
        }
    }
    
    // 전체 구간(0번 숫자부터 n-1번 숫자까지)의 최댓값 반환
    return maxDP[0][n - 1];
}