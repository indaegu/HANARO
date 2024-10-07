package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.CardProducts;
import com.hararo.kopo_final_project.entity.UseInstructions;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UseInstructionsRepository extends JpaRepository<UseInstructions, Long> {
  List<UseInstructions> findByCardProductId(CardProducts cardProduct);

}

