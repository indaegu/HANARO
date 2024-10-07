package com.hararo.kopo_final_project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginBlockAlertBenefitDTO {
    private String pastCardName; // 직전 결제에서 사용한 카드의 이름
    private String futureCardName; // 직전에 사용한 카드보다 더 혜택이 좋다고 판단되는 카드의 이름
    private String pastCardImgUrl; // 직전 결제에서 사용한 카드의 이름
    private String futureCardImgUrl; // 직전에 사용한 카드보다 더 혜택이 좋다고 판된되는 카드의 이름
    private Integer futureBenefit; // 혜택이 더 좋다고 판단되는 카드로 결제했다면 받을 수 있었던 예상 혜택
    private Integer pastBenefit; // 직전 결제에서 실제로 받은 혜택
    private String paymentName; // 결제한 장소의 이름 : CustomerApprovals 테이블에서 merchantId로 찾은 Merchants 테이블의 MerchantName
    private Integer amount; // 결제금액 : CustomerApprovals 테이블의 approvalAmount
    private String paymentCategory; // 결제 카테고리 : CustomerApprovals 테이블의  paymentCategoryCode로 찾은 CommonCodes 테이블의  CodeName
}
