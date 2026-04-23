function solution(msg) {
    var answer = [];
    let appendix = new Map();
    let index = 27;
    
    let w = "";
    let c = "";
    let temp = 0;
    
    for (let i = 0; i < msg.length; i++) {
        w = msg[i];
        c = msg[i + 1];
        // 두글자 짜리가 없는 경우
        if (!appendix.get(w+c)) {
            appendix.set(w+c, index++);
            answer.push(w.charCodeAt() - 64);
        } else { //두글자 이상의 값을 index하고 있을때
            // 가지고 있는 글자의 최대를 확인
            while(appendix.get(w+c)) {
                temp = w+c;
                w = w+c;
                c = msg[++i+1];
            }
            appendix.set(w+c,index++);
            answer.push(appendix.get(temp));
        }
    }
    
    
    return answer;
}