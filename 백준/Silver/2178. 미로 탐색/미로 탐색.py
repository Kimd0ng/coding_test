from sys import stdin  as s
from collections import defaultdict

n, m = map(int, s.readline().split(' '))

graph = [list(map(int, s.readline().strip())) for _ in  range(n)]

row = n
col = m

def bfs():
    queue = [(0,0,1)]
    while queue :
        x,y,depth = queue.pop(0)
        if (x,y) == (row-1,col-1) :
            return depth
        for dx,dy in (1,0),(0,1),(0,-1),(-1,0) :
            nx,ny = x+dx,y+dy
            if 0<=nx<row and 0<=ny<col and graph[nx][ny] == 1:
                queue.append((nx, ny, depth+1))
                graph[nx][ny] = 0

print(bfs())