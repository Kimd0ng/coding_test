function solution(s) {
    let array = s.split(" ").map(Number);
    
    let max = 0;
    let min = 0;
    
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            max = array[i];
            min = array[i];
        } else {
            if (max < array[i]) max = array[i];
            if (min > array[i]) min = array[i];
        }
    }
    
    return min + " " + max;
}