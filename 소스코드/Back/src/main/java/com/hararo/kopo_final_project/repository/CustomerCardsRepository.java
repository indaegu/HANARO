package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.CustomerCards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerCardsRepository extends JpaRepository<CustomerCards, String> {
    List<CustomerCards> findByCustomerId_CustomerId(String userId);

    Optional<CustomerCards> findByCustomerCardId(String customerCardId);

}

