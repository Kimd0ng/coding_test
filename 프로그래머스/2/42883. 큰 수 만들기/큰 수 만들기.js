 
// 항상 최적의 해를 찾는것이 핵심
// 가장 큰수를 만드는게 목적
// 가장 큰수를 만드는 방법은 가장큰 첫번째 자리수를 찾아야함
// maxNum을 찾아서 앞의 숫자를 다 지워버리면 가능
    // 이때 추가적으로 생각해야될것이 maxNum의 앞에 숫자의 개수가 지워야될 숫자의 개수보다 많을 경우
    // 새로운 큰수를 찾아야함
// 큰수앞의 숫자를 모두 제거했으면
// 뒤의 남은 숫자들중에서 큰수를 찾아 제거하는 방식을 무한 반복
// 최선의 선택하나를 잡아서 최적의 해에 도달하는것이 그리디
    
// function solution(number, k) {
//     let answer = '';
//     let startIndex = 0; // 탐색을 시작할 위치
//     const targetLength = number.length - k; // 만들어야 하는 숫자의 길이

//     // 목표 길이를 채울 때까지 반복 (그리디: 매 순간 최선의 수 선택)
//     for (let i = 0; i < targetLength; i++) {
//         let maxDigit = '0';
//         let maxIndex = startIndex;

//         // 주석 내용: maxNum의 앞의 숫자가 k보다 많으면 안 되므로 범위를 제한함
//         // 탐색 범위: startIndex부터 (전체 길이 - 남은 목표 길이)까지
//         for (let j = startIndex; j <= k + i; j++) {
//             if (number[j] > maxDigit) {
//                 maxDigit = number[j];
//                 maxIndex = j;
//                 if (maxDigit === '9') break; // 9는 최댓값이므로 바로 탈출(최적화)
//             }
//         }
        
//         answer += maxDigit;
//         startIndex = maxIndex + 1; // 찾은 큰 수의 다음부터 다시 탐색
//     }

//     return answer;
// }
        
    
// 최적화 부분에서 매번 최대값을 찾는 반복을 진행하게 된다면 O(n^2)이 발생할 수 있기 때문에
// 효율적으로 구성할 수 있는 방안중 하나인 스택을 이용하면 된다.
// 하나의 스택에 숫자를 넣고 이후에 들어오는 숫자가 크면 앞의 숫자는 버리는 방식으로 진행
function solution(number, k) {
    const stack = []
    let count = k; // 제거해야 할 숫자의 개수

    for (const digit of number) {
        // 주석 내용: 스택에 숫자를 넣고, 이후에 들어오는 숫자가 크면 앞의 숫자를 버림
        // 조건: 아직 지울 횟수가 남았고, 스택에 값이 있으며, 현재 숫자가 스택 top보다 클 때
        while (count > 0 && stack.length > 0 && stack[stack.length - 1] < digit) {
            stack.pop(); // 앞의 작은 숫자를 버림 (최적의 해 선택)
            count--;
        }
        stack.push(digit);
    }

    // 예외 처리: 만약 9999와 같이 숫자가 계속 작아지지 않아 k가 남은 경우 뒤를 자름
    return stack.slice(0, number.length - k).join('');
}