// [단계 1] 최소 비용을 보장하기 위해 간선(costs)을 비용순으로 '오름차순 정렬'한다. (Greedy)
// [단계 2] 각 섬이 어디에 연결되어 있는지 관리할 '부모 노드 배열'을 만든다. (Union-Find 준비)
// [단계 3] 정렬된 간선을 순회하며 다음을 확인한다.
//    - 두 섬이 이미 연결되어 있는가? (find 함수로 확인)
//    - 연결되어 있지 않다면, 두 섬을 잇고 비용을 더한다. (union 함수로 합치기)
// [단계 4] 모든 섬이 연결될 때까지(간선 개수가 n-1개가 될 때까지) 반복한다.

/*
Union-Find 알고리즘이란?
Union-Find는 서로 중복되지 않는 부분 집합들(Disjoint Sets)을 관리하는 자료구조
쉽게 말해 "여러 개의 섬 중에서 어떤 섬들이 서로 같은 그룹(네트워크)에 속해 있는지"를 관리하는 도구
*/

function solution(n, costs) {
    let answer = 0;
    
    // 1. 간선들을 비용 기준으로 오름차순 정렬 (Greedy의 핵심)
    costs.sort((a, b) => a[2] - b[2]);
    
    // 2. Union-Find를 위한 부모 노드 배열 초기화
    const parent = Array.from({ length: n }, (_, i) => i);
    
    // 부모 노드를 찾는 함수 (Path Compression 적용)
    function find(parent, x) {
        if (parent[x] === x) return x;
        // 경로 압축: 찾으면서 부모를 아예 루트로 바꿔버림
        return parent[x] = find(parent, parent[x]);
    }
    
    // 두 집합을 합치는 함수
    function union(parent, a, b) {
        const rootA = find(parent, a);
        const rootB = find(parent, b);
    
        if (rootA !== rootB) { // 대장이 다르다면 (즉, 다른 그룹이라면)
            parent[rootB] = rootA; // 합친다!
            return true; 
        }
        return false; // 이미 같은 그룹이면 합칠 필요 없음 (사이클 방지)
    }
    
    // 3. 정렬된 간선을 하나씩 확인하며 연결
    let bridgeCount = 0;
    for (const [u, v, cost] of costs) {
        // 사이클이 생기지 않는 경우에만 연결
        if (union(parent, u, v)) {
            answer += cost;
            bridgeCount++;
            // 모든 섬이 연결되면(간선 수 = n-1) 종료
            if (bridgeCount === n - 1) break;
        }
    }
    
    return answer;
}