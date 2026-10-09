import heapq

def solution(n, works):
    if sum(works) <= n:
        return 0

    max_heap = [-work for work in works]
    heapq.heapify(max_heap)

    for _ in range(n):
        max_val = heapq.heappop(max_heap)
        
        max_val += 1

        heapq.heappush(max_heap, max_val)

    return sum(work ** 2 for work in max_heap)