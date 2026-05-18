function solution(relation) {
    const rowLen = relation.length;
    const colLen = relation[0].length;
    
    // 1. 가능한 모든 컬럼의 조합을 비트마스크 숫자로 생성 (1부터 2^colLen - 1까지)
    let combinations = [];
    for (let i = 1; i < (1 << colLen); i++) {
        combinations.push(i);
    }
    
    // 2. 컬럼 개수(지정된 비트 수)가 적은 순서대로 정렬 
    // -> 최소성을 쉽게 만족시키기 위해 작은 조합부터 먼저 검사합니다.
    combinations.sort((a, b) => {
        const countBits = (num) => num.toString(2).split('1').length - 1;
        return countBits(a) - countBits(b);
    });
    
    const candidateKeys = [];
    
    // 3. 각 조합에 대해 유일성과 최소성 검사
    for (const mask of combinations) {
        
        // [최소성 검사] 
        // 이미 후보키로 등록된 키(k)가 현재 검사하려는 조합(mask)의 부분집합인지 확인
        // (k & mask) === k 라면, k의 모든 비트가 mask에 포함되어 있다는 뜻입니다.
        if (candidateKeys.some(k => (k & mask) === k)) {
            continue;
        }
        
        // [유일성 검사]
        const set = new Set();
        for (let r = 0; r < rowLen; r++) {
            let keyStr = "";
            for (let c = 0; c < colLen; c++) {
                // mask의 c번째 비트가 켜져 있다면 해당 컬럼 값을 합침
                if ((mask & (1 << c)) !== 0) {
                    keyStr += relation[r][c] + "/"; // 값 구분을 위한 구분자 추가
                }
            }
            set.add(keyStr);
        }
        
        // 모든 튜플이 중복 없이 유일하게 식별된다면 후보키 배열에 추가
        if (set.size === rowLen) {
            candidateKeys.push(mask);
        }
    }
    
    return candidateKeys.length;
}