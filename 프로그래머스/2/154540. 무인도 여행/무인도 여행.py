from collections import deque

def solution(maps):
    rows = len(maps)
    cols = len(maps[0])
    visited = [[False] * cols for _ in range(rows)]
    answer = []
    
    # 상, 하, 좌, 우 이동 방향
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    for i in range(rows):
        for j in range(cols):
            # 바다가 아니고 아직 방문하지 않은 땅인 경우 BFS 시작
            if maps[i][j] != 'X' and not visited[i][j]:
                q = deque([(i, j)])
                visited[i][j] = True
                total_food = int(maps[i][j])
                
                # BFS 탐색
                while q:
                    r, c = q.popleft()
                    
                    for dr, dc in directions:
                        nr = r + dr
                        nc = c + dc
                        
                        # 지도 범위를 벗어나지 않는지 확인
                        if 0 <= nr < rows and 0 <= nc < cols:
                            # 연결된 땅이면서 방문하지 않았다면 큐에 추가
                            if maps[nr][nc] != 'X' and not visited[nr][nc]:
                                visited[nr][nc] = True
                                total_food += int(maps[nr][nc])
                                q.append((nr, nc))
                                
                answer.append(total_food)
                
    # 무인도가 없는 경우 -1 반환
    if not answer:
        return [-1]
        
    # 오름차순 정렬하여 반환
    return sorted(answer)