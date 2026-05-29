function solution(triangle) {
    var answer = 0;
    
    // 아래서부터 위로 올라올거임
    // 4번째 줄의 입장에서 2가지 경로중 당길수 있는 큰수를 당깅거임
        // 7 12 10 10
    // 3번째 줄의 입장에서
        // 20 13 10
    // 2번째 줄의 입장
        // 23 21
    // 1번째 줄의 입장
        // 30
    // 2가지 중에 큰걸 선택하면 무조건 합이 큰값에 결론 도달
    
    let num = triangle.length;
    
    for (let i = 0; i < num - 1; i++) {
        for (let j = 0; j < num - i - 1; j++) {
            triangle[num - i - 2][j] += Math.max(triangle[num - i - 1][j], triangle[num - i - 1][j + 1]);
        }
    }
    

    
    return triangle[0][0];
}