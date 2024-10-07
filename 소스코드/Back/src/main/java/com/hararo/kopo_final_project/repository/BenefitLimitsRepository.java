package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.BenefitLimits;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenefitLimitsRepository extends JpaRepository<BenefitLimits, Long> {
    // 카드 상품 ID에 해당하는 혜택 구간들을 조회
    @Query("SELECT b FROM BenefitLimits b WHERE b.benefitId.cardProductId.cardProductId = :cardProductId")
    List<BenefitLimits> findByCardProductId(@Param("cardProductId") String cardProductId);

    // BenefitId로 BenefitLimits 조회
    List<BenefitLimits> findByBenefitId_BenefitId(Long benefitId);

    // CardProductId로 BenefitLimits 조회
    List<BenefitLimits> findByBenefitId_CardProductId_CardProductId(String cardProductId);

    @Query("SELECT b FROM BenefitLimits b WHERE b.benefitId.cardProductId.cardProductId = :cardProductId " +
            "AND :lastMonthPerformance BETWEEN b.minimumRange AND b.maximumRange " +
            "ORDER BY b.minimumRange DESC")
    List<BenefitLimits> findApplicableBenefits(@Param("cardProductId") String cardProductId,
                                               @Param("lastMonthPerformance") Long lastMonthPerformance);

    @Query("SELECT bl FROM BenefitLimits bl " +
        "JOIN bl.benefitId b " +
        "WHERE b.cardProductId.cardProductId = :cardProductId " +
        "AND b.benefitMethodCode.commonCode IN ('DISCOUNT', 'POINTS', 'CASHBACK') " +
        "AND (UPPER(bl.benefitAreaCategoryCode.commonCode) = UPPER(:categoryCode) OR UPPER(bl.benefitAreaCategoryCode.commonCode) = 'ANY') " +
        "AND (:approvalAmount >= COALESCE(bl.minimumPaymentAmount, 0))")
    List<BenefitLimits> findApplicableBenefits2(@Param("cardProductId") String cardProductId,
        @Param("categoryCode") String categoryCode,
        @Param("approvalAmount") Integer approvalAmount);

}


