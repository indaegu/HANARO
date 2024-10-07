package com.oauth2.oauth2.controller;

import com.oauth2.oauth2.dto.RecommendDataRequestDTO;
import com.oauth2.oauth2.service.CustomerApprovalService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.client.RestTemplate;

@Controller
public class LoginController {
    @Autowired
    private CustomerApprovalService customerApprovalService;


    /**
     * 인증 페이지 뷰를 제공하는 로직
     * @return
     */
    @GetMapping("/login")
    public String login() {
        return "login"; // login.jsp 파일을 렌더링
    }

    /**
     * 인증 완료 엔드포인트
     */
    @GetMapping("/auth-complete")
    public String authComplete(@RequestParam(name="hashed-auth") String ci) {
        // 승인 데이터 가져오기
        List<RecommendDataRequestDTO.CardApprovalDTO> approvals = customerApprovalService.getCustomerApprovals(ci);

        // 거래 기록을 Spring Boot 백엔드 서버로 전송
        sendApprovalsToBackend(ci, approvals);

        // 인증 완료 페이지 반환
        return "authComplete"; // 뷰 이름 반환
    }

    /**
     * 거래 기록을 백엔드 서버로 전송하는 메서드
     */
    private void sendApprovalsToBackend(String ci, List<RecommendDataRequestDTO.CardApprovalDTO> approvals) {
        // RecommendDataRequestDTO 생성
        RecommendDataRequestDTO data = new RecommendDataRequestDTO();
        data.setUserId(ci);
        data.setApprovals(approvals);

        // 백엔드 서버 URL 설정
        String backendUrl = "https://hana-ro-backend.site:8080/auth/complete"; // 실제 백엔드 서버 URL로 변경

        // RestTemplate을 사용하여 POST 요청 전송
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 헤더 설정 (필요한 경우)
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 엔티티 생성
//        HttpEntity<RecommendDataRequestDTO> requestEntity = new HttpEntity<>(data, headers);
        HttpEntity<RecommendDataRequestDTO> requestEntity = new HttpEntity<>(data);

        // 백엔드 서버로 요청 전송
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                backendUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                // 성공적으로 전송됨
                System.out.println("거래 기록이 백엔드 서버로 전송되었습니다.");
            } else {
                // 에러 처리 로직 추가
                System.err.println("백엔드 서버로부터 오류 응답을 받았습니다: " + response.getStatusCode());
            }
        } catch (Exception e) {
            // 예외 처리 로직 추가
            System.err.println("백엔드 서버로 거래 기록 전송 중 오류 발생: " + e.getMessage());
        }
    }

}
