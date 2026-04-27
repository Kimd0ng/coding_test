function solution(files) {
    // 들어온 파일명 구분
    // 처음 숫자 등장 전까지 head
    // 숫자 끝나는 부분까지 number
    // 나머지 모두 tail -> 빈 배열 가능
    
    // head 사전순 정렬 -> 동일 head일 경우 number 정렬 -> 두부분 모두 동일할 경우 원 순서 유지
    
    const heap = new MinHeap();

    files.forEach((file, index) => {
        // 정규표현식 설명: 
        // ^(\D+) : 숫자가 아닌 문자가 처음부터 1개 이상 (HEAD)
        // (\d{1,5}) : 숫자가 1~5개 (NUMBER)
        // (.*) : 나머지 (TAIL)
        const match = file.match(/^(\D+)(\d{1,5})(.*)/);
        
        heap.push({
            original: file,
            head: match[1].toLowerCase(), // 비교를 위해 소문자화
            number: parseInt(match[2]),   // 비교를 위해 숫자로 변환
            index: index                  // 원래 순서 기록 (중요!)
        });
    });

    const answer = [];
    while (heap.heap.length > 1) {
        answer.push(heap.pop().original);
    }

    return answer;
}

class MinHeap {
    constructor() {
        this.heap = [null];
    };
    
    size = () => {
        return this.heap.length - 1;
    };
    
    shouldSwap(parentIdx, childIdx) {
        const p = this.heap[parentIdx];
        const c = this.heap[childIdx];

        // 1. HEAD 비교 (대소문자 무시)
        if (p.head !== c.head) return p.head > c.head;
        
        // 2. NUMBER 비교
        if (p.number !== c.number) return p.number > c.number;

        // 3. 입력 순서 유지 (Stable Sort 보장)
        return p.index > c.index;
    }
    
    push = (value) => {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parentIdx = Math.floor(curIdx/2);
        
        while (curIdx > 1 && this.shouldSwap(parentIdx, curIdx)) {
            this.swap(curIdx, parentIdx);
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx/2);
        }
    };
    
    pop() {
        if (this.heap.length <= 1) return null;
        if (this.heap.length === 2) return this.heap.pop();

        const result = this.heap[1];
        this.heap[1] = this.heap.pop();
        let curIdx = 1;

        while (true) {
            let leftIdx = curIdx * 2;
            let rightIdx = curIdx * 2 + 1;
            let smallestIdx = curIdx;

            if (leftIdx < this.heap.length && this.shouldSwap(smallestIdx, leftIdx)) {
                smallestIdx = leftIdx;
            }
            if (rightIdx < this.heap.length && this.shouldSwap(smallestIdx, rightIdx)) {
                smallestIdx = rightIdx;
            }

            if (smallestIdx === curIdx) break;

            this.swap(curIdx, smallestIdx);
            curIdx = smallestIdx;
        }
        return result;
    }
    
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}