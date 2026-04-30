function solution(n, t, m, p) {
    var answer = '';
    
    let index = 0;
    let num = 1;
    
    while (answer.length < t) {
        let realNum = numToString(index, '', n);
        for (let i = 0; i < realNum.length; i++){
            if (answer.length == t) return answer;
            else {
                if (num == p) answer += realNum[i];
            }
            num = (num) % m + 1;
        }
        index++;
    }
    
    return answer;
}

function numToString(num, str, n){
    if (Math.floor(num/n) == 0) {
        let result = num % n;
        return result.toString(16).toUpperCase() + str;
    } else {
        let result = num % n;
        return numToString(Math.floor(num/n), result.toString(16).toUpperCase() + str, n)
    }
}