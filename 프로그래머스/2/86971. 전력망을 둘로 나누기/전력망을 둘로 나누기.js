    // 처음 연결부터 하나씩 끊을 연결을 결정
    // 각 경우들의 dfs/bfs를 이용하여 2개 그룹의 송전탑을 카운트
    // 카운트한 2개의 송전탑의 개수 차이를 계산
    // 최솟값 출력

function solution(n, wires) {
    // 최솟값을 구해야 하므로, 발생할 수 있는 가장 큰 차이값인 n으로 초기화합니다.
    let answer = n; 
    
    // 리턴으로 몇 개가 연결되어 있는지 확인하는 BFS 함수
    function bfs(startNode) {
        // 1번부터 n번 송전탑까지 표현하기 위해 n + 1 크기의 인접 리스트 생성
        const graph = Array.from({ length: n + 1 }, () => []);
        
        // 현재 wires 배열을 바탕으로 그래프 구성
        for (const wire of wires) {
            if (wire.length === 0) continue; // wires[i] = [] 로 끊어놓은 전선은 건너뜁니다.
            const [v1, v2] = wire;
            graph[v1].push(v2);
            graph[v2].push(v1);
        }
        
        let visited = Array(n + 1).fill(false);
        let queue = [startNode];
        visited[startNode] = true;
        let count = 0; // 방문한 송전탑 개수
        
        while (queue.length > 0) {
            let curr = queue.shift();
            count++;
            
            for (let next of graph[curr]) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.push(next);
                }
            }
        }
        
        return count; // 연결된 송전탑의 총 개수 반환
    }
    
    // 끊을 연결을 하나씩 결정 (완전탐색)
    for (let i = 0; i < wires.length; i++) {
        let temp = wires[i];
        
        wires[i] = []; // i번째 전선을 임시로 끊음
        
        // 끊어진 전선의 한쪽 노드(temp[0])를 시작점으로 BFS 수행
        let count1 = bfs(temp[0]); 
        let count2 = n - count1; // 전체 개수에서 한쪽을 빼면 반대쪽 개수가 됨
        
        // 두 전력망이 가진 송전탑 개수 차이의 절대값
        let diff = Math.abs(count1 - count2); 
        
        // 최솟값 비교 및 갱신
        answer = Math.min(answer, diff); 
        
        wires[i] = temp; // 다음 루프를 위해 전선 복구
    }
    
    return answer;
}