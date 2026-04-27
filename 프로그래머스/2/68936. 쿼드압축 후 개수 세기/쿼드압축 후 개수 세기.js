function solution(arr) {
    var answer = [0,0];
    
    // 구역이 모두 동일한 숫자로 이루어져 있는지 확인
    // 모두 동일한 숫자일경우 압축
    // 아닐 경우 분할
    
    let index = arr.length;
    
    function checkSection(row, col, index) {
        let temp = arr[row][col];
        let check = true;
        
        for (let i = 0; i < index; i++) {
            for(let j = 0; j < index; j++){
                if (temp == arr[row + i][col + j]) continue;
                else {
                    check = false;
                    checkSection(row, col, index/2);
                    checkSection(row, col + index/2, index/2);
                    checkSection(row + index/2, col, index/2);
                    checkSection(row + index/2, col + index/2, index/2);
                    return;
                }
            }
        }
        if (check) answer[temp]++;
    }
    
    checkSection(0,0, index);
    
    return answer;
}