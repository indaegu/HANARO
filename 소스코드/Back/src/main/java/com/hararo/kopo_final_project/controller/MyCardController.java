package com.hararo.kopo_final_project.controller;

import com.hararo.kopo_final_project.dto.CardBenefitDetailDTO;
import com.hararo.kopo_final_project.dto.CardDetailDTO;
import com.hararo.kopo_final_project.requestdto.UserMyCardDetailRequestDTO;
import com.hararo.kopo_final_project.requestdto.UserMyCardRequestDTO;
import com.hararo.kopo_final_project.service.MyCardService;
import java.sql.PreparedStatement;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mycard")
public class MyCardController {

  @Autowired
  private MyCardService myCardService;

  @PostMapping
  public ResponseEntity<?> getAllCards(@RequestBody UserMyCardRequestDTO request) {
    List<CardDetailDTO> response = myCardService.getAllCards(request.getUserId());

    if (response != null && !response.isEmpty()) {
      return ResponseEntity.ok().body(new Object() {
        public boolean success = true;
        public String message = "사용자 카드 목록 조회 완료";
        public List<CardDetailDTO> data = response;
      });
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Object() {
        public boolean success = false;
        public String message = "카드 정보를 찾을 수 없습니다.";
      });
    }
  }

  @PostMapping("/detail")
  public ResponseEntity<?> getCardDetail(@RequestBody UserMyCardDetailRequestDTO request) {
    // 토큰 검증
    if (!request.getToken().isEmpty()) {
      CardBenefitDetailDTO cardDetail = myCardService.getCardDetail(request.getCardId());
      if (cardDetail != null) {
        return ResponseEntity.ok().body(new Object() {
          public boolean success = true;
          public String message = "사용자 카드 상세 조회 완료";
          public CardBenefitDetailDTO data = cardDetail;
        });
      } else {
        return ResponseEntity.status(404).body(new Object() {
          public boolean success = false;
          public String message = "카드 정보를 찾을 수 없습니다.";
        });
      }
    } else {
      return ResponseEntity.status(401).body(new Object() {
        public boolean success = false;
        public String message = "인증 실패";
      });
    }
  }


}
