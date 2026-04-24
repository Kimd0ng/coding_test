function solution(dice) {
    var answer = [];
    let n = dice.length;
    let maxWins = -1; // 최대 승리 횟수 저장용
    
    // 주사위 인덱스 배열 생성 [0, 1, 2, ..., n-1]
    let diceIndices = Array.from({length: n}, (_, i) => i);
    
    // 1. n/2개 주사위 나눠 가지기 (A가 고를 주사위 인덱스 조합)
    let diceCombination = makeCombination(diceIndices, n / 2);
    
    // A의 모든 조합을 하나씩 확인
    for (let i = 0; i < diceCombination.length; i++) {
        let aComb = diceCombination[i];
        
        // B의 주사위는 전체 주사위 중 A가 고른 것을 제외한 나머지
        let bComb = diceIndices.filter(idx => !aComb.includes(idx));
        
        // 2. DFS를 통해 A와 B가 굴려서 나올 수 있는 모든 합 구하기
        let aSums = [];
        let bSums = [];
        getSums(0, 0, aComb, dice, aSums);
        getSums(0, 0, bComb, dice, bSums);
        
        // 3. 이분 탐색을 통해 승리 횟수 구하기
        // B의 합 배열을 오름차순 정렬해야 이분 탐색이 가능함
        bSums.sort((a, b) => a - b);
        
        let wins = 0;
        for (let aSum of aSums) {
            // 이분 탐색: aSum보다 작은 bSum의 개수(인덱스) 찾기
            let left = 0;
            let right = bSums.length;
            
            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (bSums[mid] < aSum) {
                    left = mid + 1; // A가 이김
                } else {
                    right = mid;    // 비기거나 짐
                }
            }
            wins += left; // left 값이 곧 aSum보다 작은 값들의 총 개수
        }
        
        // 최대 승리 횟수 갱신 및 정답 저장
        if (wins > maxWins) {
            maxWins = wins;
            // 문제의 정답은 1번 주사위부터 시작하므로 인덱스에 +1을 해줌
            answer = aComb.map(idx => idx + 1);
        }
    }
    
    return answer;
}

// ---------------- 보조 함수 ---------------- //

// [1단계 채우기] 조합 구하는 함수 (재귀)
function makeCombination(arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]);

    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        // 나머지에 대해서 selectNumber - 1개의 조합을 구함
        const combinations = makeCombination(rest, selectNumber - 1);
        // 뽑은 조합에 현재 고정된 값(fixed)을 붙임
        const attached = combinations.map((combination) => [fixed, ...combination]);
        results.push(...attached);
    });

    return results;
}

// [2단계 채우기] 주사위 합 구하는 함수 (DFS)
function getSums(depth, currentSum, comb, dice, sumsArray) {
    // n/2개의 주사위를 모두 굴렸다면 합을 배열에 저장
    if (depth === comb.length) {
        sumsArray.push(currentSum);
        return;
    }
    
    // 현재 주사위의 인덱스
    let diceIdx = comb[depth];
    
    // 6개의 면을 순회하며 다음 주사위로 넘어감
    for (let i = 0; i < 6; i++) {
        getSums(depth + 1, currentSum + dice[diceIdx][i], comb, dice, sumsArray);
    }
}