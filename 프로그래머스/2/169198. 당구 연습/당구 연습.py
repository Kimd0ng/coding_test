def solution(m, n, startX, startY, balls):
    answer = []
    
    for targetX, targetY in balls:
        dists = []
        
        # 1. 좌측 벽 (x = 0)
        # 단, y좌표가 같고 목표 공이 더 왼쪽에 있으면 안 됨
        if not (startY == targetY and startX > targetX):
            dists.append((startX + targetX)**2 + (startY - targetY)**2)
            
        # 2. 우측 벽 (x = m)
        # 단, y좌표가 같고 목표 공이 더 오른쪽에 있으면 안 됨
        if not (startY == targetY and startX < targetX):
            dists.append((startX - (2*m - targetX))**2 + (startY - targetY)**2)
            
        # 3. 하단 벽 (y = 0)
        # 단, x좌표가 같고 목표 공이 더 아래에 있으면 안 됨
        if not (startX == targetX and startY > targetY):
            dists.append((startX - targetX)**2 + (startY + targetY)**2)
            
        # 4. 상단 벽 (y = n)
        # 단, x좌표가 같고 목표 공이 더 위에 있으면 안 됨
        if not (startX == targetX and startY < targetY):
            dists.append((startX - targetX)**2 + (startY - (2*n - targetY))**2)
            
        # 4방향 중 가장 짧은 거리를 선택
        answer.append(min(dists))
        
    return answer