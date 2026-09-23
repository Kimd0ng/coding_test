from collections import deque

def solution(n, computers):
    answer = 0
    
    visited = [False] * n
    
    for i in range(n):
        if not visited[i]:
            answer += 1
            
            queue = deque([i])
            visited[i] = True
            
            while queue:
                curr = queue.popleft()
                
                for j in range(n):
                    if computers[curr][j] == 1 and not visited[j]:
                        visited[j] = True
                        queue.append(j)
    
    return answer