from itertools import permutations

def solution(k, dungeons):
    dungeons_per = permutations(dungeons, len(dungeons))
    
    max_dungeon = 0
    
    for order in dungeons_per:
        current_k = k
        count = 0
        
        for min_req, con in order:
            if current_k >= min_req:
                current_k -= con
                count += 1
        
        max_dungeon = max(max_dungeon, count)
    
    return max_dungeon