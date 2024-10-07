package com.hararo.kopo_final_project.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDTO {
  private String userId;
  private String userName;
  private Integer income;
}
