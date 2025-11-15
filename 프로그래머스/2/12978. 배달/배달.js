function solution(N, road, K) {
    
    var answer = 0;
    
    const graph = Array.from({length: N+1}, () => Array().fill([]));
    
    road.forEach(([a,b,c]) => {
        graph[a].push({to:b, dist:c});
        graph[b].push({to:a, dist:c});
    })
                             
    // for (let i = 0; i < road.length; i++){
    //     graph[road[i][0]].push({to: road[i][1], dist:road[i][2]});
    //     graph[road[i][1]].push({to: road[i][0], dist:road[i][2]});
    // }
    
    const dist = Array(N + 1).fill(Infinity);
    
    const queue = [{to:1, dist:0}];
    
    dist[1] = 0;
    
    while (queue.length > 0) {
        const {to} = queue.pop();
        
        graph[to].forEach((Next) => {
            const acc = dist[to] + Next.dist;
            if (dist[Next.to] > acc) {
                dist[Next.to] = acc;
                queue.push(Next);
            }
        });
    }
    
    console.log(dist);
    
    for (let i = 0; i < dist.length; i++)
        if (dist[i] <= K) answer++;
    
    return answer;
}