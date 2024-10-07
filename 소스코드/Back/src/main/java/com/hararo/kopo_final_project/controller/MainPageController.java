package com.hararo.kopo_final_project.controller;

import com.hararo.kopo_final_project.dto.NewCardDTO;
import com.hararo.kopo_final_project.dto.RecommendCardWithBenefitDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.requestdto.TokenRequestDTO;
import com.hararo.kopo_final_project.service.MainPageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main")
public class MainPageController {
  @Autowired
  private MainPageService mainPageService;

  @GetMapping("/new-cards")
  public ResponseEntity<ResponseDTO<List<NewCardDTO>>> getNewCardList(){
    ResponseDTO<List<NewCardDTO>> response = mainPageService.getNewCardList();
    return ResponseEntity.ok(response);
  }


}
