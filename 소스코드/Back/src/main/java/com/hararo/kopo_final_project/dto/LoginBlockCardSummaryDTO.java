package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginBlockCardSummaryDTO {
  private List<CardData> cardDataList;

  @Data
  @AllArgsConstructor
  public static class CardData {
    private String cardName;
    private String cardImgUrl;
    private String cardNumber;
    private int amount;
  }
}
