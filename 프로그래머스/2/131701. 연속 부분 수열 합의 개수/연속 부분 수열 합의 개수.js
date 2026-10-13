function solution(elements) {
    var answer = new Set();
    
    let n = 1;
    
    while (n <= elements.length) {
        for (let i = 0; i < elements.length; i++) {
            let sum = 0;
            for (let j = i; j < i + n; j++) {
                sum += elements[j % elements.length];
            }
            answer.add(sum);
        }

        n++;
    }
    
    
    return answer.size;
}