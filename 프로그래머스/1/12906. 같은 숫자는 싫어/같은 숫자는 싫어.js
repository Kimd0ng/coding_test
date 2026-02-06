function solution(arr)
{
    var answer = [];

    answer.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] != answer.pop()){
            answer.push(arr[i-1]);
            answer.push(arr[i]);
        } else
            answer.push(arr[i]);
            
    }
    
    return answer;
}
// 참고 방식
// function solution(arr)
// {
//     return arr.filter((val,index) => val != arr[index+1]);
// }