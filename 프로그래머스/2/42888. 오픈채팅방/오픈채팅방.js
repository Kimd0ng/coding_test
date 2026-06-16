function solution(record) {
    var answer = [];
    
    // 유저 아이디 저장
    // 유저 아이디 별 갱신
    
    let n_record = [];
    let final_name = {};
    
    for (let rec of record) {
        let [status, uid, name] = rec.split(" ")
        
        if (status != "Leave")
            final_name[uid] = name
        
        if (status != "Change")
            n_record.push([status, uid])
    }
    
    for (let i = 0; i < n_record.length; i++) {
        let name = final_name[n_record[i][1]]
        let status = n_record[i][0]
        
        answer.push(printString(name, status))
    }
    
    return answer;
}

function printString(name, status) {
    if (status == "Enter")
        return name + "님이 들어왔습니다."
    else if (status == "Leave")
        return name + "님이 나갔습니다."
}