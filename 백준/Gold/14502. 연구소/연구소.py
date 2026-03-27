from sys import stdin as s
from collections import deque

n, m = map(int, s.readline().split())

graph = [list(map(int, s.readline().split())) for _ in range(n)]

virus = []

#바이러스 위치 확인
for i in range(n):
    for j in range(m):
        if graph[i][j] == 2:
            virus.append((i,j))

def bfs():
    queue = deque(virus)
    tmp_graph = [row[:] for row in graph]

    #탐색 시작
    while queue:
        x, y = queue.popleft()

        for dx, dy in ((1,0), (0,1), (-1,0), (0,-1)):
            if 0<=x+dx<n and 0<=y+dy<m:
                if tmp_graph[x+dx][y+dy] == 0:
                    tmp_graph[x+dx][y+dy] = 2
                    queue.append((x+dx, y+dy))

    # 안전구역 카운팅
    global answer

    cnt = 0
    for row in tmp_graph:
        cnt += row.count(0)
    answer = max(answer, cnt)


# 벽세우고(모든 경우의 수 확인) 백트랙킹 진행
def wall(num):
    if num == 3:
        bfs()
        return

    for i in range(n):
        for j in range(m):
            if graph[i][j] == 0:
                graph[i][j] = 1
                wall(num+1)
                graph[i][j] = 0

answer = 0

wall(0)
print(answer)