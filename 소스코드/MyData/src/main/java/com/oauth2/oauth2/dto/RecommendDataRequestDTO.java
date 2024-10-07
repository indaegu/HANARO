package com.oauth2.oauth2.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendDataRequestDTO {
  private String userId;
  private String ci;
  private String token;
  private List<CardApprovalDTO> approvals;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class CardApprovalDTO{
    private String approvalNumber; // 카드 결제 번호

    private String approvalDate; // 결제 시간

    private Integer approvalAmount; // 결제 금액

    private Integer benefitAmount; // 받은 혜택 금액

    private String customerCard; // 결제 카드 번호

    private String merchantId; // 결제 가맹점 고유 ID

    private String approvalStatusCode; // 결제 상태 번호

    private String paymentCategoryCode; // 결제 카테고리 코드
  }
}