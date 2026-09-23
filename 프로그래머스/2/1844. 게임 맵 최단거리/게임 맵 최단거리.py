from collections import deque

def solution(maps):
    n = len(maps)
    m = len(maps[0])
    
    queue = deque()
    queue.append((0,0))
    
    move = [[0,1], [1,0], [0, -1], [-1, 0]]
    
    while queue:
        c_x, c_y = queue.popleft()
        
        for d_x, d_y in move:
            n_x = c_x + d_x
            n_y = c_y + d_y
            
            if 0 <= n_x < n and 0 <= n_y < m:
                if maps[n_x][n_y] == 1:
                    maps[n_x][n_y] = maps[c_x][c_y] + 1
                    queue.append((n_x, n_y))

    if maps[n-1][m-1] > 1:
        return maps[n-1][m-1]
    else:
        return -1