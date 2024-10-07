package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.dto.CategoryTotalDTO;
import com.hararo.kopo_final_project.entity.CustomerApprovals;
import com.hararo.kopo_final_project.entity.Customers;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CustomerApprovalsRepository extends JpaRepository<CustomerApprovals, String> {
    @Query("SELECT SUM(ca.approvalAmount) FROM CustomerApprovals ca WHERE ca.customerCard.customerCardId = :customerCardId AND ca.approvalDate >= :startDate AND ca.approvalDate <= :endDate")
    Integer getTotalUsedAmountForMonth(@Param("customerCardId") String customerCardId, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);

    List<CustomerApprovals> findByCustomerCard_CustomerCardId(String customerCardId);

    // 카드 ID와 승인 날짜 범위로 결제 내역 조회
    List<CustomerApprovals> findByCustomerCard_CustomerCardIdAndApprovalDateBetween(
            String customerCardId, Timestamp startDate, Timestamp endDate
    );

    // 사용자의 이번 달 총 결제 금액 조회
    @Query("SELECT SUM(ca.approvalAmount) "
        + "FROM CustomerApprovals ca "
        + "WHERE ca.customerCard.customerId.customerId = :customerId "
        + "AND ca.approvalDate BETWEEN :startDate AND :endDate")
    Integer getTotalAmountForMonth(@Param("customerId") String customerId, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);

    // 사용자의 이번 달 총 혜택 금액 조회
    @Query("SELECT SUM(ca.benefitAmount) FROM CustomerApprovals ca WHERE ca.customerCard.customerId.customerId = :customerId AND ca.approvalDate BETWEEN :startDate AND :endDate")
    Integer getTotalBenefitForMonth(@Param("customerId") String customerId, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);

    // 사용자의 카테고리별 결제 금액 및 혜택 금액 조회
    @Query("SELECT ca.paymentCategoryCode.codeName, SUM(ca.approvalAmount), SUM(ca.benefitAmount) FROM CustomerApprovals ca WHERE ca.customerCard.customerId.customerId = :customerId AND ca.approvalDate BETWEEN :startDate AND :endDate GROUP BY ca.paymentCategoryCode.codeName")
    List<Object[]> getCategoryWiseAmountAndBenefit(@Param("customerId") String customerId, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);

    // 1. 신용카드 사용 금액 조회
    @Query("SELECT SUM(ca.approvalAmount) "
        + "FROM CustomerApprovals ca " +
        "WHERE ca.customerCard.cardTypeCode.commonCode = 'CREDIT' " +
        "AND ca.customerCard.customerId.customerId = :userId " +
        "AND ca.approvalDate >= :startOfYear")
    Integer getCreditCardAmountForYear(@Param("userId") String userId, @Param("startOfYear") Timestamp startOfYear);

    // 2. 체크카드 사용 금액 조회
    @Query("SELECT SUM(ca.approvalAmount) FROM CustomerApprovals ca " +
        "WHERE ca.customerCard.cardTypeCode.commonCode = 'DEBIT' " +
        "AND ca.customerCard.customerId.customerId = :userId " +
        "AND ca.approvalDate >= :startOfYear")
    Integer getDebitCardAmountForYear(@Param("userId") String userId, @Param("startOfYear") Timestamp startOfYear);

    // 1. 신용카드 결제 횟수 조회
    @Query("SELECT COUNT(ca) FROM CustomerApprovals ca " +
        "WHERE ca.customerCard.cardTypeCode.commonCode = 'CREDIT' " +
        "AND ca.customerCard.customerId.customerId = :userId " +
        "AND ca.approvalDate >= :startOfYear")
    Integer getCreditCardApprovalCountForYear(@Param("userId") String userId, @Param("startOfYear") Timestamp startOfYear);

    // 2. 체크카드 결제 횟수 조회
    @Query("SELECT COUNT(ca) FROM CustomerApprovals ca " +
        "WHERE ca.customerCard.cardTypeCode.commonCode = 'DEBIT' " +
        "AND ca.customerCard.customerId.customerId = :userId " +
        "AND ca.approvalDate >= :startOfYear")
    Integer getDebitCardApprovalCountForYear(@Param("userId") String userId, @Param("startOfYear") Timestamp startOfYear);

    CustomerApprovals findTopByCustomerCardCustomerIdOrderByApprovalDateDesc(Customers customerId);

    // 사용자의 특정 카테고리 결제 내역 조회
    List<CustomerApprovals> findByCustomerCard_CustomerId_CustomerIdAndPaymentCategoryCode_CommonCode(
            String customerId, String categoryCode);

    // 승인 날짜 범위와 카테고리로 결제 내역 조회
    List<CustomerApprovals> findByCustomerCard_CustomerId_CustomerIdAndPaymentCategoryCode_CommonCodeAndApprovalDateBetween(
            String customerId, String categoryCode, Timestamp startDate, Timestamp endDate);


    // 카드 추천 직접 구현 로직
    @Query("SELECT COALESCE(SUM(ca.approvalAmount), 0) FROM CustomerApprovals ca WHERE ca.customerCard.customerId.customerId = :userId AND ca.approvalDate >= :startDate")
    BigDecimal getTotalApprovalAmount(@Param("userId") String userId, @Param("startDate") Timestamp startDate);

    @Query("SELECT new com.hararo.kopo_final_project.dto.CategoryTotalDTO(" +
        "ca.paymentCategoryCode.commonCode, " +
        "ca.paymentCategoryCode.codeName, " +
        "SUM(ca.approvalAmount)) " +
        "FROM CustomerApprovals ca " +
        "WHERE ca.customerCard.customerId.customerId = :userId " +
        "AND ca.approvalDate >= :startDate " +
        "GROUP BY ca.paymentCategoryCode.commonCode, ca.paymentCategoryCode.codeName")
    List<CategoryTotalDTO> getCategoryTotals(@Param("userId") String userId, @Param("startDate") Timestamp startDate);
    @Query("SELECT ca FROM CustomerApprovals ca WHERE ca.customerCard.customerId.customerId = :userId AND ca.approvalDate >= :startDate AND ca.approvalDate < :endDate")
    List<CustomerApprovals> findApprovalsByUserIdAndDateRange(@Param("userId") String userId, @Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);


}
