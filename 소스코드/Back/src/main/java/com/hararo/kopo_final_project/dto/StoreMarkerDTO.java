package com.hararo.kopo_final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoreMarkerDTO {
  private Integer id;
  private String name;
  private Double latitude;
  private Double longitude;
  private String category;
  private String storeImgUrl;
  private String iconImgUrl;
  private Detail detail;

  @Data
  @AllArgsConstructor
  public static class Detail{
    private String address;
//    private String contact;
    private String hours;
    private String description;
  }
}
