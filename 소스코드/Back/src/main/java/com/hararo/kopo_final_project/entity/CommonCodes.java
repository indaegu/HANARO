package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "common_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonCodes {

  @Id
  private String commonCode;

  private String codeName;

  @ManyToOne
  @JoinColumn(name = "commonCodeTypeId")
  private CommonCodeTypes commonCodeTypeId;
}
