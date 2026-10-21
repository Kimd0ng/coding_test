def solution(numbers):
    # 1. 키패드 숫자별 좌표 설정 (0~9)
    coords = {
        1: (0, 0), 2: (0, 1), 3: (0, 2),
        4: (1, 0), 5: (1, 1), 6: (1, 2),
        7: (2, 0), 8: (2, 1), 9: (2, 2),
        0: (3, 1)
    }
    
    # 2. 이동 가중치 2차원 배열 사전 계산
    costs = [[0] * 10 for _ in range(10)]
    for i in range(10):
        for j in range(10):
            if i == j:
                costs[i][j] = 1
            else:
                r1, c1 = coords[i]
                r2, c2 = coords[j]
                dr, dc = abs(r1 - r2), abs(c1 - c2)
                costs[i][j] = min(dr, dc) * 3 + abs(dr - dc) * 2

    # 3. DP 테이블 초기화 (dp[왼손][오른손] = 최소 가중치)
    INF = float('inf')
    dp = [[INF] * 10 for _ in range(10)]
    dp[4][6] = 0  # 초기 위치: 왼손 4, 오른손 6
    
    # 4. numbers 문자열을 순회하며 DP 갱신
    for num_str in numbers:
        target = int(num_str)
        next_dp = [[INF] * 10 for _ in range(10)]
        
        for left in range(10):
            for right in range(10):
                current_cost = dp[left][right]
                if current_cost == INF:
                    continue
                
                # 왼손을 target 위치로 이동 (오른손이 target에 없을 때만 가능)
                if right != target:
                    cost = current_cost + costs[left][target]
                    if cost < next_dp[target][right]:
                        next_dp[target][right] = cost
                        
                # 오른손을 target 위치로 이동 (왼손이 target에 없을 때만 가능)
                if left != target:
                    cost = current_cost + costs[right][target]
                    if cost < next_dp[left][target]:
                        next_dp[left][target] = cost
                        
        dp = next_dp
        
    # 5. 모든 숫자를 누른 후 도달 가능한 상태 중 최소 비용 반환
    return min(min(row) for row in dp)