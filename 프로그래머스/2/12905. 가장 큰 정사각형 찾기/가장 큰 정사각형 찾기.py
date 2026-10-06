def solution(board):
    max_side = 0
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == 1:
                # 첫 번째 행과 첫 번째 열은 이전 값을 참조할 수 없으므로 제외
                if i > 0 and j > 0:
                    board[i][j] = min(board[i-1][j], board[i][j-1], board[i-1][j-1]) + 1
                
                # 가장 긴 변의 길이 갱신
                max_side = max(max_side, board[i][j])
                
    # 넓이를 구해야 하므로 제곱하여 반환
    return max_side ** 2