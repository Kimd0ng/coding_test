function solution(orders, course) {
    var answer = [];
    
    let sortedOrders = orders.map(order => order.split('').sort().join(''));
    
    function combination(arr, selectedNumber) {
        let result = [];
        
        if (selectedNumber == 1) return arr.map((value) => [value]);
        
        arr.forEach((fixed, index, origin) => {
            let rest = origin.slice(index + 1);
            let combinations = combination(rest, selectedNumber - 1);
            let attached = combinations.map((item) => [fixed, ...item]);
            result.push(...attached);
        });
        
        return result;
    }
    
    course.forEach(courseNum => {
        let menuCount = new Map();
        
        sortedOrders.forEach(order => {
            if (order.length < courseNum) return;
            
            let combinations = combination(order.split(''), courseNum);
            
            combinations.forEach(comb => {
                let menuName = comb.join('');
                menuCount.set(menuName, (menuCount.get(menuName) || 0) + 1);
            }); 
        });
        
        // 최대 찾기
        let maxCount = 0;
        
        for (const count of menuCount.values()) {
            if (count >= 2 && count > maxCount)
                maxCount = count;
        }
        
        if (maxCount >= 2) {
            for (const [menu, count] of menuCount.entries()){
                if (count == maxCount)
                    answer.push(menu);
            }
        }
    });
    
    return answer.sort();
}