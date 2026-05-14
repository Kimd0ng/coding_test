function solution(places) {
    var answer = [];
    
    
    // 거리 2를 안지키는 경우 => 2가지 모양 / pop / po,op /
    
    // 거리 확인
    // 거리가 2이하면
    // 두사람 사이에 벽이 있는지 확인
    
    // 두 테이블 T1, T2가 행렬 (r1, c1), (r2, c2), T1, T2 사이의 맨해튼 거리는 |r1 - r2| + |c1 - c2|
    
    // 각 방별로 계산
    places.forEach(place => {
        // 사람 위치 조사
        let peoples = findPeople(place);
        
        // 사람 위치 기반으로 거리 측정
        let disResult = distance(peoples);
        
        // 거리가 안되는 사람들(거리가 2인사람들)의 쌍 사이레 벽이 있는지 확인
        // 모두 지키면 1
        if (checkWall(disResult, place))
            answer.push(1);
        else
            answer.push(0);
        
        console.log(disResult);
    });
    
    return answer;
}

function findPeople(map) {
    let peoples = [];
    
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (map[i][j] == 'P')
                peoples.push([i,j]);
        }
    }
    
    return peoples;
}

function distance(peoples) {
    let result = [];
    
    for (let i = 0; i < peoples.length; i++) {
        for (let j = i + 1; j < peoples.length; j++) {
            if (Math.abs(peoples[i][0] - peoples[j][0]) + Math.abs(peoples[i][1] - peoples[j][1]) <= 2)
                result.push([peoples[i][0], peoples[i][1], peoples[j][0], peoples[j][1]]);
        }
    }
    
    return result;
}

function checkWall(peoples, map) {
    // 좌표가 1차이면 크로스
    // 좌표가 2 or 0이면 한줄
    for (let i = 0; i < peoples.length; i++) {
        if (Math.abs(peoples[i][0] - peoples[i][2]) == 1) {
            if (map[peoples[i][0]][peoples[i][3]] != 'X' || map[peoples[i][2]][peoples[i][1]] != 'X')
                return false;
        } else if (Math.abs(peoples[i][0] - peoples[i][2]) == 0) {
            if (map[peoples[i][0]][(peoples[i][1]+peoples[i][3])/2] != 'X')
                return false;
        } else {
            if (map[(peoples[i][0]+peoples[i][2])/2][peoples[i][1]] != 'X')
                return false;
        }
    }
    
    return true;
}