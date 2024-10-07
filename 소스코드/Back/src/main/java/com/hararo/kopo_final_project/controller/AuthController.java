package com.hararo.kopo_final_project.controller;


import com.hararo.kopo_final_project.dto.RecommendCardWithBenefitDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.requestdto.RecommendDataRequestDTO;
import com.hararo.kopo_final_project.service.CardRecommendService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private CardRecommendService cardRecommendService;


  @Value("${oauth2.server.url}")
  private String oauth2ServerUrl;

  @Value("${react.server.url}")
  private String reactServerUrl;

  @Value("${backend.server.url}")
  private String backendServerUrl;


  /**
   * 클라이언트로부터 인증 모달 제공 요청을 받으면 OAuth 인증서버에게 인증 페이지를 받아와 클라이언트로 전달
   * @return
   */
  @GetMapping("/start")
  public RedirectView startAuth() {
    // http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&redirect_uri=https://hana-ro.site:3000/callback&scope=read write;
    // 인증 서버의 인증 페이지 URL 생성
    String authUrl = oauth2ServerUrl + "/login"; // OAuth 인증 서버의 로그인 페이지 URL

    // RedirectView를 사용하여 리다이렉트 수행
    return new RedirectView(authUrl);
  }


  /**
   * OAuth 인증 서버가 인증을 완료하면 해당 엔드포인트로 RecommendDataRequestDTO에 사용자 정보 및
   * 결제기록을 담아 요청을 날리고 백엔드 서버는 해당 값을 DB에 저장
   */
  @PostMapping("/complete")
  public ResponseEntity<String> saveApprovals(@RequestBody RecommendDataRequestDTO request) {
    // 서비스 호출하여 결제 기록 저장
    cardRecommendService.saveApprovals(request);
    return ResponseEntity.ok("데이터 저장 완료");
  }


}
