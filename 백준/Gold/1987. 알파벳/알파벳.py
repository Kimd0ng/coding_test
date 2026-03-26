from sys import stdin as s

r, c = map(int, s.readline().split())

graph = [list(map(str, s.readline().strip())) for _ in range(r)]

# visited = [False] * 26
# max_depth = 0

# def dfs(x, y, depth):
#     global max_depth
#     max_depth = max(max_depth, depth)

#     for dx, dy in (1,0), (-1,0), (0,1), (0, -1):
#         nx, ny = x + dx, y + dy
#         if 0<=nx<r and 0<=ny<c:
#             idx = ord(graph[nx][ny]) - 65

#             if not visited[idx]:
#                 visited[idx] = True
#                 dfs(nx, ny, depth+1)
#                 visited[idx] = False

# visited[ord(graph[0][0]) - 65] = True
# dfs(0,0,1)

# print(max_depth)

# 최적화 버전 set을 사용
# 지금 좌표까지 거쳐온 알파벳을 한번에 포함하여 set에 넣어줌
# 넣어준 알파벳의 길이가 결국 지나온 거리

def dfs(sx, sy):
    q = set()
    q.add((sx, sy, graph[sx][sy]))
    depth = 0

    while q:
        x, y, now_visited = q.pop()

        depth = max(depth, len(now_visited))

        if depth == 26:
            return 26
        
        for dx, dy in (1,0), (-1,0), (0,1), (0, -1):
            nx, ny = x + dx, y + dy

            if 0<=nx<r and 0<=ny<c and graph[nx][ny] not in  now_visited:
                q.add((nx, ny, now_visited + graph[nx][ny]))

    return depth

print(dfs(0, 0))