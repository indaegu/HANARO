package com.hararo.kopo_final_project.controller;

import com.hararo.kopo_final_project.dto.IncomeTaxDeductionDTO;
import com.hararo.kopo_final_project.dto.LoginBlockAlertBenefitDTO;
import com.hararo.kopo_final_project.dto.LoginBlockBestWorstDTO;
import com.hararo.kopo_final_project.dto.LoginBlockCardSummaryDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.requestdto.IncomeTaxDeductionRequestDTO;
import com.hararo.kopo_final_project.requestdto.TokenRequestDTO;
import com.hararo.kopo_final_project.service.LoginBlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/login-block")
public class LoginBlockController {

    @Autowired
    private LoginBlockService loginBlockService;

    @PostMapping("/benefit-alert")
    public ResponseEntity<ResponseDTO<LoginBlockAlertBenefitDTO>> getBenefitAlert(@RequestBody TokenRequestDTO request) {
        ResponseDTO<LoginBlockAlertBenefitDTO> response = loginBlockService.getAlertBenefit(request.getUserId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/benefit-bestworst")
    public ResponseEntity<ResponseDTO<LoginBlockBestWorstDTO>> getBestWorst(@RequestBody TokenRequestDTO request){
        ResponseDTO<LoginBlockBestWorstDTO> response = loginBlockService.getBestWorst(request.getUserId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/card-summary")
    public  ResponseEntity<ResponseDTO<LoginBlockCardSummaryDTO>> getCardSummary(@RequestBody TokenRequestDTO request){
        ResponseDTO<LoginBlockCardSummaryDTO> response = loginBlockService.getCardsSummary(request.getUserId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/income-tax-deduction")
    public ResponseEntity<ResponseDTO<IncomeTaxDeductionDTO>> getIncomeTaxDeduction(@RequestBody
        IncomeTaxDeductionRequestDTO request){
        ResponseDTO<IncomeTaxDeductionDTO> response = loginBlockService.getIncomeTaxDeduction(request.getUserId(), request.getIncome());
        return ResponseEntity.ok(response);
    }

}
