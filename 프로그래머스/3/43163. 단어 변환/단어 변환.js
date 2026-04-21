function solution(begin, target, words) {
    var answer = 0;
    
    const visited = { [begin] : 0};
    const queue = [begin];
    
    // 연결된 문자열인지 파악
    const isConnected = (str1, str2) => {
        let count = 0;
        const len = str1.length;
        
        for (let i = 0; i < len; i++)
            if (str1[i] !== str2[i]) count++;
        
        return count === 1 ? true : false;
    }
    
    // bfs로 탐색
    // 연결된 문자열 파악 -> 맞으면 제거하고 다음 탐색 
    while(queue.length){
        const cur = queue.shift();
        
        if (cur === target) break;
        
        for (const word of words) {
            if (isConnected(word, cur) && !visited[word]){
                visited[word] = visited[cur] + 1;
                queue.push(word);
            }
        }
    }
    return visited[target] ? visited[target] : 0;
}


    