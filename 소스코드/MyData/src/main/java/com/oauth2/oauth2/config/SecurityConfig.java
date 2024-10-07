package com.oauth2.oauth2.config;


import com.oauth2.oauth2.security.CustomAuthenticationEntryPoint;
import com.oauth2.oauth2.security.CustomAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean; // Spring에서 Bean을 정의하기 위한 어노테이션 임포트
import org.springframework.context.annotation.Configuration; // Spring에서 설정 클래스를 나타내기 위한 어노테이션 임포트
import org.springframework.security.config.annotation.web.builders.HttpSecurity; // 웹 보안 설정을 위한 HttpSecurity 클래스를 임포트
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // 웹 보안 활성화를 위한 어노테이션 임포트

import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration; // OAuth2 인증 서버 설정을 위한 클래스 임포트
import org.springframework.security.web.SecurityFilterChain; // 보안 필터 체인을 정의하는 인터페이스 임포트


@Configuration // 이 클래스가 Spring의 설정 클래스를 나타낸다는 것을 표시
@EnableWebSecurity // 이 클래스에서 웹 보안을 설정할 것임을 Spring에게 알림
public class SecurityConfig {

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    @Bean // 이 메서드가 Spring 컨텍스트에서 관리되는 Bean을 생성한다는 것을 표시
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // OAuth2 인증 서버의 기본 보안 설정을 HttpSecurity에 적용
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        http.formLogin(form ->
                        form
                                .loginPage("/login") // 커스텀 로그인 페이지 경로 설정
                                .permitAll() // 로그인 페이지는 모두 접근 가능하게 설정
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/logout") // 로그아웃 URL 설정
                                .logoutSuccessUrl("/login?logout") // 로그아웃 성공 시 리디렉션될 URL
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                );


        // 설정된 HttpSecurity 객체를 사용하여 SecurityFilterChain을 빌드하여 반환
        return http.build();
    }
}
