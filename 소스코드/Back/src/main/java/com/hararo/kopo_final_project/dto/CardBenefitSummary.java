package com.hararo.kopo_final_project.dto;

import java.math.BigDecimal;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardBenefitSummary {
  private String cardId;
  private String cardName;
  private String cardImgUrl;
  private BigDecimal totalBenefit;
  private Double pickingRate;
  private String cardApplyUrl;
  private BigDecimal annualFee;
  private Map<String, BigDecimal> categoryBenefits;
}