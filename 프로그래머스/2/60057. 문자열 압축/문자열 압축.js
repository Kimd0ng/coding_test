function solution(s) {
    let answer = Infinity;
    
    // 무조건 앞에서부터 정해진 길이만큼 커트
    // 1 ~ 문자열의 길이만큼 커트 가능
    
    // 몇개 단위로 끊을지 -> 끊었을때 길이 반환하는 함수
    if (s.length == 1) return 1
    else {
        for (let i = 1; i <= s.length/2; i++)
            answer = Math.min(answer, countNewArray(s, i));
    }
    
    return answer;
}


function countNewArray(s, num) {
    let his = "";
    let save = "";
    let count = 1;
    
    for (let i = 0; i < s.length; i = i + num) {
        if  (i == 0) {
            his = s.slice(i, i+num);
            continue;
        } else {
            let temp = s.slice(i, i+num);
            if (his == temp) {
                count++;
            } else {
                if (count == 1){
                    save += his;
                    his = temp;
                } else {
                    save += count + his;
                    his = temp;
                    count = 1;
                }
            }
        }
    }
    
    if (count == 1)
        save += his;
    else
        save += count + his;
    
    return save.length;
}