package com.oauth2.oauth2.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        // 원래 요청한 URL을 로그인 페이지로 리다이렉트하면서 유지
        String redirectUrl = "/login?redirect=" + request.getRequestURI() + "?" + request.getQueryString();
        response.sendRedirect(redirectUrl);
    }
}