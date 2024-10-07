package com.hararo.kopo_final_project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Merchants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Merchants {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int merchantId;

  private String merchantName; // 가게 상호명 (결제 이름으로 쓰일 예정)

  private String merchantAddress; // 가게 주소

  private String merchantDescription; // 가게 한줄 소개

  private String merchantHours; // 가게 영업시간

  private Double latitude; // 위도

  private Double longitude; //경도

  @Column(length = 500)
  private String storeImgUrl; // 가게 대표 이미지

  @ManyToOne
  @JoinColumn(name = "categoryCode")
  private CommonCodes categoryCode; // 가게 카테고리 코드

  @ManyToOne
  @JoinColumn(name="benefitCategoryCode")
  private CommonCodes benefitCategoryCode; // 적용 되는 혜택 코드
}
