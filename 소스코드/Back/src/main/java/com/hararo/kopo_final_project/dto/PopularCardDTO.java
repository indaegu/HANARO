package com.hararo.kopo_final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public  class PopularCardDTO {
  private String cardId;
  private String cardName;
  private String cardImgUrl;
}