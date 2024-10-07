package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.IncomeTaxDeductionDTO;
import com.hararo.kopo_final_project.dto.LoginBlockAlertBenefitDTO;
import com.hararo.kopo_final_project.dto.LoginBlockBestWorstDTO;
import com.hararo.kopo_final_project.dto.LoginBlockCardSummaryDTO;
import com.hararo.kopo_final_project.dto.LoginBlockCardSummaryDTO.CardData;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.entity.CustomerCards;
import com.hararo.kopo_final_project.entity.Customers;
import com.hararo.kopo_final_project.repository.CustomerApprovalsRepository;
import com.hararo.kopo_final_project.repository.CustomerCardsRepository;
import com.hararo.kopo_final_project.repository.CustomersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginBlockService {

  @Autowired
  private EntityManager entityManager;

  @Autowired
  private CustomerApprovalsRepository customerApprovalsRepository;

  @Autowired
  private CustomersRepository customersRepository;

  @Autowired
  private CustomerCardsRepository customerCardsRepository;

  public ResponseDTO<LoginBlockAlertBenefitDTO> getAlertBenefit(String userId) {
    LoginBlockAlertBenefitDTO benefitDTO = new LoginBlockAlertBenefitDTO();

    // 사용자 확인
    Optional<Customers> customerOptional = customersRepository.findById(userId);
    if (!customerOptional.isPresent()) {
      return new ResponseDTO<>(false, "해당하는 사용자가 없습니다.", null);
    }

    // PL/SQL 프로시저 호출
    String pastCardName = null;
    String futureCardName = null;
    String pastCardImgUrl = null;
    String futureCardImgUrl = null;
    Integer futureBenefit = null;
    Integer pastBenefit = null;
    String paymentName = null;
    Integer amount = null;
    String paymentCategory = null;

    // 프로시저 호출을 위한 EntityManager 설정
    StoredProcedureQuery query = entityManager.createStoredProcedureQuery("simulate_card_benefit");

    // 프로시저 매개변수 설정
    query.registerStoredProcedureParameter("p_user_id", String.class, ParameterMode.IN);
    query.registerStoredProcedureParameter("o_best_card", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_best_benefit", Integer.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_past_card_name", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_past_benefit", Integer.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_payment_name", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_approval_amount", Integer.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_payment_category", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_past_card_img_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_best_card_img_url", String.class, ParameterMode.OUT);

    // 입력값 설정
    query.setParameter("p_user_id", userId);

    // 프로시저 실행
    query.execute();

    // 결과값 설정
    pastCardName = (String) query.getOutputParameterValue("o_past_card_name");
    futureCardName = (String) query.getOutputParameterValue("o_best_card");
    pastCardImgUrl = (String) query.getOutputParameterValue("o_past_card_img_url");
    futureCardImgUrl = (String) query.getOutputParameterValue("o_best_card_img_url");
    futureBenefit = (Integer) query.getOutputParameterValue("o_best_benefit");
    pastBenefit = (Integer) query.getOutputParameterValue("o_past_benefit");
    paymentName = (String) query.getOutputParameterValue("o_payment_name");
    amount = (Integer) query.getOutputParameterValue("o_approval_amount");
    paymentCategory = (String) query.getOutputParameterValue("o_payment_category");

    // DTO 설정
    benefitDTO.setPastCardName(pastCardName);
    benefitDTO.setFutureCardName(futureCardName);
    benefitDTO.setPastCardImgUrl(pastCardImgUrl);
    benefitDTO.setFutureCardImgUrl(futureCardImgUrl);
    benefitDTO.setFutureBenefit(futureBenefit);
    benefitDTO.setPastBenefit(pastBenefit);
    benefitDTO.setPaymentName(paymentName);
    benefitDTO.setAmount(amount);
    benefitDTO.setPaymentCategory(paymentCategory);

    return new ResponseDTO<>(true, "실시간 결제 피드백 데이터 전송 완료", benefitDTO);
  }


  public ResponseDTO<LoginBlockBestWorstDTO> getBestWorst(String id) {
    // 1. 사용자 조회 (id를 이용해 사용자 정보 조회)
    Customers user = customersRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 userId 입니다."));

    // 2. 현재 월 계산
    LocalDate now = LocalDate.now();
    String currentMonth = now.format(DateTimeFormatter.ofPattern("MM"));

    // 3. 이번 달 시작일과 종료일을 Timestamp로 계산
    Timestamp startOfMonth = Timestamp.valueOf(
        LocalDateTime.of(now.withDayOfMonth(1), LocalTime.MIN));
    Timestamp endOfMonth = Timestamp.valueOf(
        LocalDateTime.of(now.withDayOfMonth(now.lengthOfMonth()), LocalTime.MAX));

    // 4. 이번 달 총 결제 금액 및 혜택 금액 조회
    Integer totalAmount = customerApprovalsRepository.getTotalAmountForMonth(user.getCustomerId(),
        startOfMonth, endOfMonth);
    Integer totalBenefit = customerApprovalsRepository.getTotalBenefitForMonth(user.getCustomerId(),
        startOfMonth, endOfMonth);

    // 5. 카테고리별 결제 금액 및 혜택 금액 조회
    List<Object[]> categoryData = customerApprovalsRepository.getCategoryWiseAmountAndBenefit(
        user.getCustomerId(), startOfMonth, endOfMonth);

    // 6. DTO 생성 및 반환
    List<LoginBlockBestWorstDTO.PaymentItemData> paymentItemDataList = categoryData.stream()
        .map(data -> new LoginBlockBestWorstDTO.PaymentItemData(
            (String) data[0],      // category
            data[1].toString(),    // amount
            data[2].toString()     // benefit
        ))
        .collect(Collectors.toList());

    // DTO 생성
    LoginBlockBestWorstDTO bestWorstDTO = new LoginBlockBestWorstDTO(
        currentMonth,
        totalAmount,
        totalBenefit,
        paymentItemDataList
    );

    // 7. ResponseDTO 생성 및 반환
    return new ResponseDTO<>(true, "성공적으로 데이터를 조회했습니다.", bestWorstDTO);
  }

  public ResponseDTO<LoginBlockCardSummaryDTO> getCardsSummary(String userId) {
    // 1. 사용자 카드 정보 조회
    List<CustomerCards> customerCardsList = customerCardsRepository.findByCustomerId_CustomerId(
        userId);

    // 2. 이번 달 시작일과 종료일 계산
    LocalDate now = LocalDate.now();
    Timestamp startOfMonth = Timestamp.valueOf(
        LocalDateTime.of(now.withDayOfMonth(1), LocalTime.MIN));
    Timestamp endOfMonth = Timestamp.valueOf(
        LocalDateTime.of(now.withDayOfMonth(now.lengthOfMonth()), LocalTime.MAX));

    // 3. 카드별 사용 금액 조회 및 DTO 생성
    List<LoginBlockCardSummaryDTO.CardData> cardDataList = customerCardsList.stream()
        .map(card -> {
          // 카드별 이번 달 결제 금액 조회 (null이면 0으로 설정)
          Integer amount = customerApprovalsRepository.getTotalUsedAmountForMonth(
              card.getCustomerCardId(), startOfMonth, endOfMonth);
          if (amount == null) {
            amount = 0;  // null일 경우 0으로 처리
          }

          // 카드 정보를 DTO로 매핑
          return new CardData(
              card.getCardProductId().getCardName(),
              card.getCardProductId().getCardImage(),
              card.getCustomerCardId(),
              amount
          );
        })
        .collect(Collectors.toList());

    // 4. LoginBlockCardSummaryDTO 생성 및 반환
    LoginBlockCardSummaryDTO cardSummary = new LoginBlockCardSummaryDTO(cardDataList);
    return new ResponseDTO<>(true, "성공적으로 데이터를 조회했습니다.", cardSummary);
  }

  public ResponseDTO<IncomeTaxDeductionDTO> getIncomeTaxDeduction(String userId, Integer income) {
    IncomeTaxDeductionDTO incomeTaxDeductionDTO = new IncomeTaxDeductionDTO();

    // 1. 연소득 25%를 계산하여 공제 가능한 최소 사용 금액을 설정 (소득의 25% 초과분부터 공제 시작)
    double incomeThreshold = income * 0.25;

    // 2. 소득 공제 한도 설정 (연소득에 따라 300만원 또는 250만원으로 설정)
    int deductionLimit = income <= 70_000_000 ? 3_000_000 : 2_500_000;

    // 3. 신용카드와 체크카드 사용 금액을 조회
    LocalDate startOfYearDate = LocalDate.of(LocalDate.now().getYear(), 1, 1);
    LocalDateTime startOfYearDateTime = startOfYearDate.atStartOfDay();
    Timestamp startOfYearTimestamp = Timestamp.valueOf(startOfYearDateTime);

    Integer creditAmount = customerApprovalsRepository.getCreditCardAmountForYear(userId,
        startOfYearTimestamp);
    Integer debitAmount = customerApprovalsRepository.getDebitCardAmountForYear(userId,
        startOfYearTimestamp);

    Integer creditApprovalCount = customerApprovalsRepository.getCreditCardApprovalCountForYear(
        userId, startOfYearTimestamp);
    Integer debitApprovalCount = customerApprovalsRepository.getDebitCardApprovalCountForYear(
        userId, startOfYearTimestamp);

    // 기본 값이 null인 경우 0으로 초기화
    creditAmount = creditAmount != null ? creditAmount : 0;
    debitAmount = debitAmount != null ? debitAmount : 0;

    // 4. 총 소비 금액
    int totalSpentAmount = creditAmount + debitAmount;

    int remainingAmount =
        (incomeThreshold - totalSpentAmount) > 0 ? (int) (incomeThreshold - totalSpentAmount) : 0;

    // 5. 소득의 25% 초과 금액을 계산 (이 금액부터 공제가 적용됨)
    double deductibleAmount = totalSpentAmount - incomeThreshold;

    if (deductibleAmount <= 0) {
      // 25% 이상을 사용하지 않았을 경우 공제금액 없음
      incomeTaxDeductionDTO.setCommentCode("CREDIT_FIRST");
    }

    // 6. 공제 가능 금액 (연소득에 따른 공제 한도 적용)

    // 7. 신용카드 공제 계산 (15%)
    int creditDeductibleAmount = (int) Math.max(
        Math.min(creditAmount - incomeThreshold, deductibleAmount), 0);
    int creditDeductedAmount = (int) (creditDeductibleAmount * 0.15);

    // 8. 남은 공제 가능 금액을 체크카드 공제에 적용 (30%)
    double remainingThreshold = deductibleAmount - creditDeductibleAmount;
    int debitDeductibleAmount = (int) Math.max(Math.min(debitAmount, remainingThreshold), 0);

    // 9. 공제액 계산 (신용카드 15%, 체크카드 및 현금 30%)
    int debitDeductedAmount = (int) (debitDeductibleAmount * 0.30);

    // 10. 총 공제액 계산
    int totalDeductedAmount = creditDeductedAmount + debitDeductedAmount;

    // 11. 예상 적용 세율 결정
    double applicableTaxRate = getApplicableTaxRate(income);

    // 12. 아낄 수 있는 예상 세금 금액 계산
    int estimatedAmount = (int) (totalDeductedAmount * applicableTaxRate);

    if( estimatedAmount > (int) (deductionLimit * applicableTaxRate) ){
        estimatedAmount = (int) (deductionLimit * applicableTaxRate);
    }

    // 13. DTO에 결과값 설정
    incomeTaxDeductionDTO.setIncome(income);
    incomeTaxDeductionDTO.setCreditAmount(creditAmount);
    incomeTaxDeductionDTO.setDebitAmount(debitAmount);
    incomeTaxDeductionDTO.setCreditDeductibleAmount(creditDeductibleAmount);
    incomeTaxDeductionDTO.setCreditDeductedAmount(creditDeductedAmount);
    incomeTaxDeductionDTO.setDebitDeductibleAmount(debitDeductibleAmount);
    incomeTaxDeductionDTO.setDebitDeductedAmount(debitDeductedAmount);
    incomeTaxDeductionDTO.setDebitApprovalCount(debitApprovalCount);
    incomeTaxDeductionDTO.setCreditApprovalCount(creditApprovalCount);
    incomeTaxDeductionDTO.setEstimatedApplicableTaxRate(applicableTaxRate);
    incomeTaxDeductionDTO.setEstimatedAmount(estimatedAmount);
    incomeTaxDeductionDTO.setRemainingAmount(remainingAmount);

    // 14. 전략 제시: 남은 금액에 따른 전략 설정
    incomeTaxDeductionDTO.setCommentCode(
        determineCommentCode(creditAmount, debitAmount, incomeThreshold, (int) (deductionLimit * applicableTaxRate),applicableTaxRate));

    return new ResponseDTO<>(true, "세율 및 소득 공제 계산 완료", incomeTaxDeductionDTO);
  }


  // 소득에 따른 적용 세율을 반환하는 메서드
  private double getApplicableTaxRate(Integer income) {
    if (income <= 14_000_000) {
      return 0.06;
    } else if (income <= 50_000_000) {
      return 0.15;
    } else if (income <= 88_000_000) {
      return 0.24;
    } else if (income <= 150_000_000) {
      return 0.35;
    } else if (income <= 300_000_000) {
      return 0.38;
    } else if (income <= 500_000_000) {
      return 0.40;
    } else if (income <= 1_000_000_000) {
      return 0.42;
    } else {
      return 0.45;
    }
  }

  // 소비 전략 코드 결정
// 소비 전략 코드 결정
  private String determineCommentCode(Integer creditAmount, Integer debitAmount, double incomeThreshold, int deductionLimit, double applicableTaxRate) {
    double totalAmount = creditAmount + debitAmount;

    // 1. 아직 소득의 25%를 넘지 못한 경우: 신용카드 사용을 유도
    if (totalAmount < incomeThreshold) {
      return "CREDIT_FIRST";
    }

    // 2. 소득의 25%는 넘었지만, 소득공제 한도를 넘지 않은 경우: 체크카드 사용을 유도
    double deductibleAmount = (totalAmount - incomeThreshold) * applicableTaxRate;
    if (deductibleAmount > 0 && deductibleAmount < deductionLimit) {
      return "DEBIT_FOCUS";
    }

    // 3. 소득공제 한도를 모두 채운 경우: 추가 공제가 불가능한 상황
    return "FULL_DEDUCTION";
  }

}
