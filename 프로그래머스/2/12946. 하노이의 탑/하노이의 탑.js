function solution(n) {
    const answer = [];

    function hanoi(num, from, to, via) {
        if (num === 1) {
            answer.push([from, to]);
            return;
        }
        
        hanoi(num - 1, from, via, to);
        answer.push([from, to]);
        hanoi(num - 1, via, to, from);
    }

    hanoi(n, 1, 3, 2);
    
    return answer;
}