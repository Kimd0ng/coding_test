// function solution(elements) {
//     var answer = new Set();
    
//     let n = 1;
    
//     while (n <= elements.length) {
//         for (let i = 0; i < elements.length; i++) {
//             let sum = 0;
//             for (let j = i; j < i + n; j++) {
//                 sum += elements[j % elements.length];
//             }
//             answer.add(sum);
//         }

//         n++;
//     }
    
    
//     return answer.size;
// }

//효율적인 방법 누적합 이용
function solution(elements) {
    var answer = new Set();
    
    let len = elements.length;
    
    let new_array = [...elements, ...elements];
    
    for (let i = 0; i < len; i++) {
        let sum = 0;
        for (let j = 0; j < len; j++) {
            sum += new_array[i + j];
            answer.add(sum);
        }
    }
    
    return answer.size;
}