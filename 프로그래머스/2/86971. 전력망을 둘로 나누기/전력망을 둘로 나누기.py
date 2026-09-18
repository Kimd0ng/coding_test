from collections import deque

def solution(n, wires):
    graph = [[] for _ in range(n + 1)]
    for v1, v2 in wires:
        graph[v1].append(v2)
        graph[v2].append(v1)
        
    min_diff = float('inf')
    
    for v1, v2 in wires:
        visited = [False] * (n + 1)
        visited[v1] = True
        visited[v2] = True
        
        queue = deque([v1])
        count = 1
        
        # BFS 탐색
        while queue:
            curr = queue.popleft()
            for neighbor in graph[curr]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append(neighbor)
                    count += 1
                    

        diff = abs(count - (n - count))
        min_diff = min(min_diff, diff)
        
    return min_diff