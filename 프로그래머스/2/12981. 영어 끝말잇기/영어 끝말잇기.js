function solution(n, words) {
    var answer = [];

    let dic = new Set();
    let check = [];
    
    for (let word of words) {
        if (dic.size == 0) {
            dic.add(word);
            check.push(word);
        } else {
            let temp = check[check.length - 1];
            if ((temp[temp.length - 1] == word[0]) && (!dic.has(word))) {
                dic.add(word);
                check.push(word);
            } else {
                break;
            }
        }
    }
    
    if (check.length == words.length)
        return [0, 0]
    else
        return [check.length%n + 1, Math.floor(check.length/n) + 1];
}