package com.hararo.kopo_final_project.controller;

import com.hararo.kopo_final_project.dto.LoginBlockAlertBenefitDTO;
import com.hararo.kopo_final_project.dto.RecommendCardWithBenefitDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.dto.SurveyResultDTO;
import com.hararo.kopo_final_project.requestdto.RecommendDataRequestDTO;
import com.hararo.kopo_final_project.requestdto.SurveyResultRequestDTO;
import com.hararo.kopo_final_project.requestdto.TokenRequestDTO;
import com.hararo.kopo_final_project.service.CardRecommendService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/card-recommend")
public class CardRecommendController {

  @Autowired
  private CardRecommendService cardRecommendService;


  @PostMapping("/result-with-data-pl")
  public ResponseEntity<ResponseDTO<List<RecommendCardWithBenefitDTO>>> getRecommendCards(@RequestBody RecommendDataRequestDTO request) {
    ResponseDTO<List<RecommendCardWithBenefitDTO>> response = cardRecommendService.getBestCardBenefits2(request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/result-with-data-java")
  public ResponseEntity<ResponseDTO<List<RecommendCardWithBenefitDTO>>> getRecommendCards2(@RequestBody RecommendDataRequestDTO request) {
    ResponseDTO<List<RecommendCardWithBenefitDTO>> response = cardRecommendService.simulateBestCardsForAllPayments(request.getUserId());
    return ResponseEntity.ok(response);
  }

  @PostMapping("/survey-results")
  public ResponseEntity<ResponseDTO<?>> getSurveyResults(@RequestBody SurveyResultRequestDTO request) {
    ResponseDTO<SurveyResultDTO> response = cardRecommendService.getSurveyResult(request.getFinalType());
    return ResponseEntity.ok(response);
  }


}
