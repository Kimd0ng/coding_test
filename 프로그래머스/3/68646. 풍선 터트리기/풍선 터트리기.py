def solution(a):
    survivors = set()
    
    # 양끝의 최솟값을 초기화 (배열의 원소는 10억 이하이므로 충분히 큰 값 설정)
    left_min = 10**9 + 1
    right_min = 10**9 + 1
    
    # 1. 왼쪽에서부터 훑으며 최솟값을 갱신하고 살아남는 풍선을 추가
    for i in range(len(a)):
        if a[i] < left_min:
            left_min = a[i]
            survivors.add(a[i])
            
    # 2. 오른쪽에서부터 훑으며 최솟값을 갱신하고 살아남는 풍선을 추가
    for i in range(len(a) - 1, -1, -1):
        if a[i] < right_min:
            right_min = a[i]
            survivors.add(a[i])
            
    # 3. 양방향에서 한 번이라도 최솟값으로 기록된 풍선들의 개수를 반환
    return len(survivors)