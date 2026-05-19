// function solution(orders, course) {
//     var answer = [];
    
//     // course의 수에 맞는 모든 조합의 경우 계산
//     // 각 조합들이 orders와 2번이상 중복하는지 확인
//     // 중복하는 경우들만 배열에 담음
    
//     let visited = Array(26).fill(false);
//     let temp = [];
//     let max = 0;
    
//     // num에 해당하는 조합을 만들어 orders에서 확인
//     function dfs(index, curOrder, num) {
//         if (curOrder.length == num) {
//             let [check, newMax] = checkOrders(curOrder);
//             if (check) {
//                 if (newMax == max)
//                     temp.push(curOrder);
//                 else if(newMax > max) {
//                     max = newMax;
//                     temp = [curOrder];
//                 }
//             }
//             return;
//         }
        
//         for (let i = index; i < 26; i++) {
//             if (!visited[i]) {
//                 visited[i] = true;
//                 dfs(i + 1, curOrder + String.fromCharCode(i + 65), num);
//                 visited[i] = false;
//             }
//         }
//     }
    
//     function checkOrders(order) {
//         let count = 0;
        
//         orders.forEach(o => {
//             let check = 0;
//             for (let i = 0; i < o.length; i++)
//                 for(let j = 0; j < order.length; j++)
//                     if (o[i] == order[j])
//                         check++;
//             if (check == order.length)
//                 count++;
//         });
        
//         if (count >= 2)
//             return [true, count];
//         else
//             return [false, 0];
//     }
    
    
//     course.forEach(c => {
//         max = 0;
//         dfs(0, "", c);
//         temp.forEach(item => {
//             answer.push(item);
//         });
//         temp = [];
//     });
    
//     return answer.sort();
// }

// 시간 초과로 인해 새로운 아이디어

// 주문이 들어온 알파벳만 조합하여 확인
function solution (orders, course) {
    const answer = [];
    
    const sortedOrders = orders.map(order => order.split('').sort().join(''));
    
    // 조합을 구하는 방식
    function combination(arr, selectNumber) {
        const result = [];
        
        if (selectNumber == 1) return arr.map((value) => [value]);
        
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combinations = combination(rest, selectNumber - 1);
            const attached = combinations.map((item) => [fixed, ...item]);
            result.push(...attached);
        });
        return result;
    }
    
    // course의 요리 개수 만큼 반복
    course.forEach(courseNum => {
        const menuCount = new Map();
        
        sortedOrders.forEach(order => {
            if (order.length < courseNum) return;
            
            const combinations = combination(order.split(''), courseNum);
            combinations.forEach(comb => {
                const menuName = comb.join('');
                menuCount.set(menuName, (menuCount.get(menuName) || 0) + 1);
            });
        });
        
        let maxCount = 0;
        
        for (const count of menuCount.values()) {
            if (count >= 2 && count > maxCount)
                maxCount = count;
        }
        
        if (maxCount >= 2) {
            for (const [menu, count] of menuCount.entries()) {
                if (count == maxCount)
                    answer.push(menu);
            }
        }
    });
    
    return answer.sort();
}
