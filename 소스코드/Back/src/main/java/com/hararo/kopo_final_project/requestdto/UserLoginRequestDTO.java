package com.hararo.kopo_final_project.requestdto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginRequestDTO {
  private String userId;
  private String password;
}