from collections import deque

def solution(n, roads, sources, destination):
    # 1. 그래프 인접 리스트 생성
    graph = [[] for _ in range(n + 1)]
    for u, v in roads:
        graph[u].append(v)
        graph[v].append(u)
    
    # 2. 최단 거리 배열 초기화 (-1은 방문하지 않음 및 도달 불가를 의미)
    distances = [-1] * (n + 1)
    distances[destination] = 0
    
    # 3. BFS 탐색 (목적지에서 거꾸로 출발)
    queue = deque([destination])
    
    while queue:
        current = queue.popleft()
        
        for neighbor in graph[current]:
            # 아직 방문하지 않은 지역인 경우
            if distances[neighbor] == -1:
                distances[neighbor] = distances[current] + 1
                queue.append(neighbor)
                
    # 4. 주어진 sources의 원소 순서대로 결과 배열 생성
    answer = [distances[source] for source in sources]
    
    return answer