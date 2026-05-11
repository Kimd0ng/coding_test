// 처음 3글자면 -> AAA
// 처음 4글자면 -> AAAA

// 어떤 글자든 A에서 시작

// A에서 원하는 글자로 돌리는 최적의 경우의 수는 정해져있음
// 좌우 이동을 최소로
    // 어떻게 이동하든 동일한거 아니냐
    // 중간에 A가 없는 경우 항상 글자의 -1 만큼 이동
    // 중간의 A뭉텅이가 문제
    // 반복문을 돌며 현재 위치 이후에 나타나는 연속된 A의 끝 지점을 찾는다.

// 경로를 분리해보면
// 1. 경로 A (기본값): 오른쪽으로 끝까지 쭉 가는 경우
// 2. 경로 B (오른쪽 꺾기): 오른쪽으로 가다가 연속된 'A'를 만나면, 다시 왼쪽으로 돌아가서 뒤에서부터 접근하는 경우
// 3. 경로 C (왼쪽 꺾기): 처음부터 바로 왼쪽으로 가서 뒤에서부터 접근하다가, 다시 오른쪽으로 돌아오는 경우


function solution(name) {
    let totalMove = 0; // 총 조이스틱 조작 횟수
    let length = name.length;
    
    // 1. 좌우 이동의 기본값: 한 방향으로 쭉 직진하는 경우 (문자열 길이 - 1)
    let minLeftRightMove = length - 1;

    for (let i = 0; i < length; i++) {
        // [STEP 1] 상하 이동 횟수 계산
        // 현재 문자의 아스키코드 값을 가져옵니다.
        let charCode = name.charCodeAt(i);
        
        // 위로 이동하는 횟수와 아래로 이동하는 횟수 중 작은 값을 더합니다.
        let upMove = charCode - 65; // 65는 'A'의 아스키코드
        let downMove = 90 - charCode + 1; // 90은 'Z'의 아스키코드
        totalMove += Math.min(upMove, downMove);

        // [STEP 2] 좌우 이동 횟수 계산 (연속된 A 건너뛰기)
        // 현재 위치(i) 다음부터 연속된 'A'가 어디까지 이어지는지 확인합니다.
        let nextIndex = i + 1;
        while (nextIndex < length && name[nextIndex] === 'A') {
            nextIndex++;
        }

        // 연속된 'A'를 피해서 가는 두 가지 경로의 거리를 계산합니다.
        
        // 경로 1: 원점에서 오른쪽으로 i만큼 왔다가, 다시 원점으로 돌아가서 왼쪽으로 가는 경우
        // 이동 거리 = (오른쪽으로 온 거리 i) * 2 + (뒤에서 남은 거리 length - nextIndex)
        let moveRightThenLeft = (i * 2) + (length - nextIndex);
        
        // 경로 2: 원점에서 왼쪽으로 먼저 갔다가, 다시 원점으로 돌아와서 오른쪽으로 가는 경우
        // 이동 거리 = (뒤에서 온 거리 length - nextIndex) * 2 + (오른쪽으로 갈 거리 i)
        let moveLeftThenRight = (length - nextIndex) * 2 + i;

        // 기존 최솟값, 경로 1, 경로 2 중 가장 작은 값으로 업데이트합니다.
        minLeftRightMove = Math.min(minLeftRightMove, moveRightThenLeft, moveLeftThenRight);
    }

    // 최종적으로 상하 이동 횟수와 좌우 이동 최솟값을 합산하여 반환합니다.
    return totalMove + minLeftRightMove;
}