function solution(triangle) {
    //삼각형의 하단부에서 부터 위로 올라가도록 구현
    const dp = triangle[triangle.length-1].slice()
    
    //가장 하단부와 바로 윗줄을 확인하여 윗줄에서 하단부의 2가지중 최대값을 선택하여 합하도록 지정
    for(let i = triangle.length - 2; i >= 0; i--){
        for (let j = 0; j <= i; j++)
            dp[j] = triangle[i][j] + Math.max(dp[j], dp[j+1]);
    }
    
    return dp[0];
}