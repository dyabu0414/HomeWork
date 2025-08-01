import java.util.*;

class Solution {
    public int[] solution(int[] fees, String[] records) {
        // 차량 번호를 키로 하고, 입출차 시간(분 단위)을 저장하는 리스트를 값으로 가지는 TreeMap
        // TreeMap은 차량 번호를 오름차순으로 자동 정렬해줌
        TreeMap<String, List<Integer>> map = new TreeMap<>();

        // 하루의 마지막 시간: 23시 59분 → 분으로 변환
        int exitTime = 23 * 60 + 59;

        // 차량 입출차 기록을 파싱하여 map에 저장
        for (String record : records) {
            String[] parts = record.split(" "); // "시각 차량번호 내역" 형식
            int time = toMinutes(parts[0]);     // 시각을 분 단위로 변환
            String carNum = parts[1];           // 차량 번호

            // 해당 차량 번호가 없으면 새로운 리스트 생성
            map.putIfAbsent(carNum, new ArrayList<>());

            // 해당 차량 번호 리스트에 입출차 시간 저장
            map.get(carNum).add(time);
        }

        // 정답 배열 (차량 번호 오름차순)
        int[] answer = new int[map.size()];
        int idx = 0;

        // 차량별로 총 주차 시간 계산
        for (Map.Entry<String, List<Integer>> entry : map.entrySet()) {
            List<Integer> times = entry.getValue();

            // 만약 출차 기록이 없다면, 23:59에 출차한 것으로 간주
            if (times.size() % 2 == 1) times.add(exitTime);

            int totalTime = 0;

            // 짝을 이루는 입차-출차 시간을 계산하여 총 주차 시간 누적
            for (int i = 0; i < times.size(); i += 2) {
                totalTime += times.get(i + 1) - times.get(i); // 출차 - 입차
            }

            // 주차 요금 계산 후 정답 배열에 저장
            answer[idx++] = calculateFee(totalTime, fees);
        }

        return answer;
    }

    // "HH:MM" 형식의 문자열을 분 단위로 변환하는 함수
    private int toMinutes(String time) {
        String[] parts = time.split(":");
        return Integer.parseInt(parts[0]) * 60 + Integer.parseInt(parts[1]);
    }

    // 주차 요금을 계산하는 함수
    private int calculateFee(int totalTime, int[] fees) {
        int baseTime = fees[0];  // 기본 시간 (분)
        int baseFee = fees[1];   // 기본 요금
        int unitTime = fees[2];  // 단위 시간 (분)
        int unitFee = fees[3];   // 단위 요금

        // 기본 시간 이하면 기본 요금만 부과
        if (totalTime <= baseTime) {
            return baseFee;
        } else {
            // 초과 시간에 대해 단위 요금 부과 (올림 처리)
            return baseFee + (int) Math.ceil((double)(totalTime - baseTime) / unitTime) * unitFee;
        }
    }
}
