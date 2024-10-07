package com.hararo.kopo_final_project.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PushSubscriptionDTO {
  private String endpoint;
  private Map<String, String> keys;
}
