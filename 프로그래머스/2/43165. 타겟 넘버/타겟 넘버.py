def solution(numbers, target):
    answer = 0
    
    def dfs(index, n_sum):
        nonlocal answer
        
        if index == len(numbers):
            if n_sum == target:
                answer += 1
            return
        
        dfs(index + 1, n_sum + numbers[index])
        dfs(index + 1, n_sum - numbers[index])
    
    dfs(0,0)
    
    return answer