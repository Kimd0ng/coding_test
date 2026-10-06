import heapq

def time_to_min(time_str):
    h, m = map(int, time_str.split(':'))
    return h * 60 + m

def solution(book_time):
    # 1. 예약 시간을 분 단위로 변환하고 시작 시간 기준으로 오름차순 정렬
    books = []
    for start, end in book_time:
        books.append([time_to_min(start), time_to_min(end) + 10])
    books.sort(key=lambda x: x[0])
    
    # 2. 최소 힙(Min-Heap)을 사용하여 현재 사용 중인 객실의 비워지는 시간 추적
    rooms = []
    for start, end in books:
        # 기존에 사용 중인 방이 있고, 가장 빨리 비는 방이 현재 손님의 시작 시간보다 같거나 빠르면
        if rooms and rooms[0] <= start:
            heapq.heappop(rooms)  # 기존 방을 이어서 사용 (방을 빼고 새 종료 시간 갱신 준비)
        
        # 현재 손님의 퇴실(+청소 10분) 시간을 힙에 추가
        heapq.heappush(rooms, end)
    
    # 3. 힙에 남아있는 원소의 개수가 필요한 최소 객실의 수
    return len(rooms)