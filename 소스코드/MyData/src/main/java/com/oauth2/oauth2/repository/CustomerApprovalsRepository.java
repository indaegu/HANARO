package com.oauth2.oauth2.repository;


import com.oauth2.oauth2.entity.CustomerApprovals;
import com.oauth2.oauth2.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerApprovalsRepository extends JpaRepository<CustomerApprovals, String> {

    List<CustomerApprovals> findByCi(UserInfo ci);

}
