function solution(s) {
    let transformCount = 0; // 이진 변환 횟수
    let zeroCount = 0;      // 제거된 모든 0의 개수

    // s가 "1"이 될 때까지 반복
    while (s !== "1") {
        const originalLength = s.length;
        
        // 1. 모든 0 제거
        s = s.replace(/0/g, "");
        const newLength = s.length;
        
        // 2. 제거된 0의 개수 누적
        zeroCount += (originalLength - newLength);
        
        // 3. 남은 문자열의 길이를 2진법 문자열로 변환
        s = newLength.toString(2);
        
        // 4. 이진 변환 횟수 증가
        transformCount++;
    }

    return [transformCount, zeroCount];
}