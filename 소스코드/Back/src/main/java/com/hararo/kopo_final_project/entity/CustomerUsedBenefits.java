package com.hararo.kopo_final_project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_used_benefits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerUsedBenefits {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int customerCategoryBenefitId; // 카테고리별 혜택 한도 관리 고유 ID

  @ManyToOne
  @JoinColumn(name = "customerCardId", insertable = false, updatable = false)
  private CustomerCards customerCardId; // 해당 혜택이 적용되고 있는 사용자 카드

  @ManyToOne
  @JoinColumn(name ="benefitLimitId")
  private BenefitLimits benefitLimitId; // 사용하고 있는 혜택 한도 고유값

  private int usedBenefit; // 사용한 혜택

  private Timestamp usageDate; // 사용일자 추가

}


