package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.CustomerUsedBenefits;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerUsedBenefitsRepository extends JpaRepository<CustomerUsedBenefits, String> {
    List<CustomerUsedBenefits> findByCustomerCardId_CustomerCardId(String customerCardId);

    // 반환 타입을 CustomerUsedBenefits에서 List<CustomerUsedBenefits>로 변경
    List<CustomerUsedBenefits> findByCustomerCardId_CustomerCardIdAndBenefitLimitId_BenefitLimitId(
            String customerCardId, Long benefitLimitId);

}
