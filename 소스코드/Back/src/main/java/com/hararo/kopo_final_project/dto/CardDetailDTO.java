package com.hararo.kopo_final_project.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDetailDTO {
  private String cardName; // CARD_PRODUCTS 테이블 : CARD_NAME
  private String cardImage; // CARD_PRODUCTS 테이블 : CARD_IMAGE
  private String cardNumber; // CUSTOMER_CARDS 테이블 : CUSTOMER_CARD_ID
  private String expirationDate; // CUSTOMER_CARDS 테이블 : EXPIRATION_DATE
  private String cardStatus; // CUSTOMER_CARDS 테이블 : CARD_STATUS_CODE
  private int usedAmount; // CUSTOMER_APPROVALS 테이블 : 한달간 CUSTOMER_CARD_ID로 사용한 금액의 합
  private List<Long> performanceBracket; // 해당 카드의 혜택구간들의 금액이 담긴 List, 카드에 따라서 혜택의 구간이 없을 수 있음
  private Long customPerformanceBracket; //CUSTOMER_CARDS 테이블 :  customer_Performance_Segment, 카드에 따라서 없을수 있다.
  private Long amountUntilNextBracket; // 다음 Bracket까지 남은 금액 usedAmount로 구한다., 카드에 따라서 없을 수 있다.
  private List<String> cardBenefitList; // 해당 카드에 담긴 혜택의 String list
}