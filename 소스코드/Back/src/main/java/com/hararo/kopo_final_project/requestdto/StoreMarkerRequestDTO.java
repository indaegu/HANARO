package com.hararo.kopo_final_project.requestdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class StoreMarkerRequestDTO {
  private String token;
  private Double latitude;
  private Double longitude;
  private Double distance;
  private String category;
}
