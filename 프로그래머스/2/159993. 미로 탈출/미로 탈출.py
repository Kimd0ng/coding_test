from collections import deque

def bfs(src, dst, maps, height, width):
    # 방문 여부를 기록할 배열
    is_visited = [[False] * width for _ in range(height)]
    
    # 큐 초기화 (행, 열, 현재 이동 시간)
    q = deque([(src[0], src[1], 0)])
    is_visited[src[0]][src[1]] = True
    
    # 상, 하, 좌, 우 이동 방향
    d_row = [-1, 1, 0, 0]
    d_col = [0, 0, -1, 1]
    
    while q:
        r, c, time = q.popleft()
        
        # 목표 지점에 도달한 경우 걸린 시간 반환
        if (r, c) == dst:
            return time
            
        # 4가지 방향으로 이동
        for i in range(4):
            nr = r + d_row[i]
            nc = c + d_col[i]
            
            # 미로 범위 내에 있고, 벽('X')이 아니며, 방문하지 않은 곳일 때
            if 0 <= nr < height and 0 <= nc < width:
                if maps[nr][nc] != 'X' and not is_visited[nr][nc]:
                    is_visited[nr][nc] = True
                    q.append((nr, nc, time + 1))
                    
    # 목표 지점에 도달할 수 없는 경우
    return -1

def solution(maps):
    height = len(maps)
    width = len(maps[0])
    
    start_pt, lever_pt, exit_pt = None, None, None
    
    # 시작점(S), 레버(L), 출구(E)의 위치 찾기
    for r in range(height):
        for c in range(width):
            if maps[r][c] == 'S':
                start_pt = (r, c)
            elif maps[r][c] == 'L':
                lever_pt = (r, c)
            elif maps[r][c] == 'E':
                exit_pt = (r, c)
                
    # 1. 시작점(S) -> 레버(L) 최단 거리 탐색
    lever_dist = bfs(start_pt, lever_pt, maps, height, width)
    if lever_dist == -1:
        return -1
        
    # 2. 레버(L) -> 출구(E) 최단 거리 탐색
    exit_dist = bfs(lever_pt, exit_pt, maps, height, width)
    if exit_dist == -1:
        return -1
        
    # 두 탐색 결과를 합산하여 반환
    return lever_dist + exit_dist