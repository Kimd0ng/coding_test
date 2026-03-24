from sys import stdin as s
from collections import defaultdict

n = int(s.readline())
m = int(s.readline())

check = [False] * n
graph = defaultdict(list)

for _ in range(m):
    st, en = map(int, s.readline().split(' '))
    graph[st].append(en)
    graph[en].append(st)

def dfs(node):
    while len(graph[node]) > 0:
        temp = graph[node].pop(0)
        if check[temp-1] != True:
            dfs(temp)
            check[temp-1] = True
        else:
            continue
    
check[0] = True
dfs(1)

print(check.count(True) - 1)