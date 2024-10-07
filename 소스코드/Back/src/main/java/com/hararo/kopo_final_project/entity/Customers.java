package com.hararo.kopo_final_project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customers {

  @Id
  private String customerId;

  private String customerPassword;

  private String customerName;

  private String customerPhoneNumber;

  private int customerAnnualIncome; // 연 소득

  private Date dateOfBirth;

  private String customerCi;

  @ManyToOne
  @JoinColumn(name = "customerStatusCode")
  private CommonCodes customerStatusCode;

  @ManyToOne
  @JoinColumn(name = "genderCode")
  private CommonCodes genderCode;

}
