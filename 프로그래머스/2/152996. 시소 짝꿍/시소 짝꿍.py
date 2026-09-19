from collections import Counter

def solution(weights):
    answer = 0

    counter = Counter(weights)
    
    for w, n in counter.items():
        if n >= 2:
            answer += n * (n - 1) // 2
            
        if w * (3 / 2) in counter:
            answer += n * counter[w * (3 / 2)]
            
        if w * 2 in counter:
            answer += n * counter[w * 2]
            
        if w * (4 / 3) in counter:
            answer += n * counter[w * (4 / 3)]
            
    return answer