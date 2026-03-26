from sys import stdin as s

r, c = map(int, s.readline().split())

graph = [list(map(str, s.readline().strip())) for _ in range(r)]

visited = [False] * 26
max_depth = 0

def dfs(x, y, depth):
    global max_depth
    max_depth = max(max_depth, depth)

    for dx, dy in (1,0), (-1,0), (0,1), (0, -1):
        nx, ny = x + dx, y + dy
        if 0<=nx<r and 0<=ny<c:
            idx = ord(graph[nx][ny]) - 65

            if not visited[idx]:
                visited[idx] = True
                dfs(nx, ny, depth+1)
                visited[idx] = False

visited[ord(graph[0][0]) - 65] = True
dfs(0,0,1)

print(max_depth)