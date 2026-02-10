function solution(priorities, location) {
    var answer = 0;
    
    let process = [];
    
    let queue = priorities.map((val, idx) => ({
        val: val,
        idx: idx
    }));
    
    while (queue.length > 0){
        let temp = queue.shift();
        
        let max = Math.max(...queue.map(doc => doc.val));
        
        if (temp.val < max)
            queue.push(temp);
        else {
            answer++;
            if (temp.idx == location) break;
        }
    }
    
    return answer;
}