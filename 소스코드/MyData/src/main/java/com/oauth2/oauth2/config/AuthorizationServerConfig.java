package com.oauth2.oauth2.config;

import java.util.UUID; // UUID를 사용하여 고유 식별자를 생성하기 위한 임포트
import org.springframework.context.annotation.Bean; // Spring에서 Bean을 정의하기 위한 어노테이션 임포트
import org.springframework.context.annotation.Configuration; // Spring에서 설정 클래스를 표시하기 위한 어노테이션 임포트
import org.springframework.security.oauth2.core.AuthorizationGrantType; // OAuth2 인증 방식(Grant Type)을 정의하는 클래스 임포트
import org.springframework.security.oauth2.core.ClientAuthenticationMethod; // 클라이언트 인증 방법을 정의하는 클래스 임포트
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository; // 인메모리 클라이언트 저장소를 제공하는 클래스 임포트
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient; // 등록된 클라이언트의 구성을 위한 클래스 임포트
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository; // 클라이언트 저장소를 정의하는 인터페이스 임포트
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings; // 클라이언트 설정을 정의하는 클래스 임포트
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings; // 토큰 설정을 정의하는 클래스 임포트

@Configuration // 이 클래스가 Spring의 설정 클래스를 나타낸다는 것을 표시
public class AuthorizationServerConfig {

  @Bean // 이 메서드가 Spring 컨텍스트에서 관리되는 Bean을 생성한다는 것을 표시
  public RegisteredClientRepository registeredClientRepository() {
    // RegisteredClient 객체를 생성. 이 객체는 OAuth2 클라이언트의 세부 정보를 정의한다.
    RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString()) // 클라이언트에 대한 고유 ID 생성
            .clientId("client") // 클라이언트 ID 설정 (OAuth2 서버에서 클라이언트를 식별하기 위한 고유 값)
            .clientSecret("secret") // 클라이언트 시크릿 설정 (클라이언트의 비밀 키)
            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC) // 클라이언트 인증 방법 설정 (기본 인증 방식)
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE) // 사용되는 인증 방식 설정 (Authorization Code Grant)
            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN) // 사용되는 추가 인증 방식 설정 (Refresh Token Grant)
            .redirectUri("https://hana-ro-backend.site:8080/auth/complete") // 인증 후 리디렉션될 URI 설정
            .scope("read") // 클라이언트가 요청할 수 있는 권한의 범위 설정 (예: read)
            .scope("write") // 클라이언트가 요청할 수 있는 추가 권한 범위 설정 (예: write)
            .tokenSettings(TokenSettings.builder().build()) // 토큰 설정 (예: 만료 시간 등)을 설정하는 빌더 사용
            .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build()) // 클라이언트 설정 (예: 동의 요구 여부) 설정
            .build(); // 위의 설정들을 사용하여 RegisteredClient 객체를 빌드
    System.out.println(registeredClient.getId());

    // 등록된 클라이언트를 저장할 저장소를 인메모리로 설정하여 반환
    return new InMemoryRegisteredClientRepository(registeredClient);
  }
}
