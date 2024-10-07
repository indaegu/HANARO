package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.CardBenefitSummary;
import com.hararo.kopo_final_project.dto.CategoryTotalDTO;
import com.hararo.kopo_final_project.dto.RecommendCardWithBenefitDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.dto.SurveyResultDTO;
import com.hararo.kopo_final_project.entity.AnnualFees;
import com.hararo.kopo_final_project.entity.BenefitLimits;
import com.hararo.kopo_final_project.entity.CardProducts;
import com.hararo.kopo_final_project.entity.CommonCodes;
import com.hararo.kopo_final_project.entity.CustomerApprovals;
import com.hararo.kopo_final_project.entity.CustomerCards;
import com.hararo.kopo_final_project.entity.Merchants;
import com.hararo.kopo_final_project.repository.AnnualFeesRepository;
import com.hararo.kopo_final_project.repository.BenefitLimitsRepository;
import com.hararo.kopo_final_project.repository.BenefitsRepository;
import com.hararo.kopo_final_project.repository.CardProductsRepository;

import com.hararo.kopo_final_project.repository.CommonCodesRepository;
import com.hararo.kopo_final_project.repository.CustomerApprovalsRepository;
import com.hararo.kopo_final_project.repository.CustomerCardsRepository;
import com.hararo.kopo_final_project.repository.MerchantsRepository;
import com.hararo.kopo_final_project.util.DateUtil;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.hararo.kopo_final_project.requestdto.RecommendDataRequestDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CardRecommendService {

  @Autowired
  private EntityManager entityManager;

  @Autowired
  private CardProductsRepository cardProductsRepository;

  @Autowired
  private CustomerCardsRepository customerCardsRepository;

  @Autowired
  private MerchantsRepository merchantsRepository;

  @Autowired
  private CommonCodesRepository commonCodesRepository;

  @Autowired
  private CustomerApprovalsRepository customerApprovalsRepository;

  @Autowired
  private BenefitLimitsRepository benefitLimitsRepository;

  @Autowired
  private AnnualFeesRepository annualFeesRepository;

  @Autowired
  private BenefitsRepository benefitsRepository;

  public ResponseDTO<SurveyResultDTO> getSurveyResult(String resultType) {
    SurveyResultDTO surveyResultDTO = new SurveyResultDTO(
        "a",
        new ArrayList<>()
    );

    // Java 12이후 부터 사용 가능한 향상된 switch 문법
    // 각 타입별 반환하는 카드 데이터값을 변경한다.
    switch (resultType) {
      // a : 집돌이 : 구독, 배달, 편의점, 온라인 쇼핑
      case "a" -> {
        // 달달하나
        CardProducts aType1 = cardProductsRepository.findById("CARD-028").orElse(null);
        // #any
        CardProducts aType2 = cardProductsRepository.findById("CARD-010").orElse(null);
        // 원더카드 FREE+
        CardProducts aType3 = cardProductsRepository.findById("CARD-082").orElse(null);

        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(aType1).getCardProductId(),
                aType1.getCardName(),
                aType1.getCardImage(),
                aType1.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(aType2).getCardProductId(),
                aType2.getCardName(),
                aType2.getCardImage(),
                aType2.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(aType3).getCardProductId(),
                aType3.getCardName(),
                aType3.getCardImage(),
                aType3.getCardDescription()
            )
        );
      }

      // b :밖순이 : 여행, 택시, 커피, 면세, 항공
      case "b" -> {
        // Jade Classic
        CardProducts bType1 = cardProductsRepository.findById("CARD-005").orElse(null);
        // #MY WAY(샵 마이웨이) 카드
        CardProducts bType2 = cardProductsRepository.findById("CARD-009").orElse(null);
        // #tag1카드 Orange
        CardProducts bType3 = cardProductsRepository.findById("CARD-026").orElse(null);

        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(bType1).getCardProductId(),
                bType1.getCardName(),
                bType1.getCardImage(),
                bType1.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(bType2).getCardProductId(),
                bType2.getCardName(),
                bType2.getCardImage(),
                bType2.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(bType3).getCardProductId(),
                bType3.getCardName(),
                bType3.getCardImage(),
                bType3.getCardDescription()
            )
        );
      }

      // c : 플렉서 : 백화점, 면세, 해외결제, 항공, 바우처
      case "c" -> {
        // Jade Prime
        CardProducts cType1 = cardProductsRepository.findById("CARD-007").orElse(null);
        // 신세계 the Mile 하나카드
        CardProducts cType2 = cardProductsRepository.findById("CARD-113").orElse(null);
        // 트래블로그 Prestige
        CardProducts cType3 = cardProductsRepository.findById("CARD-002").orElse(null);
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(cType1).getCardProductId(),
                cType1.getCardName(),
                cType1.getCardImage(),
                cType1.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(cType2).getCardProductId(),
                cType2.getCardName(),
                cType2.getCardImage(),
                cType2.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(cType3).getCardProductId(),
                cType3.getCardName(),
                cType3.getCardImage(),
                cType3.getCardDescription()
            )
        );
      }

      // d : 알뜰이 : 공과금, 조건없음, 통신, 마트
      case "d" -> {
        // 원더카드 T : 한장에 담은 SK 통신 주유 혜택
        CardProducts dType1 = cardProductsRepository.findById("CARD-006").orElse(null);
        // 하나 원큐 카드
        CardProducts dType2 = cardProductsRepository.findById("CARD-091").orElse(null);
        // CLUB SK(클럽 SK)카드
        CardProducts dType3 = cardProductsRepository.findById("CARD-011").orElse(null);
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(dType1).getCardProductId(),
                dType1.getCardName(),
                dType1.getCardImage(),
                dType1.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(dType2).getCardProductId(),
                dType2.getCardName(),
                dType2.getCardImage(),
                dType2.getCardDescription()
            )
        );
        surveyResultDTO.getCardList().add(
            new SurveyResultDTO.Card(
                Objects.requireNonNull(dType3).getCardProductId(),
                dType3.getCardName(),
                dType3.getCardImage(),
                dType3.getCardDescription()
            )
        );
      }

      default -> {
        return new ResponseDTO<>(false, "잘못된 타입 입력", null);
      }
    }

    surveyResultDTO.setResultType(resultType);

    return new ResponseDTO<>(true, "추천카드 데이터 전송완료", surveyResultDTO);
  }

  @Transactional
  public ResponseDTO<List<RecommendCardWithBenefitDTO>> getBestCardBenefits2(RecommendDataRequestDTO request) {

    StoredProcedureQuery query = entityManager.createStoredProcedureQuery(
            "simulate_best_cards_for_all_payments");

    // 입력 파라미터 설정
    query.registerStoredProcedureParameter("p_user_id", String.class, ParameterMode.IN);
    query.setParameter("p_user_id", request.getUserId());

    // 카드 1의 출력 파라미터 설정
    query.registerStoredProcedureParameter("o_card1_id", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card1_name", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card1_img_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card1_benefit_all_amount", BigDecimal.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card1_picking_rate", Double.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card1_card_apply_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_benefit_cursor1", void.class, ParameterMode.REF_CURSOR);
    query.registerStoredProcedureParameter("o_benefit_description_cursor1", void.class, ParameterMode.REF_CURSOR);

    // 카드 2의 출력 파라미터 설정
    query.registerStoredProcedureParameter("o_card2_id", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card2_name", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card2_img_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card2_benefit_all_amount", BigDecimal.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card2_picking_rate", Double.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card2_card_apply_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_benefit_cursor2", void.class, ParameterMode.REF_CURSOR);
    query.registerStoredProcedureParameter("o_benefit_description_cursor2", void.class, ParameterMode.REF_CURSOR);

    // 카드 3의 출력 파라미터 설정
    query.registerStoredProcedureParameter("o_card3_id", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card3_name", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card3_img_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card3_benefit_all_amount", BigDecimal.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card3_picking_rate", Double.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_card3_card_apply_url", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("o_benefit_cursor3", void.class, ParameterMode.REF_CURSOR);
    query.registerStoredProcedureParameter("o_benefit_description_cursor3", void.class, ParameterMode.REF_CURSOR);

    // 프로시저 실행
    query.execute();

    // 세 장의 카드 정보를 각각 처리
    List<RecommendCardWithBenefitDTO> cardList = new ArrayList<>();

    // 카드 1 처리
    try {
      cardList.add(processCard(query, "o_card1_name", "o_card1_img_url",
              "o_card1_benefit_all_amount", "o_card1_picking_rate", "o_card1_card_apply_url",
              "o_benefit_cursor1", "o_benefit_description_cursor1"));
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }

    // 카드 2 처리
    try {
      cardList.add(processCard(query, "o_card2_name", "o_card2_img_url",
              "o_card2_benefit_all_amount", "o_card2_picking_rate", "o_card2_card_apply_url",
              "o_benefit_cursor2", "o_benefit_description_cursor2"));
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }

    // 카드 3 처리
    try {
      cardList.add(processCard(query, "o_card3_name", "o_card3_img_url",
              "o_card3_benefit_all_amount", "o_card3_picking_rate", "o_card3_card_apply_url",
                "o_benefit_cursor3", "o_benefit_description_cursor3"));
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }

    return new ResponseDTO<>(true, "Top 3 best card benefits calculated", cardList);
  }

  private RecommendCardWithBenefitDTO processCard(StoredProcedureQuery query,
                                                  String cardNameParam,
                                                  String cardImgUrlParam,
                                                  String cardBenefitAllAmountParam,
                                                  String cardPickingRateParam,
                                                  String cardApplyUrlParam,
                                                  String benefitCursorParam,
                                                  String benefitDescCursorParam) throws SQLException {

    // 카테고리별 혜택 리스트 처리
    List<RecommendCardWithBenefitDTO.Benefits> benefits = new ArrayList<>();
    List<RecommendCardWithBenefitDTO.BenefitsDescription> benefitsDescriptions = new ArrayList<>();

    ResultSet benefitCursor = (ResultSet) query.getOutputParameterValue(benefitCursorParam);
    System.out.println("Processing cursor: " + benefitCursorParam);

    if (benefitCursor == null) {
      System.out.println("benefitCursor이 null입니다: " + benefitCursorParam);
    } else {
      ResultSetMetaData metaData = benefitCursor.getMetaData();
      int columnCount = metaData.getColumnCount();
      System.out.println("Cursor " + benefitCursorParam + "에는 " + columnCount + "개의 컬럼이 있습니다.");

      boolean hasData = false;
      while (benefitCursor.next()) {
        hasData = true;
        RecommendCardWithBenefitDTO.Benefits benefit = new RecommendCardWithBenefitDTO.Benefits();
        String categoryName = benefitCursor.getString("category_name");
        System.out.println("Category Name: " + categoryName); // 디버깅 로그
        benefit.setBenefitIcon(ImageSelector(categoryName));
        benefit.setBenefitCategoryName(categoryName);  // category_code
        benefit.setAmount(benefitCursor.getBigDecimal("total_amount"));  // total_amount
        benefit.setBenefitAmount(
                benefitCursor.getBigDecimal("total_benefit") != null
                        ? benefitCursor.getBigDecimal("total_benefit").setScale(0, RoundingMode.HALF_UP)
                        : BigDecimal.ZERO
        ); // total_benefit
        benefits.add(benefit);
      }
      if (!hasData) {
        System.out.println("커서에 데이터가 없습니다: " + benefitCursorParam);
      }
    }

    ResultSet benefitDescCursor = (ResultSet) query.getOutputParameterValue(benefitDescCursorParam);
    if (benefitDescCursor == null) {
      System.out.println("benefitDescCursor가 null입니다: " + benefitDescCursorParam);
    } else {
      while (benefitDescCursor.next()) {
        RecommendCardWithBenefitDTO.BenefitsDescription benefitDesc = new RecommendCardWithBenefitDTO.BenefitsDescription();
        String benefitDescription = benefitDescCursor.getString("BENEFIT_SUMMARY_DESCRIPTION");
        System.out.println("Benefit Description: " + benefitDescription); // 디버깅 로그
        benefitDesc.setBenefitDescription(benefitDescription);
        benefitsDescriptions.add(benefitDesc);
      }
    }

    RecommendCardWithBenefitDTO dto = new RecommendCardWithBenefitDTO();

    dto.setCardProductName((String) query.getOutputParameterValue(cardNameParam));
    dto.setBenefitAllAmount((BigDecimal) query.getOutputParameterValue(cardBenefitAllAmountParam));
    dto.setCardProductImgUrl((String) query.getOutputParameterValue(cardImgUrlParam));
    dto.setPickingRate((Double) query.getOutputParameterValue(cardPickingRateParam));
    dto.setCardApplyUrl((String) query.getOutputParameterValue(cardApplyUrlParam));

    dto.setBenefits(benefits);
    dto.setBenefitsDescriptions(benefitsDescriptions);

    return dto;
  }



  private String ImageSelector(String benefitCategoryName) {
    return switch (benefitCategoryName) {
      case "주유" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info01.png";
      case "택시" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info09.png";
      case "대중교통" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info08.png";
      case "마트" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info03.png";
      case "온라인쇼핑" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info81.png";
      case "백화점" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info02.png";
      case "해외결제" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info52.png";
      case "항공", "여행" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info16.png";
      case "영화", "구독" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info07.png";
      case "커피" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info06.png";
      case "통신" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info11.png";
      case "편의점" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info04.png";
      case "공과금" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info100.png";
      case "의료" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info19.png";
      case "딜리버리" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info50.png";
      case "조건없음" ->
          "https://www.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_view/ico_card_info27.png";
      default -> {
        System.out.println("알 수 없는 카테고리입니다: " + benefitCategoryName);
        yield null;
      }
    };
  }

  public void saveApprovals(RecommendDataRequestDTO request){
    // CardApproval 데이터가 있을 경우 처리
    if (request.getApprovals() != null && !request.getApprovals().isEmpty()) {
      for (RecommendDataRequestDTO.CardApproval cardApprovalDTO : request.getApprovals()) {
        try {
          // 이미 존재하는 approvalNumber인지 확인
          if (customerApprovalsRepository.existsById(cardApprovalDTO.getApprovalNumber())) {
            // 이미 존재하는 approvalNumber라면 다음 결제로 넘어감
            continue;
          }

          // CustomerCard, Merchant, CommonCodes 등의 참조 데이터를 가져옴
          CustomerCards customerCard = customerCardsRepository.findById(
                  cardApprovalDTO.getCustomerCard())
              .orElseThrow(() -> new RuntimeException("Customer card not found"));

          Merchants merchant = merchantsRepository.findById(
                  Integer.valueOf(cardApprovalDTO.getMerchantId()))
              .orElseThrow(() -> new RuntimeException("Merchant not found"));

          CommonCodes approvalStatusCode = commonCodesRepository.findById(
                  cardApprovalDTO.getApprovalStatusCode())
              .orElseThrow(() -> new RuntimeException("Approval status code not found"));

          CommonCodes paymentCategoryCode = commonCodesRepository.findById(
                  cardApprovalDTO.getPaymentCategoryCode())
              .orElseThrow(() -> new RuntimeException("Payment category code not found"));

          // String -> Timestamp 변환
          Timestamp approvalDate = DateUtil.convertStringToTimestamp(
              cardApprovalDTO.getApprovalDate());

          // CustomerApproval 엔티티 생성 및 데이터 매핑
          CustomerApprovals customerApproval = CustomerApprovals.builder()
              .approvalNumber(
                  cardApprovalDTO.getApprovalNumber()) // approvalNumber가 없으면 @PrePersist에 의해 자동 생성
              .approvalDate(approvalDate)
              .approvalAmount(cardApprovalDTO.getApprovalAmount())
              .benefitAmount(cardApprovalDTO.getBenefitAmount())
              .customerCard(customerCard)
              .merchantId(merchant)
              .approvalStatusCode(approvalStatusCode)
              .paymentCategoryCode(paymentCategoryCode)
              .build();

          // DB에 삽입
          customerApprovalsRepository.save(customerApproval);

        } catch (Exception e) {
          // 예외 발생 시 에러 로그 출력 및 다음 결제로 넘어감
          System.err.println(
              "Error processing approvalNumber: " + cardApprovalDTO.getApprovalNumber() + " - "
                  + e.getMessage());
          // 예외를 throw 하지 않고, 다음 결제로 넘어감
          continue;
        }
      }
    }
  }

  @Transactional
  public ResponseDTO<List<RecommendCardWithBenefitDTO>> simulateBestCardsForAllPayments(String userId) {

    try {
      // 1. 지난 12개월 동안 사용자의 총 승인 금액 계산
      LocalDateTime startDate = LocalDateTime.now().minusMonths(12).with(TemporalAdjusters.firstDayOfMonth());
      LocalDateTime endDate = LocalDateTime.now().with(TemporalAdjusters.firstDayOfMonth());

      BigDecimal totalApprovalAmount = customerApprovalsRepository.getTotalApprovalAmount(userId, Timestamp.valueOf(startDate));

      // 2. 카테고리별 총 승인 금액 계산
      List<CategoryTotalDTO> categoryTotals = customerApprovalsRepository.getCategoryTotals(userId, Timestamp.valueOf(startDate));
      Map<String, CategoryTotalDTO> categoryTotalMap = categoryTotals.stream()
          .collect(Collectors.toMap(CategoryTotalDTO::getCategoryCode, Function.identity()));

      // 3. 혜택이 있는 모든 카드 상품 가져오기
      List<CardProducts> cardProducts = cardProductsRepository.findAllWithBenefits();

      // 4. 카드 혜택 요약을 저장할 리스트 준비
      List<CardBenefitSummary> cardBenefitSummaries = new ArrayList<>();

      // 5. 각 카드 상품을 순회
      for (CardProducts cardProduct : cardProducts) {

        // 5.1 카드의 총 혜택 금액 초기화
        BigDecimal totalBenefit = BigDecimal.ZERO;

        // 5.2 카드의 카테고리별 혜택 금액을 저장할 맵 초기화
        Map<String, BigDecimal> categoryBenefitMap = new HashMap<>();

        // 5.3 지난 12개월 동안 월별로 혜택 시뮬레이션
        LocalDateTime currentMonthStart = startDate;

        while (currentMonthStart.isBefore(endDate)) {
          LocalDateTime currentMonthEnd = currentMonthStart.plusMonths(1);

          // 5.3.1 해당 월의 혜택 사용량 맵 초기화
          Map<String, BigDecimal> benefitUsage = new HashMap<>();

          // 5.3.2 해당 월의 사용자의 승인 내역 가져오기
          List<CustomerApprovals> approvals = customerApprovalsRepository.findApprovalsByUserIdAndDateRange(
              userId, Timestamp.valueOf(currentMonthStart), Timestamp.valueOf(currentMonthEnd));

          // 5.3.3 각 승인 내역을 순회
          for (CustomerApprovals approval : approvals) {
            String categoryCode = approval.getPaymentCategoryCode().getCommonCode();
            String categoryName = approval.getPaymentCategoryCode().getCodeName();
            BigDecimal approvalAmount = BigDecimal.valueOf(approval.getApprovalAmount());

            // 5.3.3.1 해당 거래에 적용 가능한 혜택 한도 가져오기
            List<BenefitLimits> applicableBenefits = benefitLimitsRepository.findApplicableBenefits2(
                cardProduct.getCardProductId(), categoryCode, approvalAmount.intValue());

//            applicableBenefits.sort(Comparator.comparing(BenefitLimits::getBenefitAmount).reversed());

            BigDecimal maxBenefit = BigDecimal.ZERO;
            BenefitLimits bestBenefitLimit = null;

            // 5.3.3.2 적용 가능한 혜택을 순회하여 최대 혜택 계산
            for (BenefitLimits benefitLimit : applicableBenefits) {
              String benefitLimitKey = cardProduct.getCardProductId() + "_" + benefitLimit.getBenefitLimitId();
              BigDecimal usedAmount = benefitUsage.getOrDefault(benefitLimitKey, BigDecimal.ZERO);

              BigDecimal benefitLimitRemaining = benefitLimit.getBenefitLimit() != null
                  ? BigDecimal.valueOf(benefitLimit.getBenefitLimit()).subtract(usedAmount)
                  : null; // 한도 없음

              if (benefitLimitRemaining == null || benefitLimitRemaining.compareTo(BigDecimal.ZERO) > 0) {
                // FIXED 또는 RATE에 따라 잠재적 혜택 계산
                BigDecimal potentialBenefit = BigDecimal.ZERO;

                if ("FIXED".equals(benefitLimit.getFixedOrRateCode().getCommonCode())) {
                  potentialBenefit = BigDecimal.valueOf(benefitLimit.getBenefitAmount());
                  if (benefitLimitRemaining != null) {
                    potentialBenefit = potentialBenefit.min(benefitLimitRemaining);
                  }
                } else if ("RATE".equals(benefitLimit.getFixedOrRateCode().getCommonCode())) {
                  potentialBenefit = approvalAmount.multiply(BigDecimal.valueOf(benefitLimit.getBenefitRate()));
                  if (benefitLimitRemaining != null) {
                    potentialBenefit = potentialBenefit.min(benefitLimitRemaining);
                  }
                }

                // 잠재적 혜택이 최대 혜택보다 큰 경우 업데이트
                if (potentialBenefit.compareTo(maxBenefit) > 0) {
                  maxBenefit = potentialBenefit;
                  bestBenefitLimit = benefitLimit;
                }
              }
            }

            // 5.3.3.3 최대 혜택 적용
            if (maxBenefit.compareTo(BigDecimal.ZERO) > 0) {

              // 총 혜택 금액 업데이트
              totalBenefit = totalBenefit.add(maxBenefit);

              // 혜택 사용량 업데이트
              String benefitLimitKey = cardProduct.getCardProductId() + "_" + Objects.requireNonNull(
                  bestBenefitLimit).getBenefitLimitId();

              BigDecimal usedAmount = benefitUsage.getOrDefault(benefitLimitKey, BigDecimal.ZERO);
              benefitUsage.put(benefitLimitKey, usedAmount.add(maxBenefit));

              // 카테고리별 혜택 금액 업데이트
              BigDecimal categoryBenefit = categoryBenefitMap.getOrDefault(categoryName, BigDecimal.ZERO);
              categoryBenefitMap.put(categoryName, categoryBenefit.add(maxBenefit));
            }
          }

          // 다음 달로 이동
          currentMonthStart = currentMonthEnd;
        }

        // 6. 연회비 차감
        List<AnnualFees> annualFees = annualFeesRepository.findByCardProductId(cardProduct);
        BigDecimal annualFee = annualFees.stream()
            .map(af -> BigDecimal.valueOf(af.getAnnualFeeAmount()))
            .min(BigDecimal::compareTo)
            .orElse(BigDecimal.ZERO);

        totalBenefit = totalBenefit.subtract(annualFee);
        if (totalBenefit.compareTo(BigDecimal.ZERO) < 0) {
          totalBenefit = BigDecimal.ZERO;
        }

        // 7. 피킹률 계산
        BigDecimal totalSpend = totalApprovalAmount.add(annualFee);
        double pickingRate = 0.0;
        if (totalSpend.compareTo(BigDecimal.ZERO) > 0) {
          pickingRate = totalBenefit.divide(totalSpend, MathContext.DECIMAL64)
              .multiply(BigDecimal.valueOf(100))
              .doubleValue();
        }

        // 8. 카드 혜택 요약 생성
        CardBenefitSummary summary = new CardBenefitSummary();
        summary.setCardId(cardProduct.getCardProductId());
        summary.setCardName(cardProduct.getCardName());
        summary.setCardImgUrl(cardProduct.getCardImage());
        summary.setTotalBenefit(totalBenefit);
        summary.setPickingRate(pickingRate);
        summary.setCardApplyUrl(cardProduct.getCardWebsiteLink());
        summary.setAnnualFee(annualFee);
        summary.setCategoryBenefits(categoryBenefitMap);

        // 9. 리스트에 추가
        cardBenefitSummaries.add(summary);
      }

      // 10. 총 혜택 금액을 기준으로 카드 정렬
      cardBenefitSummaries.sort(Comparator.comparing(CardBenefitSummary::getTotalBenefit).reversed());

      // 11. 상위 3개의 카드 선택
      List<CardBenefitSummary> topCards = cardBenefitSummaries.stream().limit(3).toList();

      // 12. 결과 DTO 준비
      List<RecommendCardWithBenefitDTO> result = new ArrayList<>();

      for (CardBenefitSummary cardSummary : topCards) {
        RecommendCardWithBenefitDTO dto = new RecommendCardWithBenefitDTO();
        dto.setCardProductId(cardSummary.getCardId());
        dto.setCardProductName(cardSummary.getCardName());
        dto.setCardProductImgUrl(cardSummary.getCardImgUrl());
        dto.setBenefitAllAmount(cardSummary.getTotalBenefit());
        dto.setPickingRate(cardSummary.getPickingRate());
        dto.setCardApplyUrl(cardSummary.getCardApplyUrl());

        // 12.1 혜택 설명 설정
        List<com.hararo.kopo_final_project.entity.Benefits> benefitsList = benefitsRepository.findByCardProductId_CardProductId(cardSummary.getCardId());
        List<RecommendCardWithBenefitDTO.BenefitsDescription> benefitsDescriptions = benefitsList.stream()
            .map(benefit -> new RecommendCardWithBenefitDTO.BenefitsDescription(benefit.getBenefitSummaryDescription()))
            .collect(Collectors.toList());
        dto.setBenefitsDescriptions(benefitsDescriptions);

        // 12.2 카테고리별 혜택 설정
        List<RecommendCardWithBenefitDTO.Benefits> benefitsPerCategory = cardSummary.getCategoryBenefits().entrySet().stream()
            .map(entry -> {
              String categoryName = entry.getKey();
              BigDecimal benefitAmount = entry.getValue();
              BigDecimal totalAmount = categoryTotalMap.values().stream()
                  .filter(ct -> ct.getCategoryName().equals(categoryName))
                  .map(CategoryTotalDTO::getTotalAmount)
                  .findFirst()
                  .orElse(BigDecimal.ZERO);

              RecommendCardWithBenefitDTO.Benefits benefit = new RecommendCardWithBenefitDTO.Benefits();
              benefit.setBenefitCategoryName(categoryName);
              benefit.setBenefitAmount(benefitAmount);
              benefit.setAmount(totalAmount);
              benefit.setBenefitIcon(ImageSelector(categoryName));
              return benefit;
            })
            .collect(Collectors.toList());
        dto.setBenefits(benefitsPerCategory);

        // 12.3 결과에 추가
        result.add(dto);
      }

      return new ResponseDTO<>(true, "상위 3개의 최적의 카드 혜택이 계산되었습니다.", result);

    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDTO<>(false, "오류 발생: " + e.getMessage(), null);
    }
  }


}
