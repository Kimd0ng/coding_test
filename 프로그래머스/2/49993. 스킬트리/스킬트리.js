function solution(skill, skill_trees) {
    var answer = 0;
    
    for (let skill_tree of skill_trees) {
        let index = 0;
        let check = skill;
        let can = true;
        
        for (let i = 0; i < skill_tree.length; i++) {
            if (check.includes(skill_tree[i])){
                if (check[0] != skill_tree[i]) {
                    can = false;
                    break;
                } else {
                    check = check.slice(1);
                }
            }
        }
        
        if (can) answer++;
    }
    
    
    return answer;
}