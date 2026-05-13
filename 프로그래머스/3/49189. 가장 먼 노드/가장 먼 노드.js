function solution(n, edge) {
    // 1. 인접 리스트 그래프 구축
    let graph = Array.from({ length: n + 1 }, () => []);
    for (const [src, dest] of edge) {
        graph[src].push(dest);
        graph[dest].push(src);
    }

    // 2. 거리 기록 배열 (방문하지 않은 곳은 -1로 초기화)
    let distances = Array(n + 1).fill(-1);
    let queue = [1];
    distances[1] = 0; // 시작 노드(1번)의 거리는 0

    // 3. BFS 탐색
    while (queue.length > 0) {
        let current = queue.shift();

        for (let neighbor of graph[current]) {
            // 아직 방문하지 않은 노드라면
            if (distances[neighbor] === -1) {
                distances[neighbor] = distances[current] + 1;
                queue.push(neighbor);
            }
        }
    }

    // 4. 최대 거리 찾기 및 개수 세기
    const maxDistance = Math.max(...distances);
    return distances.filter(dist => dist === maxDistance).length;
}