package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customer_cards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerCards {

  @Id
  private String customerCardId; // 사용자 카드 번호 ex) 1234-1234-1234-1234

  private String expirationDate; // 카드 유효기간

  private Integer lastMonthPerformance; // 전월 사용 금액

  private Integer customerPerformanceSegment; // 사용자 지정 목표 실적 금액

  @ManyToOne
  @JoinColumn(name = "customerId")
  private Customers customerId; // 보유한 사용자

  @ManyToOne
  @JoinColumn(name = "cardProductId")
  private CardProducts cardProductId; // 카드 상품 ID

  @ManyToOne
  @JoinColumn(name = "cardStatusCode")
  private CommonCodes cardStatusCode; // 카드 상태 ex) ACTIVE, EXPIRED, INACTIVE

  @ManyToOne
  @JoinColumn(name = "cardTypeCode")
  private CommonCodes cardTypeCode; // 신용 체크 여부 ex) CREDIT, DEBIT
}
