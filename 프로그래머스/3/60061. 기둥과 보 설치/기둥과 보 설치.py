def check(answer):
    for x, y, a in answer:
        if a == 0:  # 기둥
            # 바닥 위이거나, 보의 한쪽 끝부분 위이거나, 다른 기둥 위인지 확인
            if y == 0 or (x - 1, y, 1) in answer or (x, y, 1) in answer or (x, y - 1, 0) in answer:
                continue
            return False
        elif a == 1:  # 보
            # 한쪽 끝부분이 기둥 위이거나, 양쪽 끝부분이 다른 보와 동시에 연결되어 있는지 확인
            if (x, y - 1, 0) in answer or (x + 1, y - 1, 0) in answer or ((x - 1, y, 1) in answer and (x + 1, y, 1) in answer):
                continue
            return False
    return True

def solution(n, build_frame):
    answer = set()
    
    for x, y, a, b in build_frame:
        item = (x, y, a)
        if b == 1:  # 설치
            answer.add(item)
            if not check(answer):
                answer.remove(item)
        elif b == 0:  # 삭제
            if item in answer:
                answer.remove(item)
                if not check(answer):
                    answer.add(item)
                    
    # x좌표, y좌표, 기둥/보 순으로 오름차순 정렬하여 반환
    return [list(i) for i in sorted(answer)]