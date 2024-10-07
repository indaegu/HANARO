package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "common_code_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonCodeTypes {

  @Id
  private String commonCodeTypeId;

  private String commonCodeTypeName;
}
