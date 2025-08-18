import java.util.*;

class Solution {
    public String solution(int[] numbers) {
     
        // 숫자를 문자열로 변환하여 저장
        List<String> list = new ArrayList<String>();
        
        // list에 숫자 넣기
        for(int n : numbers){
            list.add(String.valueOf(n));
        }
        
        //정렬 순서를 지정하여 정렬
        Collections.sort(list, new Comparator<String>(){
        
            @Override
            public int compare(String o1, String o2){

            //o1과 o2를 비교 -> o1과 o2를 붙였을 때 더 큰 값이 앞에 오도록 정렬
            String str1 = o1+o2;
            String str2 = o2+o1;
            //큰 값이 앞에 오도록 내림차순 정렬
            return str2.compareTo(str1);
        }
        });
        
        //정렬된 문자들을 하나로 붙이기
        String answer = "";
        for(String s : list){
            answer += s;
        }
        // 모든 숫자가 0 일 경우 -> 0000... 이 아닌 0 으로 반환 
        if(answer.startsWith("0")) answer = "0";
        return answer;
    }
}
