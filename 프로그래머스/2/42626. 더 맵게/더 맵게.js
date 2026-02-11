class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    
    add(value) {
        this.heap.push(value);
        this.bubbleUp();
    }
    
    bubbleUp() {
        let index = this.size() - 1;
        let parentIndex = Math.floor((index-1)/2);
        
        while(
            this.heap[parentIndex] !== undefined &&
            this.heap[parentIndex] > this.heap[index]
        ){
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index-1)/2);
        }
    }
    
    delete() {
        if (this.size() === 1)
            return this.heap.pop();
        let value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return value;
    }
    
    bubbleDown() {
        let index = 0;
        let leftIndex = index * 2 + 1;
        let rightIndex = index * 2 + 2;
        
        while(
            (this.heap[leftIndex] !== undefined && this.heap[leftIndex] < this.heap[index]) ||
            (this.heap[rightIndex] !== undefined && this.heap[rightIndex] < this.heap[index])
        ) {
            let smallIndex = leftIndex;
            
            if (this.heap[rightIndex] !== undefined && this.heap[leftIndex] > this.heap[rightIndex])
                smallIndex = rightIndex;
            
            this.swap(index, smallIndex);
            index = smallIndex;
            leftIndex = index * 2 + 1;
            rightIndex = index * 2 + 2;
        }
    }
}

function solution(scoville, K) {
    var answer = 0;
    
    const heap = new MinHeap();
    
    for (const s of scoville) heap.add(s);
    
    while (heap.heap[0] < K) {
        if (heap.size() < 2) return -1;

        const first = heap.delete();
        const second = heap.delete();
        const mixed = first + second * 2;
        
        heap.add(mixed);
        answer++;
    }
    
    return answer;
}