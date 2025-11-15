function solution(n, s, a, b, fares) {
    var answer = Infinity;
    
    //다익스트라 풀이
    //const graph = Array.from({length: n+1}, () => Array().fill([]));
    
    //플로이드 워셜 풀이
    const board = Array.from({length: n+1}, () => Array(n+1).fill(Infinity));
    
    for (let i = 1; i <= n; i++)
        board[i][i] = 0;
    
    fares.forEach(([start,end,dist]) => {
        board[start][end] = dist;
        board[end][start] = dist;
    });
    
    for (let m = 1; m <= n; m++) {
        for (let start = 1; start <= n; start++) {
            for (let end = 1; end <= n; end++) {
                if (board[start][end] > board[start][m] + board[m][end])
                    board[start][end] = board[start][m] + board[m][end];
            }
        }
    }
    
    answer = board[s][a] + board[s][b];
    
    for (let i = 1; i <= n; i++) {
        if (answer > board[s][i] + board[i][a] + board[i][b])
            answer = board[s][i] + board[i][a] + board[i][b];
    }
    

//다익스트라 풀이
//     fares.forEach(([a,b,c]) => {
//         graph[a].push({to:b, dist:c});
//         graph[b].push({to:a, dist:c});
//     });
    
//     //다익스트라
//     const dy = (queue, graph, dist) => {
//         while(queue.length > 0){
//             const {to} = queue.pop();
//             graph[to].forEach((Next) =>{
//                 const acc = dist[to] + Next.dist;
//                 if (dist[Next.to] > acc){
//                     dist[Next.to] = acc;
//                     queue.push(Next);
//                 }
//             });
//         }
//     }
    
//     //각 노드 사이의 최솟값
//     const dist_node = Array.from({length:n+1}, ()=> Array(n+1).fill(Infinity));
    
//     for (let i = 1; i < n+1; i++){
//         const queue_node = [{to:i, dist:0}];
//         dist_node[i][i] = 0;
//         dy(queue_node, graph, dist_node[i]);
//     }
    
//     //합승 + node의 최소 구하기
//     const dist_total = Array(n+1).fill(Infinity);
    
//     for (let i = 1; i < n+1; i++)
//         dist_total[i] = dist_node[s][i] + dist_node[i][a] + dist_node[i][b];
    
//     for (let i = 0; i < dist_total.length; i++)
//         if (dist_total[i] <= answer) answer = dist_total[i];
    
    return answer;
}