package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.CardBenefitDetailDTO;
import com.hararo.kopo_final_project.dto.CardDetailDTO;
import com.hararo.kopo_final_project.dto.CardTop3Detail;
import com.hararo.kopo_final_project.entity.*;
import com.hararo.kopo_final_project.repository.BenefitLimitsRepository;
import com.hararo.kopo_final_project.repository.CustomerApprovalsRepository;
import com.hararo.kopo_final_project.repository.CustomerCardsRepository;
import com.hararo.kopo_final_project.repository.CustomerUsedBenefitsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MyCardService {

    @Autowired
    private  CustomerCardsRepository customerCardsRepository;

    @Autowired
    private  CustomerApprovalsRepository customerApprovalsRepository;

    @Autowired
    private  BenefitLimitsRepository benefitLimitsRepository;

    @Autowired
    private CustomerUsedBenefitsRepository customerUsedBenefitsRepository;

    public List<CardDetailDTO> getAllCards(String userId) {
        // 사용자 ID로 해당하는 모든 카드 정보를 조회
        List<CustomerCards> customerCardsList = customerCardsRepository.findByCustomerId_CustomerId(userId);

        List<CardDetailDTO> cardDetailDTOList = new ArrayList<>();
        Timestamp startOfMonth = Timestamp.valueOf(LocalDate.now().withDayOfMonth(1).atStartOfDay());
        Timestamp endOfMonth = Timestamp.valueOf(LocalDate.now().with(TemporalAdjusters.lastDayOfMonth()).atTime(LocalTime.MAX));
        for (CustomerCards customerCard : customerCardsList) {
            // 해당 카드로 한 달간 사용한 금액 합계 조회
            Integer usedAmount = customerApprovalsRepository.getTotalUsedAmountForMonth(customerCard.getCustomerCardId(), startOfMonth, endOfMonth);
            if (usedAmount == null) usedAmount = 0;

            // 해당 카드의 혜택 구간 조회
            List<BenefitLimits> benefitLimits = benefitLimitsRepository.findByCardProductId(customerCard.getCardProductId().getCardProductId());

            // 혜택 구간이 있는 경우에는 구간들을, 없는 경우에는 빈 리스트를 반환
            List<Long> performanceBracket = benefitLimits.stream()
                    .filter(b -> b.getMinimumRange() != 0)
                    .map(BenefitLimits::getMinimumRange)
                    .sorted()  // 오름차순 정렬
                    .collect(Collectors.toList());

            // customPerformanceBracket은 사용자가 설정한 목표 금액 또는 0으로 설정
            Long customPerformanceBracket = (customerCard.getCustomerPerformanceSegment() != null) ? customerCard.getCustomerPerformanceSegment() : 0L;

            // 혜택 구간이 없을 경우 amountUntilNextBracket은 0
            Long amountUntilNextBracket = calculateAmountUntilNextBracket(usedAmount, performanceBracket);

          // 카드의 혜택 카테고리를 String 리스트로 변환
          List<String> cardBenefitList = benefitLimits.stream()
              .map(benefitLimit -> benefitLimit.getBenefitAreaCategoryCode().getCodeName()) // 혜택 카테고리의 코드명을 리스트로 변환
              .distinct() // 중복 제거
              .toList();

          // DTO 생성
            CardDetailDTO cardDetailDTO = new CardDetailDTO(
                    customerCard.getCardProductId().getCardName(),
                    customerCard.getCardProductId().getCardImage(),
                    customerCard.getCustomerCardId(),
                    customerCard.getExpirationDate(),
                    customerCard.getCardStatusCode().getCodeName(),
                    usedAmount,
                    performanceBracket,
                    customPerformanceBracket,
                    amountUntilNextBracket,
                    cardBenefitList
            );

            cardDetailDTOList.add(cardDetailDTO);
        }

        return cardDetailDTOList;
    }

    // 다음 혜택 구간까지 남은 금액 계산하는 메서드
    private Long calculateAmountUntilNextBracket(int usedAmount, List<Long> performanceBracket) {
        if (performanceBracket.isEmpty()) {
            return 0L; // 혜택 구간이 없을 경우 0 반환
        }

        for (int i = 0; i < performanceBracket.size(); i++) {
            Long bracket = performanceBracket.get(i);

            // 사용 금액이 구간보다 작을 경우, 해당 구간까지 남은 금액 계산
            if (usedAmount < bracket) {
                return bracket - usedAmount;
            }
        }

        // 모든 구간을 초과했을 경우 (즉, 마지막 구간 이상 사용했을 경우)
        return 0L;
    }
    public CardBenefitDetailDTO getCardDetail(String cardId) {
        // 1. 카드 기본 정보 조회
        Optional<CustomerCards> customerCardOpt = customerCardsRepository.findByCustomerCardId(cardId);
        if (customerCardOpt.isEmpty()) {
            return null;  // 카드 정보를 찾지 못했을 때
        }
        CustomerCards customerCard = customerCardOpt.get();

        // 사용자의 전월 실적
        Long lastMonthPerformance = customerCard.getLastMonthPerformance() != null ?
                customerCard.getLastMonthPerformance().longValue() : 0L;

        // 2. 이번 달 결제 내역 조회
        Timestamp startOfMonth = Timestamp.valueOf(LocalDate.now().withDayOfMonth(1).atStartOfDay());
        Timestamp endOfMonth = Timestamp.valueOf(LocalDate.now().with(TemporalAdjusters.lastDayOfMonth()).atTime(LocalTime.MAX));
        List<CustomerApprovals> approvals = customerApprovalsRepository.findByCustomerCard_CustomerCardIdAndApprovalDateBetween(cardId, startOfMonth, endOfMonth);

        // 이번 달 사용한 금액 합계 계산
        int usedAmount = approvals.stream()
                .mapToInt(CustomerApprovals::getApprovalAmount)
                .sum();

        // 3. 사용한 혜택 정보 조회
        List<CustomerUsedBenefits> usedBenefits = customerUsedBenefitsRepository.findByCustomerCardId_CustomerCardId(cardId);

        // 4. 혜택 구간 및 혜택 한도 조회 (lastMonthPerformance 값에 맞는 혜택 중 가장 높은 minimumRange 값 선택)
        List<BenefitLimits> applicableBenefits = benefitLimitsRepository.findApplicableBenefits(
                customerCard.getCardProductId().getCardProductId(), lastMonthPerformance);

        // 5. 혜택 구간 정보 정리
        // performanceBracket는 전월 실적에 따라 혜택 구간(minimumRange)들을 리스트로 관리합니다.
        List<Integer> performanceBracket = applicableBenefits.stream()
                .map(b -> b.getMinimumRange().intValue())  // Long -> Integer 변환
                .sorted()
                .collect(Collectors.toList());

        // 6. 혜택 정보 정리
        List<CardBenefitDetailDTO.Benefit> benefits = applicableBenefits.stream().map(benefitLimit -> {
            // 이번 달 해당 혜택 카테고리에 대한 사용 금액을 계산
            int usedAmountForCategory = approvals.stream()
                    .filter(approval -> approval.getPaymentCategoryCode().getCommonCode().equals(benefitLimit.getBenefitAreaCategoryCode().getCommonCode()))
                    .mapToInt(CustomerApprovals::getApprovalAmount)
                    .sum();

            // 사용한 혜택 금액
            int usedBenefitAmount = usedBenefits.stream()
                    .filter(ub -> ub.getBenefitLimitId().getBenefitLimitId().equals(benefitLimit.getBenefitLimitId()))
                    .mapToInt(CustomerUsedBenefits::getUsedBenefit)
                    .sum();

            // 혜택 한도
            int benefitLimitAmount = benefitLimit.getBenefitLimit() != null ? benefitLimit.getBenefitLimit().intValue() : 0;

            // 혜택 유형 확인
            String benefitType = benefitLimit.getBenefitId().getBenefitMethodCode().getCommonCode();
            // 혜택 유형에 따라 금액 할당
            Long cashBackAmount = null;
            Long discountAmount = null;

            if ("CASHBACK".equals(benefitType)) {
                cashBackAmount = benefitLimit.getBenefitLimit(); // 캐시백 비율 계산
            } else {
                discountAmount = benefitLimit.getBenefitLimit(); // 할인 비율 계산
            }
            return new CardBenefitDetailDTO.Benefit(
                    benefitLimit.getBenefitAreaCategoryCode().getCodeName(), // 혜택의 이름
                    cashBackAmount,  // 캐시백 금액
                    discountAmount,  // 할인 금액
                    benefitType,  // 혜택 유형 (CASHBACK 또는 DISCOUNT)
                    usedBenefitAmount,
                    benefitLimitAmount - usedBenefitAmount  // 남은 혜택 금액
            );
        }).collect(Collectors.toList());


        // 7. 결제 내역 정리
        List<CardBenefitDetailDTO.TransactionDetail> transactionDetails = approvals.stream().map(approval -> {
            Merchants merchant = approval.getMerchantId();
            return new CardBenefitDetailDTO.TransactionDetail(
                    merchant.getMerchantName(),
                    approval.getApprovalAmount(),
                    approval.getBenefitAmount(),
                    approval.getCustomerCard().getCustomerCardId(),
                    approval.getApprovalDate().toLocalDateTime().toLocalTime().toString(),
                    approval.getApprovalDate().toLocalDateTime().toLocalDate().toString(),
                    approval.getPaymentCategoryCode().getCodeName()
            );
        }).collect(Collectors.toList());

        // 8. 현재 구간에 대한 정보 정리 (실제 구간 계산)
        int currentRangeNum = calculateCurrentRange(usedAmount, performanceBracket);
        int remainingAmount = calculateRemainingAmount(usedAmount, performanceBracket);

        // 혜택 한도 총합 계산 (혜택 한도가 없는 경우에는 0으로 처리)
        int totalMaxBenefitAmount = applicableBenefits.stream()
                .mapToInt(b -> b.getBenefitLimit() != null ? b.getBenefitLimit().intValue() : 0)
                .sum();

        CardBenefitDetailDTO.CurrentRange currentRange = new CardBenefitDetailDTO.CurrentRange(
                currentRangeNum,
                performanceBracket,
                totalMaxBenefitAmount,
                usedBenefits.stream().mapToInt(CustomerUsedBenefits::getUsedBenefit).sum(),
                remainingAmount,
                benefits
        );

        // 9. CardBenefitDetailDTO 생성 및 반환
        return new CardBenefitDetailDTO(
                customerCard.getCardProductId().getCardName(),
                customerCard.getCardProductId().getCardImage(),
                customerCard.getCustomerCardId(),
                customerCard.getExpirationDate(),
                customerCard.getCardStatusCode().getCodeName(),
                usedAmount,
                performanceBracket,
                customerCard.getCustomerPerformanceSegment() != null ? customerCard.getCustomerPerformanceSegment() : 0,
                remainingAmount,
                currentRange,
                customerCard.getCardProductId().getCardPdfUrl(),
                transactionDetails
        );
    }



    private int calculateCurrentRange(int usedAmount, List<Integer> performanceBracket) {
        for (int i = 0; i < performanceBracket.size(); i++) {
            if (usedAmount < performanceBracket.get(i)) {
                return i + 1;  // 현재 구간 번호2
            }
        }
        return performanceBracket.size();  // 모든 구간을 초과한 경우 마지막 구간
    }

    private int calculateRemainingAmount(int usedAmount, List<Integer> performanceBracket) {
        for (int bracket : performanceBracket) {
            if (usedAmount < bracket) {
                return bracket - usedAmount;  // 다음 구간까지 남은 금액
            }
        }
        return 0;  // 모든 구간을 초과한 경우
    }

}
