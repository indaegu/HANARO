package com.hararo.kopo_final_project.dto;

import ch.qos.logback.core.rolling.helper.IntegerTokenConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IncomeTaxDeductionDTO {
  private Integer income; // 손님이 입력한 연 수익

  private Integer creditAmount; // 신용카드 사용 금액, 사용자 보유 카드에서 코드가 CREDIT
  private Integer debitAmount; // 체크카드 사용 금액, 사용자 보유 카드에서 코드가 DEBIT

  private Integer creditDeductibleAmount; // 신용카드 공제 가능 금액
  private Integer creditDeductedAmount; // 신용카드 공제액

  private Integer debitDeductibleAmount; // 체크카드 공제 가능 금액
  private Integer debitDeductedAmount; // 체크카드 공제액

  private Integer creditApprovalCount; // 신용카드 결제 횟수
  private Integer debitApprovalCount; // 체크카드 결제 횟수

  private Double estimatedApplicableTaxRate; // 예상 적용 세율 : 15% -> 0.15
  private Integer estimatedAmount; // 아낄수 있는 예상금액

  private String commentCode; // 소비 전략 코드
  private Integer remainingAmount; // 연소득의 25%를 달성하기 까지 남은 금액 : 이미 달성한 경우 0으로 변환
  /*
    1. creditAmount + debitAmount가 income의 25%가 넘지 않을때 : 신용카드를 사용을 유도
    2. 소득 공제의 한도를 모두 채웠을때 : 받을 수 있는 모든 소득공제를 받았다고 공지
    3. 아직 받을 수 있는 공제액이 남아 있을때 : 체크 카드 사용을 유도
   */
}
