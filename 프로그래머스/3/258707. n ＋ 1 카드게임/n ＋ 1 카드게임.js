function solution(coin, cards) {
    var answer = 1;
    
    let n = cards.length;
    let index = n/3;
    let hand = cards.slice(0, index);
    
    // 게임시작하면 손패 hand
    // cards 리스트중 index 부터 꺼낼수 있음
    let drawn = [];
    
    while (index < n) {
        drawn.push(cards[index]);
        drawn.push(cards[index + 1]);
        index += 2;
        
        let passed = false;
        
        // 1. [1순위] 동전 0개 사용 (hand + hand)
        for (let i = 0; i < hand.length; i++) {
            let target = (n + 1) - hand[i];
            let targetIdx = hand.indexOf(target);
            
            // 짝이 되는 카드가 내 손패에 존재한다면
            if (targetIdx !== -1 && targetIdx !== i) {
                let card1 = hand[i];
                let card2 = target;
                // 사용한 카드 두 장을 손패에서 제거
                hand = hand.filter(c => c !== card1 && c !== card2);
                passed = true;
                break;
            }
        }
        
        // 2. [2순위] 동전 1개 사용 (hand + drawn)
        if (!passed && coin >= 1) {
            for (let i = 0; i < hand.length; i++) {
                let target = (n + 1) - hand[i];
                
                // 내 손패의 짝이 임시 보관함(drawn)에 있다면
                if (drawn.includes(target)) {
                    let card1 = hand[i];
                    // 각각의 배열에서 카드 제거
                    hand = hand.filter(c => c !== card1);
                    drawn = drawn.filter(c => c !== target);
                    coin -= 1; // 동전 1개 지불
                    passed = true;
                    break;
                }
            }
        }
        
        // 3. [3순위] 동전 2개 사용 (drawn + drawn)
        if (!passed && coin >= 2) {
            for (let i = 0; i < drawn.length; i++) {
                let target = (n + 1) - drawn[i];
                let targetIdx = drawn.indexOf(target);
                
                // 임시 보관함 내에서 짝이 만들어진다면
                if (targetIdx !== -1 && targetIdx !== i) {
                    let card1 = drawn[i];
                    let card2 = target;
                    // 보관함에서 카드 두 장 모두 제거
                    drawn = drawn.filter(c => c !== card1 && c !== card2);
                    coin -= 2; // 동전 2개 지불
                    passed = true;
                    break;
                }
            }
        }
        
        // 위 3가지 방법으로도 합이 n+1이 안 된다면 라운드 통과 실패
        if (!passed) {
            break;
        }
        
        // 무사히 통과했다면 라운드 1 증가
        answer++;
        
        
    }
    
    return answer;
}