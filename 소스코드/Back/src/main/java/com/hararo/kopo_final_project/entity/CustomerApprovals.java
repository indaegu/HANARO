package com.hararo.kopo_final_project.entity;

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

  @ManyToOne
  @JoinColumn(name = "customerCardId")
  private CustomerCards customerCard; // 결제 카드 번호

  @ManyToOne
  @JoinColumn(name = "merchantId")
  private Merchants merchantId; // 결제 가맹점 고유 ID

  @ManyToOne
  @JoinColumn(name = "approvalStatusCode")
  private CommonCodes approvalStatusCode; // 결제 상태 번호

  @ManyToOne
  @JoinColumn(name = "paymentCategoryCode")
  private CommonCodes paymentCategoryCode; // 결제 카테고리 코드

  @PrePersist
  public void generateId() {
    if (this.approvalNumber == null) {
      this.approvalNumber = "APPROVAL_" + System.currentTimeMillis();  // 예시: "MY_PREFIX_1638237492743"
    }
  }
}
