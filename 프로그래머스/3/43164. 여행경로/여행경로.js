function solution(tickets) {
    var answer = [];
    const graph = {};
    
    // tickets를 이용해 dfs에서 사용할 graph구성
    for (const ticket of tickets) {
        if (!graph[ticket[0]]) graph[ticket[0]] = [];
        graph[ticket[0]].push(ticket[1]);
    }
    
    for (const key in graph) {
        graph[key].sort(); // 알파벳 순 정렬
    }
    
    console.log(graph);
    
    // dfs구현
    // 백트래킹 필수 -> 지금까지 경로
    function dfs(path, airport) {
        // 경로와 티켓의 수가 갔다면 탈출 (마지막 도착지까지 추가)
        if (path.length === tickets.length) {
            answer = [...path, airport];
            return true;
        }
        
        // dfs로 들어온 airport가 출발지 일때 도착지를 복사
        const temp = graph[airport] ? [...graph[airport]] : [];
        
        temp?.forEach(start => {
            // temp를 출발지로 할 dfs를 돌림
            // 우선 graph의 제일 앞을 제거
            graph[airport].shift();
            if(dfs([...path, airport], start)) return true;
            
            // 경로가 조건에 맞지 않을 경우
            // 제거했던 부분을 다시 넣어줌
            graph[airport].push(start);
        });
        
        return false;
    }
    
    dfs([],"ICN");
    
    return answer;
}