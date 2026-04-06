const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\r?\n/);

const T = input[0];

let line = 0;

class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }
  push_front(item) {
    if (this.arr[0]) {
      for (let i = this.arr.length; i > 0; i--) {
        this.arr[i] = this.arr[i - 1];
      }
    }
    this.arr[this.head] = item;
    this.tail++;
  }
  push_back(item) {
    this.arr[this.tail++] = item;
  }
  pop_front() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      return result;
    }
  }
  pop_back() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[--this.tail];
      return result;
    }
  }
}

for (let i = 0; i < T; i++) {
  let temp = input[++line];
  let num = input[++line];
  let arr = JSON.parse(input[++line]);

  let deque = new Deque();
  for (let i = 0; i < arr.length; i++) deque.push_back(arr[i]);
  let ans = [];
  let check = 0;
  let arrdir = true;

  for (let j = 0; j < temp.length; j++) {
    if (temp[j] == 'R') {
      arrdir = !arrdir;
      continue;
    }

    //arrdir: true 앞
    //arrdir: false 뒤
    if (temp[j] == 'D') {
      if (arrdir) {
        let pop = deque.pop_front();
        if (pop == null) {
          check = 1;
          break;
        }
      } else {
        let pop = deque.pop_back();
        if (pop == null) {
          check = 1;
          break;
        }
      }
    }
  }

  if (check == 0) {
    let start = deque.head;
    let end = deque.tail;
    for (let j = start; j < end; j++) {
      if (arrdir) ans.push(deque.pop_front());
      else ans.push(deque.pop_back());
    }
    ans = JSON.stringify(ans);
  } else ans = 'error';

  console.log(ans);
}
