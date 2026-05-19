// function solution(land) {
//     var answer = 0;
    
//     // 가로 좌표별로 아래로 내려서 만나는 공간 bfs count
//     // 최대값 리턴
    
//     let n = land.length;
//     let m = land[0].length;
    
//     let dir = [[1,0], [0,1], [-1,0], [0,-1]];
    
//     function bfs(num) {
//         let visited = land.map(row => [...row]);
//         let count = 0;
        
//         for (let i = 0; i < n; i++) {
//             if (visited[i][num] == 1) {
//                 visited[i][num] = 0;
//                 let queue = [[i, num]];
//                 count += 1;
                
//                 while(queue.length > 0) {
//                     let [cx, cy] = queue.shift();
                    
//                     dir.forEach(([dx, dy]) => {
//                         let nx = cx + dx;
//                         let ny = cy + dy;
                        
//                         if (nx >= 0 && nx < n && ny >=0 && ny < m){
//                             if (visited[nx][ny] == 1) {
//                                 visited[nx][ny] = 0;
//                                 queue.push([nx, ny]);
//                                 count++;
//                             }
//                         }
//                     });
//                 }
//             }
//         }
//         return count;
//     }
    
//     for (let i = 0; i < m; i++) {
//         answer = Math.max(answer, bfs(i));
//     }
    
//     return answer;
// }

// 효율성에서 문제가 발생
// 다른 방법을 추가해서 해결
// 매번 bfs를 진행하는 것은 비효율적임
// 각각의 값을 저장할 방법 필요

function solution(land) {
    let n = land.length;
    let m = land[0].length;
    let dir = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    
    let chunkMap = new Map(); // { 덩어리 ID : 덩어리 크기 }
    let chunkId = 2; // land가 0, 1로 이루어져 있으므로 ID는 2부터 시작
    
    // 1. BFS 함수: 덩어리에 ID를 새기고 크기를 반환
    function bfs(sx, sy, id) {
        let count = 1;
        let queue = [[sx, sy]];
        land[sx][sy] = id; // 방문 처리 겸 ID 부여
        
        while (queue.length > 0) {
            let [cx, cy] = queue.shift();
            
            dir.forEach(([dx, dy]) => {
                let nx = cx + dx;
                let ny = cy + dy;
                
                if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                    if (land[nx][ny] === 1) { // 아직 방문 안 한 석유면
                        land[nx][ny] = id; // ID 부여
                        queue.push([nx, ny]);
                        count++;
                    }
                }
            });
        }
        return count;
    }
    
    // 2. 전체 땅을 돌면서 석유 덩어리 찾기 (Labeling)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (land[i][j] === 1) { // 새로운 석유 덩어리 발견
                let size = bfs(i, j, chunkId);
                chunkMap.set(chunkId, size); // ID와 크기 저장
                chunkId++; // 다음 덩어리를 위해 ID 증가
            }
        }
    }
    
    let maxOil = 0;
    
    // 3. 각 열(Column)별로 시추관을 뚫어보며 최댓값 찾기
    for (let j = 0; j < m; j++) { // 열(j)을 기준으로 순회
        let currentChunkIds = new Set(); // 현재 열에서 만난 덩어리 ID들
        
        for (let i = 0; i < n; i++) { // 위에서 아래로(행 i) 내려감
            if (land[i][j] > 1) { // 석유 덩어리(ID)를 만나면
                currentChunkIds.add(land[i][j]); // Set에 추가 (중복 자동 제거)
            }
        }
        
        // 현재 열에서 얻을 수 있는 총 석유량 계산
        let tempOil = 0;
        currentChunkIds.forEach(id => {
            tempOil += chunkMap.get(id);
        });
        
        // 최댓값 갱신
        maxOil = Math.max(maxOil, tempOil);
    }
    
    return maxOil;
}