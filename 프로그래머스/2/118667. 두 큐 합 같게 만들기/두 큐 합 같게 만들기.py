from collections import deque

def solution(queue1, queue2):
    # O(1) 속도로 추출하기 위해 덱(deque)으로 변환
    q1 = deque(queue1)
    q2 = deque(queue2)
    
    # 큐의 초기 합 계산
    sum1 = sum(q1)
    sum2 = sum(q2)
    
    # 두 큐의 총합이 홀수이면 절대 같게 만들 수 없음
    if (sum1 + sum2) % 2 != 0:
        return -1
    
    answer = 0
    # 최대 작업 횟수 (두 큐의 원소가 원래 자리로 돌아오거나 교환되는 최대 경우의 수)
    limit = len(queue1) * 3 
    
    # 두 큐의 합이 같아질 때까지 반복
    while sum1 != sum2:
        if answer >= limit:
            return -1
            
        # 합이 더 큰 큐에서 원소를 빼서 작은 큐에 넣음
        if sum1 > sum2:
            val = q1.popleft()
            q2.append(val)
            sum1 -= val
            sum2 += val
        else:
            val = q2.popleft()
            q1.append(val)
            sum2 -= val
            sum1 += val
            
        answer += 1
        
    return answer