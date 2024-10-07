package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.CardDetailDTO;
import com.hararo.kopo_final_project.entity.Customers;
import com.hararo.kopo_final_project.repository.CustomersRepository;
import com.hararo.kopo_final_project.security.JwtUtil;
import com.hararo.kopo_final_project.security.UserDTO;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  @Autowired
  private CustomersRepository customersRepository;

  private final JwtUtil jwtUtil;

  public String validateUser(String userId, String rawPassword) {
    Optional<Customers> customerOptional = customersRepository.findById(userId);
    if (customerOptional.isPresent()) {
      Customers customer = customerOptional.get();
      if(customer.getCustomerPassword().equals(rawPassword)){
        UserDTO userDTO = new UserDTO(
            customer.getCustomerId(),
            customer.getCustomerName(),
            customer.getCustomerAnnualIncome()
        );
        return jwtUtil.createAccessToken(userDTO);
      }
    }
    return null;
  }

  public Object getUserDetails(String receiveId) {
    // 사용자 정보 반환
    return new Object() {
      public final String id = receiveId;
      public final String name = "성하나";
      public final String email = "hong@example.com";
    };
  }




}
