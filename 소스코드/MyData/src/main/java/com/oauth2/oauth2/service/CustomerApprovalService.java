package com.oauth2.oauth2.service;

import com.oauth2.oauth2.dto.CardApprovalDTO;
import com.oauth2.oauth2.dto.RecommendDataRequestDTO;
import com.oauth2.oauth2.entity.CustomerApprovals;
import com.oauth2.oauth2.repository.CustomerApprovalsRepository;
import com.oauth2.oauth2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerApprovalService {

    @Autowired
    private CustomerApprovalsRepository customerApprovalsRepository;

    @Autowired
    private UserRepository userRepository;
    public List<RecommendDataRequestDTO.CardApprovalDTO> getCustomerApprovals(String ci){
        System.out.println("CustomerApprovals 함수에서 받은 CI 값 : " + ci);
        List<CustomerApprovals> cardApprovalList = customerApprovalsRepository.findByCi(userRepository.findById(ci).orElse(null));
//        List<CustomerApprovals> cardApprovalList = customerApprovalsRepository.findByCi(ci);
        System.out.println(cardApprovalList);
        List<RecommendDataRequestDTO.CardApprovalDTO> result = new ArrayList<>();

        // CustomerApprovals 리스트를 순회하면서 CardApprovalDTO로 변환
        for (CustomerApprovals approval : cardApprovalList) {
            RecommendDataRequestDTO.CardApprovalDTO dto = new RecommendDataRequestDTO.CardApprovalDTO();
            dto.setApprovalNumber(approval.getApprovalNumber());
            dto.setApprovalDate(String.valueOf(approval.getApprovalDate()));
            dto.setApprovalAmount(approval.getApprovalAmount());
            dto.setBenefitAmount(approval.getBenefitAmount());
            dto.setCustomerCard(approval.getCustomerCard());
            dto.setMerchantId(approval.getMerchantId());
            dto.setApprovalStatusCode(approval.getApprovalStatusCode());
            dto.setPaymentCategoryCode(approval.getPaymentCategoryCode());

            // 결과 리스트에 DTO 추가
            result.add(dto);
        }
        System.out.println(result);


        return result;
    }
}
