package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Benefits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Benefits {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long benefitId; //혜택의 고유 ID

  private String benefitName; // 혜택의 이름

  private String benefitSummaryDescription; // 헤택의 간단한 설명

  @Column(length = 2000)
  private String benefitDetailDescription; // 혜택의 상세한 설명

  private String benefitSummaryIconImgUrl; // 소개 아이콘 imgUrl

  private String benefitDetailIconImgUrl; // 상세 아이콘 img Url

  @ManyToOne
  @JoinColumn(name = "cardProductId")
  private CardProducts cardProductId; // 혜택이 적용되는 카드 상품 ID

  @ManyToOne
  @JoinColumn(name = "benefitMethodCode", insertable = false, updatable = false)
  private CommonCodes benefitMethodCode; // 혜택 방식 ex) 'CASHBACK', 'POINT'

}
