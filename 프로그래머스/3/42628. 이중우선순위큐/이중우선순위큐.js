function solution(operations) {
    const queue = [];

    for (const op of operations) {
        const [cmd, valStr] = op.split(' ');
        const val = Number(valStr);

        if (cmd == 'I') {
            // 이진 탐색을 통한 삽입 위치 탐색
            let left = 0;
            let right = queue.length - 1;
            let mid;
            
            while (left <= right) {
                mid = Math.floor((left + right) / 2);
                if (queue[mid] == val) {
                    left = mid;
                    break;
                }
                if (queue[mid] < val) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            // 찾은 위치에 값 삽입 (오름차순 유지)
            queue.splice(left, 0, val);
            
        } else if (cmd == 'D' && queue.length > 0) {
            if (val == 1) {
                queue.pop(); // 최댓값 삭제
            } else if (val == -1) {
                queue.shift(); // 최솟값 삭제
            }
        }
    }

    if (queue.length == 0) {
        return [0, 0];
    } else {
        return [queue[queue.length - 1], queue[0]];
    }
}