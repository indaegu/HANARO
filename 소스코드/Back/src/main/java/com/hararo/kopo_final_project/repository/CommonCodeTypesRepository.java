package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.CommonCodeTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonCodeTypesRepository extends JpaRepository<CommonCodeTypes, String> {
}
