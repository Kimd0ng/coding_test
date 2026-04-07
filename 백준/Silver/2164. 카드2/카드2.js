const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let n = input;

class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(value) {
        this.queue[this.rear++] = value;
    }

    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return value;
    }

    size() {
        return this.rear - this.front;
    }

    peek() {
        return this.queue[this.front];
    }
}

//문제 풀이 로직
function solution(n) {
    let count = 1;
    let temp = 0;
    card = new Queue();

    for (i = 1; i <= n; i++) {
        card.enqueue(i);
    }
    for (;;) {
        if (card.size() == 1) return card.peek();

        if (count == 0) {
            temp = card.dequeue();
            card.enqueue(temp);
            count = 1;
        }
        if (count == 1) {
            card.dequeue();
            count = 0;
        }
    }
}

console.log(solution(n));