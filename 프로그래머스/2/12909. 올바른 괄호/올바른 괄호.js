function solution(s){
    let save = [];
    
    save.push(s[0]);
    
    for (let i = 1; i<s.length; i++) {
        if (s[i] == "(")
            save.push("(");
        else
            save.pop();
    }

    return save.length == 0 ? true : false;
}