package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.AnnualFees;
import com.hararo.kopo_final_project.entity.CardProducts;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnualFeesRepository extends JpaRepository<AnnualFees, Long> {
  // CardProductId로 AnnualFees 리스트 조회
  List<AnnualFees> findByCardProductId(CardProducts cardProduct);
}
