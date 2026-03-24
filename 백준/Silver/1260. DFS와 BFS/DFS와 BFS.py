from sys import stdin as s
from collections import defaultdict

n, m, v = map(int, s.readline().split(' '))

graph = defaultdict(list)

for _ in range(m):
    st, en = map(int, s.readline().split(' '))
    graph[st].append(en)
    graph[en].append(st)

visited = [False] * (n+1)
dfslist = []
    
def dfs(node):
    visited[node] = True
    dfslist.append(node)

    for neighbor in sorted(graph[node]): 
        if not visited[neighbor]:
            dfs(neighbor)

dfs(v)
print(*dfslist)

visited = [False] * (n+1)
queue= []
bfslist = []
queue.append(v)
bfslist.append(v)
visited[v] = True

while len(queue) > 0:
    node = queue.pop(0)
    for neighbor in sorted(graph[node]):
        if not visited[neighbor]:
            visited[neighbor] = True
            bfslist.append(neighbor)
            queue.append(neighbor)

print(*bfslist)
