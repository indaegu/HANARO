package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardProductDetailDTO {

  private String cardImgUrl; // 카드 이미지 URl / Card_Products 테이블
  private String cardName; // 카드 이름 / Card_Products 테이블
  private String cardDescription; // 카드 한줄 소개 / Card_Products 테이블
  private String cardProductPdfUrl; // 카드 상품 약관 pdf url / Card_Products 테이블
  private String cardApplyUrl; // 카드 신청하기 링크 url / Card_Products 테이블
  private String cardReleaseDate; // 카드 출시일 / Card_Products 테이블
  private String complianceReview; // 준법심의 / Card_Products 테이블
  private List<AnnulFee> annualFeeList; // 연회비 소개 / AnnualFees 테이블
  private List<MajorBenefit> majorBenefitList; // 주요 혜택 List / Benefits 테이블
  private List<DetailBenefit> detailedBenefitList; // 상세 혜택 List / 
  private List<UseInstruction> useInstructionList; // 이용안내 List

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class AnnulFee{
    private String annulFeeDescription; // 연회비 소개
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class MajorBenefit {
    private String benefitTitle; // 혜택 제목
    private String benefitDescription; // 혜택 소개
    private String benefitIconImgUrl; // 혜택 Icon Url
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class DetailBenefit{
    private String detailBenefitTitle; // 상세 혜택 제목
    private String detailBenefitDescription; // 상세 혜택 내용
    private String detailBenefitIconImgUrl; // 상세혜택 icon url
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class UseInstruction{
    private String useInstructionTitle; // 이용안내 제목
    private String useInstructionDescription; // 이용안내 상세 내용
  }
}
