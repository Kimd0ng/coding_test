function solution(genres, plays) {
    const answer = [];
    const save = {};
    const genreTotal = {};

    // 데이터 구조화 & 총합 계산
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const play = plays[i];

        if (!save[genre]) {
            save[genre] = [];
            genreTotal[genre] = 0;
        }
        
        save[genre].push({ id: i, play });
        genreTotal[genre] += play;
    }

    // 1. 어떤 장르를 먼저 넣을지 정렬
    const sortedGenres = Object.keys(genreTotal).sort((a, b) => genreTotal[b] - genreTotal[a]);

    // 2. 각 장르 내에서 곡 정렬 후 최대 2개 선택
    sortedGenres.forEach(genre => {
        const songs = save[genre].sort((a, b) => {
            return b.play - a.play || a.id - b.id; // 재생수 내림차순, 같으면 id 오름차순
        });

        answer.push(songs[0].id);
        if (songs[1]) answer.push(songs[1].id);
    });

    return answer;
}