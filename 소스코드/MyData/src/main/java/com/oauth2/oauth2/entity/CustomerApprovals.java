package com.oauth2.oauth2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "customer_approvals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerApprovals {

  @Id
  private String approvalNumber; // 카드 결제 번호

  private Timestamp approvalDate; // 결제 시간

  private Integer approvalAmount; // 결제 금액

  private Integer benefitAmount; // 받은 혜택 금액

  private String customerCard; // 결제 카드 번호

  private String merchantId; // 결제 가맹점 고유 ID

  private String approvalStatusCode; // 결제 상태 번호

  private String paymentCategoryCode; // 결제 카테고리 코드

  @ManyToOne
  @JoinColumn(name="ci")
  private UserInfo ci;

}
