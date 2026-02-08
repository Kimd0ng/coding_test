function solution(progresses, speeds) {
    var answer = [];
    
    while(progresses.length > 0){
        let temp = 0;
        while(progresses[0] >= 100) {
            progresses.shift();
            speeds.shift();
            temp++;
        }
        
        if (temp > 0)
            answer.push(temp);
        
        progresses = progresses.map((x, y) => x + speeds[y]);   
    }
    
    
    return answer;
}