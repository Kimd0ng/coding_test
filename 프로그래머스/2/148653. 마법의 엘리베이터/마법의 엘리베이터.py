def solution(storey):
    answer = 0
    
    while storey > 0:
        remainder = storey % 10
        
        if remainder > 5:
            answer += (10 - remainder)
            storey = (storey // 10) + 1
        elif remainder < 5:
            answer += remainder
            storey = storey // 10
        else:
            answer += 5
            next_digit = (storey // 10) % 10
            
            if next_digit >= 5:
                storey = (storey // 10) + 1
            else:
                storey = storey // 10
                
    return answer