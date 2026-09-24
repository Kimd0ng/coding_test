def solution(answers):
    scores = [0, 0, 0]
    a1 = [1, 2, 3, 4, 5]
    num2 = 0
    a2 = [2, 1, 2, 3, 2, 4, 2, 5]
    num3 = 0
    a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    
    for i in range(len(answers)):
        if answers[i] == a1[i % 5]:
            scores[0] += 1
        if answers[i] == a2[i % 8]:
            scores[1] += 1
        if answers[i] == a3[i % 10]:
            scores[2] += 1
    
    max_score = max(scores)
    
    answer = []
    
    for i in range(3):
        if scores[i] == max_score:
            answer.append(i + 1)
            
    return answer