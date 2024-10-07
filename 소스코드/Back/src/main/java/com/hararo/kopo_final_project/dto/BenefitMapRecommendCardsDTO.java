package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BenefitMapRecommendCardsDTO{
    private String categoryName; // 적용되는 카테고리 영역
    private Double potentialApprovalAmount; // 잠재적 카테고리 평균 금액
    private List<BenefitMapRecommendCardDTO> benefitMapRecommendCardList;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BenefitMapRecommendCardDTO {
        private String cardId; // 카드 번호
        private String cardName; // 카드 이름
        private String cardImgUrl; // 카드 이미지 경로
        private String benefitDescription; // 혜택 요약 설명
        private Double potentialBenefitAmount; // 잠재적 혜택 금액
        private Integer usedBenefitAmount; // 이미 사용한 혜택 금액
        private Long remainingBenefitAmount; // 남은 혜택 금액
        private Long benefitLimit; // 총 혜택 한도 금액
    }
}
