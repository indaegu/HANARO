package com.hararo.kopo_final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardProductDTO {
  private String cardName;
  private String cardId;
  private String cardDescription;
  private String cardImgUrl;
}
