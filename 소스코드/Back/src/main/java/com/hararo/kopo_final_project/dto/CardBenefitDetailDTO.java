package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardBenefitDetailDTO {
  private String cardName;
  private String cardImage;
  private String cardNumber;
  private String applicationDate;
  private String cardStatus;
  private int usedAmount;
  private List<Integer> performanceBracket;
  private int customPerformanceBracket;
  private int amountUntilNextBracket;
  private CurrentRange currentRange;
  private String pdfUrl;  // PDF 파일 URL을 위한 새 필드 추가
  private List<TransactionDetail> transactionDetails; // 결제 내역 리스트 추가

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class CurrentRange {
    private int rangeNum; // 프론트에선 사용 안할예정
    private List<Integer> range; // 구간의 종류들
    private int totalMaxBenefitAmount; // 현재 구간에서 받을 수 있는 최대 금액
    private int usedBenefitAmount;
    private int remainingBenefitAmount;
    private List<Benefit> benefits;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class Benefit {
    private String description;
    private Long cashBackAmount; // 캐시백이라면 캐시백 금액이 들어감
    private Long discountAmount; // 할인이라면 할인 금액이 들아감
    private String type; // 캐시백인지 할인인지
    private Integer usedAmount; // 사용한 금액
    private Integer remainingAmount; // 남은 금액
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class TransactionDetail {
    private String transactionName; // 결제 내역 이름 (거래처)
    private int transactionAmount; // 결제 금액
    private int benefitAmount; // 혜택 금액
    private String cardUsed; // 결제 카드
    private String transactionTime; // 결제 시간 (예: 17:29)
    private String transactionDate; // 결제 날짜 (예: 08.14 (수))
    private String transactionCategory; // 결제 카테고리
  }
}
