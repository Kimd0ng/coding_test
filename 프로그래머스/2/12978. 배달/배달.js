function solution(N, road, K) {
    
    class PriorityQueue {
        constructor() {
            this.heap = [];
        }
        
        size() {
            return this.heap.lenght;
        }
        
        isEmpty() {
            return this.heap.length === 0;
        }
        
        swap(idx1, idx2) {
            [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
        }
        
        enqueue(to, dist) {
            this.heap.push({to, dist});
            this.heapifyUp(this.heap.length - 1);
        }
        
        heapifyUp(index) {
            while (index > 0) {
                const parentIndex = (index - 1) >> 1;
                if (this.heap[parentIndex].dist <= this.heap[index].dist) break;
                this.swap(parentIndex, index);
                index = parentIndex;
            }
        }
        
        denqueue() {
            const min = this.heap[0];
            const end = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = end;
                this.heapifyDown(0);
            }
            return min;
        }
        
        heapifyDown(index) {
            while (index < this.heap.length) {
                const left = (index << 1) + 1;
                const right = (index << 1) + 2;
                let smallest = index;
                if (this.heap[left] && this.heap[left].dist < this.heap[smallest].dist)
                    smallest = left;
                if (this.heap[right] && this.heap[right].dist < this.heap[smallest].dist)
                    smallest = right;
                if (smallest === index) break;
                this.swap(index, smallest);
                index = smallest;
            }
        }
    }
    
    var answer = 0;
    
    const graph = Array.from({length: N+1}, () => Array().fill([]));
    
    road.forEach(([a,b,c]) => {
        graph[a].push({to:b, dist:c});
        graph[b].push({to:a, dist:c});
    })
                             
    // for (let i = 0; i < road.length; i++){
    //     graph[road[i][0]].push({to: road[i][1], dist:road[i][2]});
    //     graph[road[i][1]].push({to: road[i][0], dist:road[i][2]});
    // }
    
    const distance = Array(N + 1).fill(Infinity);
    
    function dijkstra(start) {
        const pq = new PriorityQueue();
        pq.enqueue(start, 0);
        distance[start] = 0;
        while (!pq.isEmpty()) {
            let {to, dist} = pq.denqueue();
            if (distance[to] < dist) continue;
            for (let Next of graph[to]){
                const acc = distance[to] + Next.dist;
                if (distance[Next.to] > acc) {
                    distance[Next.to] = acc;
                    pq.enqueue(Next.to, acc);
                }
            }
        }
    }
    
    dijkstra(1);
    
    console.log(distance);
    
    for (let i = 0; i < distance.length; i++)
        if (distance[i] <= K) answer++;
    
    
//     const queue = [{to:1, dist:0}];
    
//     dist[1] = 0;
    
//     while (queue.length > 0) {
//         const {to} = queue.pop();
        
//         graph[to].forEach((Next) => {
//             const acc = dist[to] + Next.dist;
//             if (dist[Next.to] > acc) {
//                 dist[Next.to] = acc;
//                 queue.push(Next);
//             }
//         });
//     }
    
    
    return answer;
}