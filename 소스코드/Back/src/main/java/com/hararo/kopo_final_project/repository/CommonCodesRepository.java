package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.CommonCodes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonCodesRepository extends JpaRepository<CommonCodes, String> {
  CommonCodes findCommonCodesByCommonCode(String code);
}
