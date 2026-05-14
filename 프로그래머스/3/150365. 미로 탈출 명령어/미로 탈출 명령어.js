function solution(n, m, x, y, r, c, k) {
    // 1. 최소 이동거리 계산
    let num = Math.abs(x - r) + Math.abs(y - c);
    
    // 2. 도달 불가능한 경우 예외 처리
    if (k < num || (k - num) % 2 !== 0) {
        return "impossible";
    }
    
    let answer = '';
    let currX = x;
    let currY = y;
    
    // 3. k번의 이동을 한 걸음씩 결정합니다.
    for (let i = 0; i < k; i++) {
        // 이번에 한 걸음 이동한 뒤, 남은 이동 횟수
        let remain = k - i - 1; 
        
        // 사전 순서대로(d, l, r, u) 해당 방향으로 한 칸 갔을 때, 
        // 남은 횟수(remain) 안에 목표지점까지 도착할 수 있는지 거리를 계산하여 이동합니다.
        
        // 우선순위 1: d (아래)
        if (currX < n && Math.abs(currX + 1 - r) + Math.abs(currY - c) <= remain) {
            answer += 'd';
            currX++;
        }
        // 우선순위 2: l (왼쪽)
        else if (currY > 1 && Math.abs(currX - r) + Math.abs(currY - 1 - c) <= remain) {
            answer += 'l';
            currY--;
        }
        // 우선순위 3: r (오른쪽)
        else if (currY < m && Math.abs(currX - r) + Math.abs(currY + 1 - c) <= remain) {
            answer += 'r';
            currY++;
        }
        // 우선순위 4: u (위)
        else if (currX > 1 && Math.abs(currX - 1 - r) + Math.abs(currY - c) <= remain) {
            answer += 'u';
            currX--;
        }
    }
    
    return answer;
}