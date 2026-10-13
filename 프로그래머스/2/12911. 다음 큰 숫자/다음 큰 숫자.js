function solution(n) {
    const countOnes = (num) => num.toString(2).split("1").length - 1;
    
    // 현재 n의 1의 개수
    const targetCount = countOnes(n);
    
    // n을 1씩 증가시키면서 탐색
    let nextNum = n + 1;
    while (true) {
        if (countOnes(nextNum) === targetCount) {
            return nextNum;
        }
        nextNum++;
    }
}