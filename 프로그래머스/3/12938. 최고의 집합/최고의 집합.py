def solution(n, s):
    if n > s:
        return [-1]
    
    answer = []
    
    num = s // n
    plus = s % n
    
    answer = [num] * n
    
    for i in range(plus):
        answer[len(answer) - 1 - i] += 1
    
    return answer