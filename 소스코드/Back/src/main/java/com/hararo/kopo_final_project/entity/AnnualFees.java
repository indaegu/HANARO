package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "annual_fees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnualFees {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 연회비의 고유 id

  @ManyToOne
  @JoinColumn(name = "cardProductId")
  private CardProducts cardProductId; // 해당되는 카드 상품 ID

  private String annualFeeDescription; // 연회비 설명

  private Integer annualFeeAmount; // 연회비

}
