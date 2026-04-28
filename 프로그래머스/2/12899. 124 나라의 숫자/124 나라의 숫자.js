function solution(n) {
    const symbols = ['4', '1', '2']; // 0일 때 4, 1일 때 1, 2일 때 2

    function transform(num) {
        if (num <= 0) return "";

        // 현재 자릿수의 값 (나머지 이용)
        const currentSymbol = symbols[num % 3];
        
        // 다음 자릿수를 계산하기 위한 재귀 호출
        // 3의 배수일 때 자릿수 내림 처리를 위해 (num - 1) / 3을 수행
        const nextNum = Math.floor((num - 1) / 3);
        
        return transform(nextNum) + currentSymbol;
    }

    return transform(n);
}