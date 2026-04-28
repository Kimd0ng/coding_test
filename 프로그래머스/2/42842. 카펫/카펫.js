function solution(brown, yellow) {
    for (let i = 3; i < brown - 1; i++) {
        if ((yellow / (i -2) + 2) * i == brown + yellow) 
            return [Math.max(i, (yellow / (i -2) + 2)), Math.min(i, (yellow / (i -2) + 2))]
    }
}