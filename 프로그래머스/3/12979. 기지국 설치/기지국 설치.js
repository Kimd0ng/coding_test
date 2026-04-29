function solution(n, stations, w) {
    let answer = 0;
    let current = 1;
    const range = 2 * w + 1;
    
    for (const station of stations) {
        const end = station - w;
        
        if (end > current) {
            const gap = end - current;
            answer += Math.floor((gap - 1)/range) + 1;
        }
        
        current = station + w + 1;
    }
        
    if (current <= n){
        const gap = n - current + 1;
        answer += Math.floor((gap - 1)/range) + 1;
    }
    
    return answer;
}