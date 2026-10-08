def solution(s):
    answer = []
    
    s = s[2:-2].split('},{')
    
    s.sort(key=len)
    
    for group in s:
        numbers = group.split(',')
        for num in numbers:
            num = int(num)
            if num not in answer:
                answer.append(num)
                
    return answer