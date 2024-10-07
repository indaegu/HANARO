package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.BenefitLimits;
import com.hararo.kopo_final_project.entity.Benefits;
import com.hararo.kopo_final_project.entity.CardProducts;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BenefitsRepository extends JpaRepository<Benefits, Long> {
  // CardProductId로 Benefits 리스트 조회
  List<Benefits> findByCardProductId(CardProducts cardProduct);

  // CardProductId의 문자열로 Benefits 리스트 조회
  List<Benefits> findByCardProductId_CardProductId(String cardProductId);

  // CardProductId로 최대 3개의 Benefits 리스트 조회
  @Query("SELECT b FROM Benefits b WHERE b.cardProductId = :cardProduct")
  List<Benefits> findTop3ByCardProductId(@Param("cardProduct") CardProducts cardProduct, Pageable pageable);
}
