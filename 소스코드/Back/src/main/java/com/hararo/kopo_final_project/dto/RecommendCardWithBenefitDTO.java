package com.hararo.kopo_final_project.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendCardWithBenefitDTO {

  private String cardProductId; // 카드 상품 고유번호
  private String cardProductName; // 카드 상품 이름
  private String cardProductImgUrl; // 카드 상품 이미지
  private BigDecimal benefitAllAmount; // 더 받을 수 있었던 총 혜택 금액
  private Double pickingRate; // 피킹률 = (총 혜택금액 - (연회비 / 12)) / 총 결제 금액
  private String cardApplyUrl; // 카드 신청 Url
  private List<Benefits> benefits; // 각 카테고리별 혜택의 리스트
  private List<BenefitsDescription> benefitsDescriptions; // 혜택 요약 설명
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class Benefits {
    private String benefitIcon; // 혜택 아이콘 : db에 저장되어 있지 않고 별도로 전송 예정
    private BigDecimal amount; // 해당 카테고리에 사용한 금액
    private String benefitCategoryName; // 혜택 카테고리명 ex) 주유, 택시, 대중교통, 마트, 온라인쇼핑, 백화점, 여행, 해외결제, 항공, 영화, 커피, 통신, 구독, 조건X, 편의점 중 하나
    private BigDecimal benefitAmount; // 할인 받은 혜택 금액
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class BenefitsDescription{
    private String benefitDescription;
  }
}
