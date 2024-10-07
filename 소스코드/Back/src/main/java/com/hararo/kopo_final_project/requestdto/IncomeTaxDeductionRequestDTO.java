package com.hararo.kopo_final_project.requestdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IncomeTaxDeductionRequestDTO {
  private String userId; // 손님이 입력한 연 수익
  private String token; // 토큰
  private Integer income; // 연 수익
}
