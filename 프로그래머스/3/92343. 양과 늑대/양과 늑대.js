      
// 0
// 0, 1
// 0, 1, 2 / 0, 1, 4 / 0, 1, 8
// return 2 / return 2 / 0, 1, 7, 8 / 0, 1, 8, 9
// 0, 1, 2, 7, 8 / 0, 1, 4, 7, 8/ 0, 1, 7, 8, 9 / 

function solution(info, edges) {
    let maxSheep = 0;
    
    // 1. 트리 구성 (부모 -> 자식 단방향)
    const graph = Array.from({ length: info.length }, () => []);
    edges.forEach(([parent, child]) => {
        graph[parent].push(child);
    });

    // 2. DFS 탐색 함수
    function dfs(currentNode, sheep, wolf, nextNodes) {
        // 현재 노드에 있는 동물이 양(0)인지 늑대(1)인지에 따라 카운트 증가
        if (info[currentNode] === 0) sheep++;
        else wolf++;

        // 늑대가 양보다 많거나 같아지면 모두 잡아먹히므로 탐색 종료 (조건 불만족)
        if (wolf >= sheep) return;

        // 최대 양의 수 갱신
        maxSheep = Math.max(maxSheep, sheep);

        // 다음으로 방문할 수 있는 노드 목록 구성
        // 기존 후보 목록을 복사한 뒤, 방금 방문한 '현재 노드'는 제외하고
        // '현재 노드의 자식 노드'들을 새로운 후보로 추가합니다.
        let nextPossibleNodes = [...nextNodes];
        
        // 현재 노드 제거
        const index = nextPossibleNodes.indexOf(currentNode);
        if (index !== -1) {
            nextPossibleNodes.splice(index, 1);
        }
        
        // 자식 노드들 추가
        nextPossibleNodes.push(...graph[currentNode]);

        // 새로 구성된 방문 후보 노드들을 순회하며 재귀적으로 DFS 호출
        for (const nextNode of nextPossibleNodes) {
            dfs(nextNode, sheep, wolf, nextPossibleNodes);
        }
    }

    // 3. 루트 노드(0번)부터 탐색 시작
    // 매개변수: 시작노드(0), 양(0), 늑대(0), 방문 가능 후보 리스트([0])
    dfs(0, 0, 0, [0]);

    return maxSheep;
}