package com.hararo.kopo_final_project.requestdto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoreMarkerFilterRequestDTO {
  private String token;
  private double latitude;
  private double longitude;
  private String category;
}
