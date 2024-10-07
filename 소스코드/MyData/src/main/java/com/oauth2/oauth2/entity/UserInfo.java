package com.oauth2.oauth2.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    private String ci;        // CI (연계정보)
    private String username;  // 예: 사용자 이름 또는 휴대폰 번호
    private String password;  // 예: 비밀번호나 해시값
    private String name;      // 사용자 실명
}
