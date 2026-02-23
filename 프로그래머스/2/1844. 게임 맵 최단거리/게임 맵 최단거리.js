function solution(maps) {
    var n = maps.length; //행
    var m = maps[0].length; //열

    var dir = [[0,1], [1,0], [0,-1], [-1,0]]; //오,아,왼,위
    
    var bfs = () => {
        //탐색 시작지점
        var queue = [[0,0,1]];
        maps[0][0] = 0;
        
        while(queue.length > 0) {
            var [row, cal, distance] = queue.shift();
            
            //도착 여부 판단
            if (row === n-1 && cal === m-1)
                return distance;
            
            //방향에 맞추어 방문하지 않았고, 길이라면 큐에 삽입
            for (var [r, c] of dir){
                var newr = row + r;
                var newc = cal + c;
                
                if (newr >= 0 && newr < n && newc >= 0 && newc < m && (maps[newr][newc] === 1)){
                    queue.push([newr, newc, distance + 1]);
                    maps[newr][newc] = 0;
                }
            }
        }
        return -1;
    }
    
    return bfs();
}