package com.hararo.kopo_final_project.dto;

import java.math.BigDecimal;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryTotalDTO {
  private String categoryCode;
  private String categoryName;
  private BigDecimal totalAmount;

  // Long 타입을 매개변수로 받는 생성자 추가
  public CategoryTotalDTO(String categoryCode, String categoryName, Long totalAmount) {
    this.categoryCode = categoryCode;
    this.categoryName = categoryName;
    this.totalAmount = (totalAmount != null) ? BigDecimal.valueOf(totalAmount) : BigDecimal.ZERO;
  }
}