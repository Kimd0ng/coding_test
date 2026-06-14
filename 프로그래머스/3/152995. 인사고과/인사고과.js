// 1. 누가 인센을 받는지

// 2. 합 정렬구하는것
// 완호 <- 어떻게 찾을것인가.

function solution(scores) {
    // 3. 완호 <- 어떻게 찾을것인가.
    // 정렬 전 배열의 첫 번째 요소 참조를 저장해 둡니다.
    const wanho = scores[0];
    const wanhoSum = wanho[0] + wanho[1];
    
    // 근무 태도 점수(내림차순) 정렬, 같을 경우 동료 평가 점수(오름차순) 정렬
    scores.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
    
    let answer = 1;
    let maxPeerScore = 0;
    
    // 1. 누가 인센을 받는지 필터링
    for (const score of scores) {
        // 근무 태도는 이미 내림차순 정렬되어 있으므로, 
        // 동료 평가 점수가 지금까지의 최댓값보다 작다면 두 점수 모두 누군가보다 낮은 것입니다. (탈락)
        if (score[1] < maxPeerScore) {
            // 탈락한 사람이 완호라면 인센티브를 받지 못하므로 -1 반환
            if (score === wanho) return -1;
        } else {
            // 인센티브를 받는 사람인 경우, 동료 평가 점수 최댓값 갱신
            maxPeerScore = Math.max(maxPeerScore, score[1]);
            
            // 2. 합 정렬구하는것
            // 굳이 모든 배열을 다시 합으로 정렬할 필요 없이,
            // 인센티브를 받는 사람 중 완호보다 두 점수의 합이 큰 사람의 수를 세면 바로 석차가 됩니다.
            if (score[0] + score[1] > wanhoSum) {
                answer++;
            }
        }
    }
    
    return answer;
}
