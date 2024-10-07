package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.BenefitMapRecommendCardsDTO;
import com.hararo.kopo_final_project.dto.BenefitMapRecommendCardsDTO.BenefitMapRecommendCardDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.dto.StoreMarkerDTO;
import com.hararo.kopo_final_project.entity.*;
import com.hararo.kopo_final_project.repository.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BenefitMapService {

  private final MerchantsRepository merchantsRepository;
  private final CustomerCardsRepository customerCardsRepository;
  private final BenefitsRepository benefitsRepository;
  private final BenefitLimitsRepository benefitLimitsRepository;
  private final CustomerUsedBenefitsRepository customerUsedBenefitsRepository;
  private final CustomerApprovalsRepository customerApprovalsRepository;

  @Autowired
  public BenefitMapService(MerchantsRepository merchantsRepository,
      BenefitsRepository benefitsRepository,
      CustomerCardsRepository customerCardsRepository,
      BenefitLimitsRepository benefitLimitsRepository,
      CustomerUsedBenefitsRepository customerUsedBenefitsRepository,
      CustomerApprovalsRepository customerApprovalsRepository) {
    this.merchantsRepository = merchantsRepository;
    this.benefitsRepository = benefitsRepository;
    this.customerCardsRepository = customerCardsRepository;
    this.benefitLimitsRepository = benefitLimitsRepository;
    this.customerUsedBenefitsRepository = customerUsedBenefitsRepository;
    this.customerApprovalsRepository = customerApprovalsRepository;
  }


  public ResponseDTO<List<StoreMarkerDTO>> get1kmStoreMarker(double latitude, double longitude) {
    double kmRange = 0.009; // 1km에 해당하는 위도, 경도 차이

    double latStart = latitude - kmRange;
    double latEnd = latitude + kmRange;
    double lonStart = longitude - kmRange;
    double lonEnd = longitude + kmRange;

    List<Merchants> merchants = merchantsRepository.findByLocationWithin1Km(
        latitude, longitude, latStart, latEnd, lonStart, lonEnd);

    List<StoreMarkerDTO> storeMarkers = merchants.stream()
        .map(merchant -> new StoreMarkerDTO(
            merchant.getMerchantId(),
            merchant.getMerchantName(),
            merchant.getLatitude(),
            merchant.getLongitude(),
            merchant.getCategoryCode().getCodeName(),
            merchant.getStoreImgUrl(),
            ImageSelector(merchant.getCategoryCode().getCodeName()),
            new StoreMarkerDTO.Detail(
                merchant.getMerchantAddress(),
                merchant.getMerchantHours(),
                merchant.getMerchantDescription()
            )
        ))
        .collect(Collectors.toList());

    return new ResponseDTO<>(true, "성공적으로 가맹점 데이터를 조회했습니다.", storeMarkers);
  }


  public ResponseDTO<List<StoreMarkerDTO>> getAllStoreMarker(double latitude, double longitude) {

    List<Merchants> merchants = merchantsRepository.findAllOfflineMerchant();

    List<StoreMarkerDTO> storeMarkers = merchants.stream()
        .map(merchant -> new StoreMarkerDTO(
            merchant.getMerchantId(),
            merchant.getMerchantName(),
            merchant.getLatitude(),
            merchant.getLongitude(),
            merchant.getCategoryCode().getCodeName(),
            merchant.getStoreImgUrl(),
            ImageSelector(merchant.getCategoryCode().getCodeName()),
            new StoreMarkerDTO.Detail(
                merchant.getMerchantAddress(),
                merchant.getMerchantHours(),
                merchant.getMerchantDescription()
            )
        ))
        .collect(Collectors.toList());

    return new ResponseDTO<>(true, "성공적으로 가맹점 데이터를 조회했습니다.", storeMarkers);
  }

  public ResponseDTO<List<StoreMarkerDTO>> getStoresByCategory(double latitude, double longitude,
      String category) {
    List<Merchants> merchants = merchantsRepository.findByCategoryCode_CommonCode(category);

    List<StoreMarkerDTO> storeMarkers = merchants.stream()
        .map(merchant -> new StoreMarkerDTO(
            merchant.getMerchantId(),
            merchant.getMerchantName(),
            merchant.getLatitude(),
            merchant.getLongitude(),
            merchant.getCategoryCode().getCodeName(),
            merchant.getStoreImgUrl(),
            ImageSelector(merchant.getCategoryCode().getCodeName()),
            new StoreMarkerDTO.Detail(
                merchant.getMerchantAddress(),
                merchant.getMerchantHours(),
                merchant.getMerchantDescription()
            )
        ))
        .collect(Collectors.toList());

    return new ResponseDTO<>(true, "성공적으로 가맹점 데이터를 조회했습니다.", storeMarkers);
  }


  /**
   * 거리와 카테고리에 따라 가맹점 정보를 조회하는 공통 메서드
   *
   * @param latitude  위도
   * @param longitude 경도
   * @param kmRange   거리(km)
   * @param category  카테고리 (null일 경우 전체)
   * @return ResponseDTO<List < StoreMarkerDTO>>
   */
  public ResponseDTO<List<StoreMarkerDTO>> getStoreMarkers(Double latitude, Double longitude,
      Double kmRange, String category) {
    List<Merchants> merchants;

    if (category == null || category.isEmpty()) {
      // 카테고리가 없을 경우 거리 내 모든 가맹점 조회
      merchants = merchantsRepository.findMerchantsWithinDistance(latitude, longitude, kmRange);
    } else {
      // 카테고리가 있을 경우 거리 내 해당 카테고리의 가맹점 조회
      merchants = merchantsRepository.findMerchantsWithinDistanceAndCategory(latitude, longitude,
          kmRange, category);
    }

    List<StoreMarkerDTO> storeMarkers = convertMerchantsToStoreMarkers(merchants);

    return new ResponseDTO<>(true, "성공적으로 가맹점 데이터를 조회했습니다.", storeMarkers);
  }


  /**
   * 가맹점 리스트를 StoreMarkerDTO 리스트로 변환하는 공통 메서드
   *
   * @param merchants 가맹점 리스트
   * @return List<StoreMarkerDTO>
   */
  private List<StoreMarkerDTO> convertMerchantsToStoreMarkers(List<Merchants> merchants) {
    return merchants.stream()
        .map(merchant -> new StoreMarkerDTO(
            merchant.getMerchantId(),
            merchant.getMerchantName(),
            merchant.getLatitude(),
            merchant.getLongitude(),
            merchant.getCategoryCode().getCodeName(),
            merchant.getStoreImgUrl(),
            ImageSelector(merchant.getCategoryCode().getCodeName()),
            new StoreMarkerDTO.Detail(
                merchant.getMerchantAddress(),
                merchant.getMerchantHours(),
                merchant.getMerchantDescription()
            )
        ))
        .collect(Collectors.toList());
  }

  private String ImageSelector(String storeCategoryName) {
    return switch (storeCategoryName) {
      case "카페" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/cafe_category_pc.png?version=13";
      case "마트" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/mart_category_pc.png?version=13";
      case "음식점" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/dining_category_pc.png?version=13";
      case "약국" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/pharmacy_category_pc.png?version=13";
      case "병원" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/emergencycare_category_pc.png?version=13";
      case "편의점" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/store_category_pc.png?version=13";
      case "주유소" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/oil_category_pc.png?version=13";
      case "은행" ->
          "https://map.pstatic.net/resource/api/v2/image/maps/around-category/bank_category_pc.png?version=13";
      default -> {
        System.out.println("알 수 없는 카테고리입니다: " + storeCategoryName);
        yield "대체이미지";
      }
    };
  }

  public ResponseDTO<BenefitMapRecommendCardsDTO> getRecommendCards(String userId, String storeId,
      String storeCategory) {
    try {
      BenefitMapRecommendCardsDTO cardList = new BenefitMapRecommendCardsDTO();
      cardList.setBenefitMapRecommendCardList(new ArrayList<>());

      // 1. 사용자가 보유한 카드 목록을 불러옴
      List<CustomerCards> customerCards = customerCardsRepository.findByCustomerId_CustomerId(
          userId);

      if (customerCards.isEmpty()) {
        return new ResponseDTO<>(false, "사용자가 보유한 카드가 없습니다.", null);
      }

      // 2. 가맹점의 혜택 카테고리를 가져옴
      Merchants merchant = merchantsRepository.findById(Integer.parseInt(storeId)).orElse(null);
      if (merchant == null) {
        return new ResponseDTO<>(false, "가맹점을 찾을 수 없습니다.", null);
      }
      cardList.setCategoryName(merchant.getBenefitCategoryCode().getCodeName());

      String merchantBenefitCategoryCode = merchant.getBenefitCategoryCode().getCommonCode();

      // 3. 사용자의 해당 카테고리 평균 결제 금액 추정
      Double assumedPaymentAmount = estimateUserSpending(userId, merchantBenefitCategoryCode);
      cardList.setPotentialApprovalAmount(assumedPaymentAmount);

      // **카드별 최대 혜택을 저장할 맵 생성**
      Map<String, BenefitMapRecommendCardDTO> cardBenefitMap = new HashMap<>();

      // 4. 각 카드에 대해 혜택 계산
      for (CustomerCards customerCard : customerCards) {
        CardProducts cardProduct = customerCard.getCardProductId();

        // 카드 상태가 활성화된 카드만 고려
        if (!customerCard.getCardStatusCode().getCommonCode().equals("ACTIVE")) {
          continue;
        }

        // 해당 카드의 혜택 목록을 가져옴
        List<Benefits> benefits = benefitsRepository.findByCardProductId_CardProductId(
            cardProduct.getCardProductId());

        for (Benefits benefit : benefits) {
          // 혜택 제한 사항을 가져옴
          List<BenefitLimits> benefitLimits = benefitLimitsRepository.findByBenefitId_BenefitId(
              benefit.getBenefitId());

          for (BenefitLimits limit : benefitLimits) {
            // 혜택이 해당 가맹점의 혜택 카테고리에 적용되는지 확인
            if (limit.getBenefitAreaCategoryCode().getCommonCode()
                .equals(merchantBenefitCategoryCode) || limit.getBenefitAreaCategoryCode()
                .getCommonCode().equals("ANY")) {
              // 혜택 적용 여부 판단 (실적 조건, 혜택 한도 등)
              boolean isEligible = checkBenefitEligibility(customerCard, limit, userId);

              if (isEligible) {
                // 잠재적 혜택 금액 계산
                double potentialBenefitAmount = calculatePotentialBenefit(limit, userId,
                    assumedPaymentAmount, customerCard);

                // 잠재적 혜택이 0보다 크면 처리 진행
                if (potentialBenefitAmount > 0) {
                  // 혜택 사용 여부 확인
                  List<CustomerUsedBenefits> usedBenefits = customerUsedBenefitsRepository.findByCustomerCardId_CustomerCardIdAndBenefitLimitId_BenefitLimitId(
                      customerCard.getCustomerCardId(), limit.getBenefitLimitId());

                  int usedBenefitAmount = 0;
                  if (usedBenefits != null && !usedBenefits.isEmpty()) {
                    for (CustomerUsedBenefits usedBenefit : usedBenefits) {
                      usedBenefitAmount += usedBenefit.getUsedBenefit();
                    }
                  }

                  // DTO 구성
                  BenefitMapRecommendCardsDTO.BenefitMapRecommendCardDTO dto = new BenefitMapRecommendCardsDTO.BenefitMapRecommendCardDTO();
                  dto.setCardId(customerCard.getCustomerCardId()); // 사용자 카드번호
                  dto.setCardName(cardProduct.getCardName()); // 카드 이름
                  dto.setCardImgUrl(cardProduct.getCardImage()); // 카드 이미지 경로
                  dto.setBenefitDescription(benefit.getBenefitSummaryDescription()); // 혜택 요약 설명
                  dto.setPotentialBenefitAmount(potentialBenefitAmount); // 잠재적으로 받을 수 있는 혜택 금액
                  dto.setUsedBenefitAmount(usedBenefitAmount); // 사용한 혜택 금액
                  dto.setRemainingBenefitAmount(limit.getBenefitLimit() - usedBenefitAmount); // 남은 혜택금액
                  dto.setBenefitLimit(limit.getBenefitLimit());

                  // **카드별로 최대 혜택 금액을 가진 DTO만 유지**
                  String cardId = customerCard.getCustomerCardId();
                  if (cardBenefitMap.containsKey(cardId)) {
                    // 기존에 저장된 DTO와 잠재적 혜택 금액 비교
                    BenefitMapRecommendCardsDTO.BenefitMapRecommendCardDTO existingDto = cardBenefitMap.get(cardId);
                    if (potentialBenefitAmount > existingDto.getPotentialBenefitAmount()) {
                      // 새로운 DTO의 혜택 금액이 더 크면 대체
                      cardBenefitMap.put(cardId, dto);
                    }
                    // 그렇지 않으면 기존 DTO 유지
                  } else {
                    // 해당 카드의 첫 번째 DTO 저장
                    cardBenefitMap.put(cardId, dto);
                  }
                }
              }
            }
          }
        }
      }

      // **맵에 저장된 DTO들을 리스트로 변환 및 정렬**
      List<BenefitMapRecommendCardsDTO.BenefitMapRecommendCardDTO> dtoList = new ArrayList<>(cardBenefitMap.values());
      dtoList.sort(
          (dto1, dto2) -> Double.compare(dto2.getPotentialBenefitAmount(),
              dto1.getPotentialBenefitAmount()));

      cardList.setBenefitMapRecommendCardList(dtoList);

      return new ResponseDTO<>(true, "성공적으로 카드 데이터 전송 완료", cardList);

    } catch (Exception e) {
      System.out.println("getRecommendCards 에러 발생 : " + e.getMessage());
      return new ResponseDTO<>(false, "에러 발생", null);
    }
  }



  private boolean checkBenefitEligibility(CustomerCards customerCard, BenefitLimits limit,
      String userId) {
    // 전월 실적 조건 판단
    Integer lastMonthPerformance = customerCard.getLastMonthPerformance();
    Long minimumRange = limit.getMinimumRange();
    Long maximumRange = limit.getMaximumRange();

    if (minimumRange != null && lastMonthPerformance != null
        && lastMonthPerformance < minimumRange) {
      return false;
    }
    if (maximumRange != null && lastMonthPerformance != null
        && lastMonthPerformance > maximumRange) {
      return false;
    }

    // 혜택 사용 여부 확인
    List<CustomerUsedBenefits> usedBenefits = customerUsedBenefitsRepository.findByCustomerCardId_CustomerCardIdAndBenefitLimitId_BenefitLimitId(
            customerCard.getCustomerCardId(), limit.getBenefitLimitId());

    int usedBenefitAmount = 0;
    if (usedBenefits != null && !usedBenefits.isEmpty()) {
      for (CustomerUsedBenefits usedBenefit : usedBenefits) {
        usedBenefitAmount += usedBenefit.getUsedBenefit();
      }
    }

    if (usedBenefitAmount > 0) {
      Long benefitLimit = limit.getBenefitLimit();
      return benefitLimit == null || usedBenefitAmount < benefitLimit; // 혜택 한도를 모두 사용함
    }

    return true;
  }


  private double calculatePotentialBenefit(BenefitLimits limit, String userId,
      double assumedPaymentAmount, CustomerCards customerCard) {
    double potentialBenefit = 0.0;

    // 사용자의 이미 사용한 혜택 금액 조회
    List<CustomerUsedBenefits> usedBenefits = customerUsedBenefitsRepository.findByCustomerCardId_CustomerCardIdAndBenefitLimitId_BenefitLimitId(
            customerCard.getCustomerCardId(), limit.getBenefitLimitId());

    int usedBenefitAmount = 0;
    if (usedBenefits != null && !usedBenefits.isEmpty()) {
      for (CustomerUsedBenefits usedBenefit : usedBenefits) {
        usedBenefitAmount += usedBenefit.getUsedBenefit();
      }
    }

    double remainingBenefitLimit =
        limit.getBenefitLimit() != null ? limit.getBenefitLimit() : Double.MAX_VALUE;
    if (usedBenefitAmount > 0) {
      remainingBenefitLimit -= usedBenefitAmount;
    }

    if (remainingBenefitLimit <= 0) {
      return 0.0; // 남은 혜택 한도가 없음
    }

    if (limit.getFixedOrRateCode().getCommonCode().equals("FIXED")) {
      potentialBenefit = limit.getBenefitAmount();

      // 남은 혜택 한도 내에서 계산
      if (potentialBenefit > remainingBenefitLimit) {
        potentialBenefit = remainingBenefitLimit;
      }

    } else if (limit.getFixedOrRateCode().getCommonCode().equals("RATE")) {
      potentialBenefit = assumedPaymentAmount * limit.getBenefitRate();

      // 남은 혜택 한도 내에서 계산
      if (potentialBenefit > remainingBenefitLimit) {
        potentialBenefit = remainingBenefitLimit;
      }
    }

    return potentialBenefit;
  }


  private double estimateUserSpending(String userId, String categoryCode) {
    // 최근 6개월의 결제 내역을 기준으로 평균 결제 금액을 계산한다고 가정
    Timestamp sixMonthsAgo = Timestamp.valueOf(LocalDateTime.now().minusMonths(6));
    Timestamp now = Timestamp.valueOf(LocalDateTime.now());

    // 해당 사용자와 카테고리에 대한 결제 내역 조회
    List<CustomerApprovals> approvals = customerApprovalsRepository
        .findByCustomerCard_CustomerId_CustomerIdAndPaymentCategoryCode_CommonCodeAndApprovalDateBetween(
            userId, categoryCode, sixMonthsAgo, now);

    if (approvals.isEmpty()) {
      // 결제 내역이 없는 경우 기본값 반환 2016년 신용카드 사용 통계에 의한 금액의 평균값
      return 44917.0;
    } else {
      // 총 결제 금액 계산
      double totalAmount = approvals.stream()
          .mapToDouble(CustomerApprovals::getApprovalAmount)
          .sum();

      // 평균 결제 금액 계산
      return totalAmount / approvals.size();
    }
  }


}
