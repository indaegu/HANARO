package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "card_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardProducts {

  @Id
  private String cardProductId;

  private String cardName; // 카드 상품 이름

  private String cardImage; // 카드 이미지 경로

  @ManyToOne
  @JoinColumn(name="cardTypeCode")
  private CommonCodes cardTypeCode; // 신용인지 체크인지

  @Column(length = 1000)
  private String cardWebsiteLink; // 카드 신청 링크

  @Column(length = 2000)
  private String cardDescription; // 카드 간단 소개

  private String cardPdfUrl; // 카드 상품약관 PDF URL

  private String cardReleaseDate;  // 카드 발행일

  private String complianceReview; // 준법 감시 평가

  private Integer pageView; // 페이지 뷰수

  private Integer applyCount; // 신용카드 신청하기 링크 클릭수

  // @OneToMany 관계 추가
  @OneToMany(mappedBy = "cardProduct", cascade = CascadeType.ALL)
  private List<CardProductMonthlyStats> monthlyStats;

  // @OneToMany 관계 추가
  @OneToMany(mappedBy = "cardProductId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Benefits> benefits; // 카드 상품에 연결된 혜택 목록
}
