package com.hararo.kopo_final_project.security;


import com.hararo.kopo_final_project.entity.Customers;
import com.hararo.kopo_final_project.repository.CustomersRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Data
@RequiredArgsConstructor
@Service
public class CustomUserDetailService {

  @Autowired
  private CustomersRepository customersRepository;

  public UserDTO loadUserByUserId(String id) throws UsernameNotFoundException {
    Customers customers = customersRepository.findById(id).orElse(null); // 해당하는 유저가 없을시 null 반환
    if(customers == null) {
      throw new UsernameNotFoundException("해당하는 유저가 없습니다.");
    }

    UserDTO userDTO = new UserDTO(
        customers.getCustomerId(),
        customers.getCustomerName(),
        customers.getCustomerAnnualIncome()
    );

    return userDTO;
  }




}
