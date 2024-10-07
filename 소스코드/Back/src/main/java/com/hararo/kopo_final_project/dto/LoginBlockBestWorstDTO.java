package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginBlockBestWorstDTO {
  private String month; // 현재월
  private Integer amount; // 이번달 총 결제 금액
  private Integer benefit; // 이번달 총 혜택 금액
  private List<PaymentItemData> paymentItemDataList; // 각 카테고리별 정보
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class PaymentItemData {
    private String category; // 카테고리명
    private String amount; // 카테고리별 결제 총액
    private String benefit; // 카테고리별 혜택 총액
  }
}
