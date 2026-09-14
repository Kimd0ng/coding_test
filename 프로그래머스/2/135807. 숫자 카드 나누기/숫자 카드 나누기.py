import math
from functools import reduce

def calculate_gcd(cards):
    """배열의 모든 요소에 대한 최대공약수를 구하는 함수"""
    return reduce(math.gcd, cards)

def is_indivisible(divisor, cards):
    """구해진 최대공약수가 상대방 배열의 요소를 하나라도 나누는지 확인하는 함수"""
    for card in cards:
        if card % divisor == 0:
            return False
    return True

def solution(arrayA, arrayB):
    # 1. 철수와 영희가 가진 카드의 최대공약수를 각각 구함
    chulsoo_gcd = calculate_gcd(arrayA)
    younghee_gcd = calculate_gcd(arrayB)
    
    answer = 0
    
    # 2. 철수의 최대공약수가 영희의 카드를 나눌 수 없는지 확인
    if is_indivisible(chulsoo_gcd, arrayB):
        answer = max(answer, chulsoo_gcd)
        
    # 3. 영희의 최대공약수가 철수의 카드를 나눌 수 없는지 확인
    if is_indivisible(younghee_gcd, arrayA):
        answer = max(answer, younghee_gcd)
        
    return answer