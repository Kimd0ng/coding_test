// function solution(relation) {
//     const rowLen = relation.length;
//     const colLen = relation[0].length;
    
//     // 1. 가능한 모든 컬럼의 조합을 비트마스크 숫자로 생성 (1부터 2^colLen - 1까지)
//     let combinations = [];
//     for (let i = 1; i < (1 << colLen); i++) {
//         combinations.push(i);
//     }
    
//     // 2. 컬럼 개수(지정된 비트 수)가 적은 순서대로 정렬 
//     // -> 최소성을 쉽게 만족시키기 위해 작은 조합부터 먼저 검사합니다.
//     combinations.sort((a, b) => {
//         const countBits = (num) => num.toString(2).split('1').length - 1;
//         return countBits(a) - countBits(b);
//     });
    
//     const candidateKeys = [];
    
//     // 3. 각 조합에 대해 유일성과 최소성 검사
//     for (const mask of combinations) {
        
//         // [최소성 검사] 
//         // 이미 후보키로 등록된 키(k)가 현재 검사하려는 조합(mask)의 부분집합인지 확인
//         // (k & mask) === k 라면, k의 모든 비트가 mask에 포함되어 있다는 뜻입니다.
//         if (candidateKeys.some(k => (k & mask) === k)) {
//             continue;
//         }
        
//         // [유일성 검사]
//         const set = new Set();
//         for (let r = 0; r < rowLen; r++) {
//             let keyStr = "";
//             for (let c = 0; c < colLen; c++) {
//                 // mask의 c번째 비트가 켜져 있다면 해당 컬럼 값을 합침
//                 if ((mask & (1 << c)) !== 0) {
//                     keyStr += relation[r][c] + "/"; // 값 구분을 위한 구분자 추가
//                 }
//             }
//             set.add(keyStr);
//         }
        
//         // 모든 튜플이 중복 없이 유일하게 식별된다면 후보키 배열에 추가
//         if (set.size === rowLen) {
//             candidateKeys.push(mask);
//         }
//     }
    
//     return candidateKeys.length;
// }



function solution(relation) {
    const rowLen = relation.length;
    const colLen = relation[0].length;
    
    // 0부터 colLen - 1까지의 컬럼 인덱스 배열 생성 (예: [0, 1, 2, 3])
    const cols = Array.from({ length: colLen }, (_, i) => i);
    
    // 1. 조합(Combination)을 구하는 헬퍼 함수
    function getCombinations(arr, selectNumber) {
        const results = [];
        if (selectNumber === 1) return arr.map((value) => [value]);

        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1); // fixed 이후의 배열
            const combinations = getCombinations(rest, selectNumber - 1); // 나머지 배열에 대한 조합
            const attached = combinations.map((combination) => [fixed, ...combination]); // fixed와 조합을 붙임
            results.push(...attached);
        });
        return results;
    }

    // 2. 길이가 1인 조합부터 colLen인 조합까지 순차적으로 생성
    // 이렇게 하면 1개짜리, 2개짜리 순으로 자연스럽게 배열에 담겨 길이가 짧은 순서대로 정렬됩니다.
    let allCombinations = [];
    for (let i = 1; i <= colLen; i++) {
        allCombinations.push(...getCombinations(cols, i));
    }

    const candidateKeys = []; // 통과한 후보키 배열들을 담을 공간 (예: [[0], [1, 2]])

    // 3. 각 조합에 대해 최소성과 유일성 검사
    for (const combo of allCombinations) {
        
        // [최소성 검사]
        // 기존에 등록된 후보키(ck)의 모든 요소가 현재 검사 중인 조합(combo)에 모두 포함되어 있는지 확인
        let isMinimal = true;
        for (const ck of candidateKeys) {
            // ck.every()는 배열 ck의 모든 요소가 주어진 조건을 만족하는지 판별합니다.
            if (ck.every(col => combo.includes(col))) {
                isMinimal = false;
                break;
            }
        }
        
        // 최소성을 만족하지 않으면 아래 유일성 검사는 건너뜀
        if (!isMinimal) continue;

        // [유일성 검사]
        const set = new Set();
        for (let r = 0; r < rowLen; r++) {
            // 현재 조합(combo)에 들어있는 컬럼 인덱스를 기준으로 데이터를 가져와 문자열로 연결
            // 예: combo가 [1, 2]라면 => "apeach/math" 형태로 결합
            const keyStr = combo.map(c => relation[r][c]).join('/');
            set.add(keyStr);
        }

        // Set의 크기가 전체 행의 길이와 같다면 (중복이 하나도 없다면) 후보키로 등록!
        if (set.size === rowLen) {
            candidateKeys.push(combo);
        }
    }

    return candidateKeys.length;
}