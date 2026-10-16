def solution(user_id, banned_id):
    def is_match(ban, user):
        if not len(ban) == len(user):
            return False
        for u_char, b_char in zip(user, ban):
            if b_char != "*" and u_char != b_char:
                return False
        return True
    
    possible = []
    
    for b in banned_id:
        possible.append([u for u in user_id if is_match(b, u)])
    
    result = set()
    
    def dfs(index, selected):
        if index == len(banned_id):
            result.add(tuple(sorted(selected)))
            return
        
        for u in possible[index]:
            if u not in selected:
                dfs(index+1, selected + [u])
        
    
    dfs(0, [])
    
    return len(result)