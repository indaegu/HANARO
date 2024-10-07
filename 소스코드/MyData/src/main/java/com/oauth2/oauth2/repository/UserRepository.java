package com.oauth2.oauth2.repository;

import com.oauth2.oauth2.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserInfo, String> {
    UserInfo findByUsername(String username);
}