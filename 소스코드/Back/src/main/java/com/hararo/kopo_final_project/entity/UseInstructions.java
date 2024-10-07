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

@Entity
@Table(name = "Use_Instructions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UseInstructions {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 유의사항의 고유값

  @ManyToOne
  @JoinColumn(name = "cardProductId")
  private CardProducts cardProductId; // 유의사항에 적용되는 카드상품 ID

  private String useInstructionTitle; // 유의사항 제목

  @Column(length = 4000)
  private String useInstructionDescription; // 유의사항 상세 내용
}
