package com.hararo.kopo_final_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.YearMonth;

@Entity
@Table(name = "card_product_monthly_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardProductMonthlyStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cardProductId")
    private CardProducts cardProduct; // 해당 카드 상품

    private Integer pageView; // 해당 월의 페이지 뷰 수

    private Integer applyCount; // 해당 월의 신청 수

    private YearMonth month; // 해당 월 (예: 2023-08)
}
