function solution(dirs) {
    var answer = 0;
    
    let visited = Array.from({length: 21}, () => Array(21).fill('0'));
    
    let player = [10, 10];
    
    for (let dir of dirs){
        if (dir == 'U' && (player[1] + 2 < 21)){
            if (visited[player[0]][player[1] + 1] == 0) {
                visited[player[0]][player[1] + 1] = 1;
                answer++;
            }
            player[1] += 2;
        } else if (dir == 'D' && (player[1] - 2 >= 0)) {
            if (visited[player[0]][player[1] - 1] == 0) {
                visited[player[0]][player[1] - 1] = 1;
                answer++;
            }
            player[1] -= 2;
        } else if (dir == 'R' && (player[0] + 2 < 21)) {
            if (visited[player[0] + 1][player[1]] == 0) {
                visited[player[0] + 1][player[1]] = 1;
                answer++;
            }
            player[0] += 2;
        } else if (dir == 'L' && (player[0] - 2 >= 0)) {
            if (visited[player[0] - 1][player[1]] == 0) {
                visited[player[0] - 1][player[1]] = 1;
                answer++;
            }
            player[0] -= 2;
        }
    }
    
    return answer;
}