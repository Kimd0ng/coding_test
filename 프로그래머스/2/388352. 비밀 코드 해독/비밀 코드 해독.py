from itertools import combinations

def solution(n, q, ans):
    answer = 0
    m = len(q)
    
    # 반복문 내부에서의 연산을 줄이기 위해 미리 배열들을 set으로 변환
    q_sets = [set(attempt) for attempt in q]
    
    # 1부터 n까지의 숫자 중 5개를 선택하는 모든 조합 탐색
    for candidate in combinations(range(1, n + 1), 5):
        candidate_set = set(candidate)
        
        # 모든 조건(q_sets)에 대해 교집합의 크기가 ans의 값과 일치하는지 확인
        if all(len(candidate_set & q_sets[i]) == ans[i] for i in range(m)):
            answer += 1
            
    return answer