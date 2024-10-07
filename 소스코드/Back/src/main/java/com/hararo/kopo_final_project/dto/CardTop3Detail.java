package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardTop3Detail {

  private String categoryName;
  private List<CardDetail> cardDetailList;
  @Data
  @AllArgsConstructor
  public static class CardDetail{
    private List<CardBenefit> cardBenefitList;
    private String cardName;
    private Integer point;
    private String cardImgUrl;

    @Data
    @AllArgsConstructor
    public static class CardBenefit{
      private String cardBenefit;
    }
  }
}
