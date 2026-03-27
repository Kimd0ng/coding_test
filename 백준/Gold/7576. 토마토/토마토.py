from sys import stdin as s

m, n = map(int, s.readline().split())

graph = [list(map(int, s.readline().split())) for _ in range(n)]

date = 0

queue = []
n_d_q = []

for i in range(n):
    for j in range(m):
        if graph[i][j] == 1:
            queue.append((i,j))

while queue:
    tx, ty = queue.pop()

    for dx, dy in ((1,0), (0,1), (-1, 0), (0, -1)):
        if 0<=tx+dx<n and 0<=ty+dy<m and graph[tx + dx][ty + dy] == 0:
            graph[tx + dx][ty + dy] = 1
            n_d_q.append((tx+dx, ty+dy))

    if not queue:
        if not n_d_q:
            break
        
        queue = n_d_q[:]
        n_d_q = []
        date += 1

check = 0

for i in range(n):
    for j in range(m):
        if graph[i][j] == 0:
            check  = 1

if check == 1:
    print(-1)
else:
    print(date)