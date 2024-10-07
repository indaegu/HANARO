package com.hararo.kopo_final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewCardDTO {
  private String cardId;
  private String newCardName;
  private String newCardImgUrl;
  private String newCardDescription;
}
