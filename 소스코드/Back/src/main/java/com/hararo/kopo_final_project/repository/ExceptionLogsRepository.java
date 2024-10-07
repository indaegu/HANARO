package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.ExceptionLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExceptionLogsRepository extends JpaRepository<ExceptionLogs, String> {
}
