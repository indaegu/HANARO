package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BenefitLimits {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long benefitLimitId; // 혜택 한도 고유값

  private Long minimumRange; //전월 실적 최소 범위

  private Long maximumRange; //전월 실적 최대 범위

  private Integer benefitAmount; // 혜택 금액 ex) 500, 300

  private Double benefitRate; // 혜택 비율 ex) 0.05, 0.1

  private Long benefitLimit; // 혜택 한도

  private Integer minimumPaymentAmount; // 혜택을 받기 위한 최소 결제 금액

  @ManyToOne
  @JoinColumn(name = "fixedOrRateCode", insertable = false, updatable = false)
  private CommonCodes fixedOrRateCode; // 고정금액인지, 비율인지

  @ManyToOne
  @JoinColumn(name = "benefitAreaCategoryCode", insertable = false, updatable = false)
  private CommonCodes benefitAreaCategoryCode;

  @ManyToOne
  @JoinColumn(name = "benefitId", insertable = false, updatable = false)
  private Benefits benefitId; // 참조할 혜택의 ID
}
