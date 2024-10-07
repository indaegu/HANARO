package com.hararo.kopo_final_project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "ExceptionLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExceptionLogs {

  @Id
  private String logId;

  private Timestamp occurrenceTimestamp;

  @Lob
  private String errorMessage;
}
