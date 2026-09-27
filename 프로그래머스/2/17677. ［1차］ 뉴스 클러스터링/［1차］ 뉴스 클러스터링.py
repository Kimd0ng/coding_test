from collections import Counter

def solution(str1, str2):
    str1 = str1.upper()
    str2 = str2.upper()
    
    list1 = [str1[i:i+2] for i in range(len(str1) - 1) if str1[i:i+2].isalpha()]
    list2 = [str2[i:i+2] for i in range(len(str2) - 1) if str2[i:i+2].isalpha()]
    
    counter1 = Counter(list1)
    counter2 = Counter(list2)
    
    intersection = sum((counter1 & counter2).values())  # 다중집합의 교집합 크기 (min)
    union = sum((counter1 | counter2).values())         # 다중집합의 합집합 크기 (max)
    
    if union == 0:
        return 65536
    else:
        return int((intersection / union) * 65536)