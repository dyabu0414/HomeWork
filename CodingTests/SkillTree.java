class Solution {
    public int solution(String skill, String[] skill_trees) {
        int cnt= 0;
        //스킬트리 개수만큼 반복
        for(int i = 0; i < skill_trees.length; i++){
            //스킬트리가 가능하면 cnt+1
            if(isPossible(skill, skill_trees[i])){
                cnt++;
            }
        }
        return cnt;
    }
//스킬트리 판별
boolean isPossible(String skill, String tree){
    String words = "";
    //선행스킬에 있는 문자만 뽑는다.
    for(char c : tree.toCharArray()){
        String ch = String.valueOf(c);
        //선행스킬에 있는 문자면 words에 추가
        if(skill.contains(ch)){
            words += ch;
        }
    }
    //스킬트리에서 뽑은 문자를 선행 스킬의 인덱스로 체크
    if(skill.indexOf(words) == 0){
        return true;
    }
    return false;
    }
}