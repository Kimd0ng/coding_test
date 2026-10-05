def replace_sharp(melody):
    return melody.replace('C#', 'c') \
                 .replace('D#', 'd') \
                 .replace('E#', 'e') \
                 .replace('F#', 'f') \
                 .replace('G#', 'g') \
                 .replace('A#', 'a') \
                 .replace('B#', 'b')

def solution(m, musicinfos):
    answer = "(None)"
    max_play_time = 0
    m = replace_sharp(m)
    
    for info in musicinfos:
        start, end, title, melody = info.split(',')
        
        # 1. 재생 시간(분) 계산
        start_h, start_m = map(int, start.split(':'))
        end_h, end_m = map(int, end.split(':'))
        play_time = (end_h * 60 + end_m) - (start_h * 60 + start_m)
        
        # 2. 악보 정보 치환 및 실제 재생된 멜로디 길이만큼 생성
        melody = replace_sharp(melody)
        
        # 몫 연산으로 반복되는 멜로디를 붙이고, 나머지 연산으로 잘리는 멜로디를 붙임
        played_melody = melody * (play_time // len(melody)) + melody[:play_time % len(melody)]
        
        print(played_melody)
        
        # 3. 기억한 멜로디(m)가 실제 재생된 멜로디 안에 있는지 확인
        if m in played_melody:
            # 재생된 시간이 제일 긴 음악을 선택 (재생 시간이 같을 경우 입력 순서대로 유지됨)
            if play_time > max_play_time:
                max_play_time = play_time
                answer = title
                
    return answer