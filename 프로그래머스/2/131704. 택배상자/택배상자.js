function solution(order) {
    let truck = [];
    let belt = [];
    let sub = [];
    let index = 1;
    let beltIdx = 0; // shift() 대신 메인 벨트의 현재 위치를 가리킬 포인터
    
    for (let i = 0; i < order.length; i++) {
        belt[order[i] - 1] = i + 1;
    }
    
    // belt.length 대신 beltIdx를 사용하여 남은 상자가 있는지 확인
    while (beltIdx < belt.length || sub.length > 0) {
        
        // 1. 메인 벨트의 현재 상자가 실어야 할 상자인 경우
        if (beltIdx < belt.length && belt[beltIdx] === index) {
            truck.push(belt[beltIdx]);
            beltIdx++; // 다음 상자로 이동 (shift 대체)
            index++;
        } 
        // 2. 보조 벨트(sub)의 맨 위가 실어야 할 상자인 경우
        else if (sub.length > 0 && sub[sub.length - 1] === index) {
            truck.push(sub.pop());
            index++;
        } 
        // 3. 둘 다 아니지만 메인 벨트에 상자가 남아있는 경우 -> 보조 벨트로 이동
        else if (beltIdx < belt.length) {
            sub.push(belt[beltIdx]);
            beltIdx++; // 다음 상자로 이동 (shift 대체)
        } 
        // 4. 더 이상 진행할 수 없는 경우 -> 작업 종료
        else {
            break;
        }
    }

    return truck.length;
}