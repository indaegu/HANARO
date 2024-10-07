package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.CardProductDTO;
import com.hararo.kopo_final_project.dto.CardProductDetailDTO;

import com.hararo.kopo_final_project.dto.CardTop3Detail;

import com.hararo.kopo_final_project.dto.PopularCardDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.entity.AnnualFees;
import com.hararo.kopo_final_project.entity.Benefits;
import com.hararo.kopo_final_project.entity.CardProducts;
import com.hararo.kopo_final_project.entity.CommonCodes;
import com.hararo.kopo_final_project.entity.UseInstructions;
import com.hararo.kopo_final_project.repository.AnnualFeesRepository;
import com.hararo.kopo_final_project.repository.BenefitLimitsRepository;
import com.hararo.kopo_final_project.repository.BenefitsRepository;
import com.hararo.kopo_final_project.repository.CardProductsRepository;
import com.hararo.kopo_final_project.repository.CommonCodesRepository;
import com.hararo.kopo_final_project.repository.UseInstructionsRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

@Service
public class CardFindService {

  @Autowired
  private CardProductsRepository cardProductsRepository;

  @Autowired
  private AnnualFeesRepository annualFeesRepository;

  @Autowired
  private BenefitLimitsRepository benefitLimitsRepository;

  @Autowired
  private BenefitsRepository benefitsRepository;

  @Autowired
  private UseInstructionsRepository useInstructionsRepository;

  @Autowired
  private CommonCodesRepository commonCodesRepository;

  @Cacheable(value = "popularCardCache", key = "'popularCardList'")
  public ResponseDTO<List<PopularCardDTO>> getPopularCardList() {
    // 상위 10개의 인기 카드만 가져오기
    PageRequest pageable = PageRequest.of(0, 10);
    List<CardProducts> popularCards = cardProductsRepository.findPopularCards(pageable);

    // CardProducts 엔티티를 PopularCardDTO로 매핑
    List<PopularCardDTO> popularCardList = popularCards.stream()
        .map(this::convertToPopularCardDTO)
        .collect(Collectors.toList());

    return new ResponseDTO<>(true, "이달의 인기카드 전송완료", popularCardList);
  }

  private PopularCardDTO convertToPopularCardDTO(CardProducts cardProduct) {
    return PopularCardDTO.builder()
        .cardName(cardProduct.getCardName())
        .cardImgUrl(cardProduct.getCardImage())
        .cardId(cardProduct.getCardProductId())
        .build();
  }



  // 캐시가 적용된 메서드
  @Cacheable(value = "allCardProductCache", key = "'allCardProductList'")
  public ResponseDTO<List<CardProductDTO>> getAllCardProductWithCache() {
    List<CardProducts> cardProductsList = cardProductsRepository.findAll();

    List<CardProductDTO> cardProductDTOList = cardProductsList.stream()
            .sorted(Comparator.comparing(CardProducts::getCardProductId))
            .map(cardProduct -> new CardProductDTO(
                    cardProduct.getCardName(),
                    cardProduct.getCardProductId(),
                    cardProduct.getCardDescription(),
                    cardProduct.getCardImage()
            )).collect(Collectors.toList());

    return new ResponseDTO<>(true, "모든 카드 데이터를 성공적으로 조회했습니다.", cardProductDTOList);
  }

  // 캐시를 사용하지 않는 메서드
  public ResponseDTO<List<CardProductDTO>> getAllCardProductWithoutCache() {
    List<CardProducts> cardProductsList = cardProductsRepository.findAll();

    List<CardProductDTO> cardProductDTOList = cardProductsList.stream()
            .sorted(Comparator.comparing(CardProducts::getCardProductId))
            .map(cardProduct -> new CardProductDTO(
                    cardProduct.getCardName(),
                    cardProduct.getCardProductId(),
                    cardProduct.getCardDescription(),
                    cardProduct.getCardImage()
            )).collect(Collectors.toList());

    return new ResponseDTO<>(true, "모든 카드 데이터를 성공적으로 조회했습니다.", cardProductDTOList);
  }



  @Cacheable(value = "cardProductDetailCache", key = "#cardId")
  public ResponseDTO<CardProductDetailDTO> getCardProductDetail(String cardId) {
    // CardProducts 엔티티 조회
    CardProducts cardProduct = cardProductsRepository.findById(cardId)
        .orElseThrow(() -> new ResourceAccessException("Card Product not found with id " + cardId));

    // pageView 1 증가
    cardProduct.setPageView(cardProduct.getPageView() != null ? cardProduct.getPageView() + 1 : 1);

    // 변경된 pageView 값을 DB에 저장
    cardProductsRepository.save(cardProduct);

    // AnnualFees 리스트 조회
    List<AnnualFees> annualFees = annualFeesRepository.findByCardProductId(cardProduct);
    List<CardProductDetailDTO.AnnulFee> annualFeeList = annualFees.stream()
        .map(fee -> new CardProductDetailDTO.AnnulFee(fee.getAnnualFeeDescription()))
        .collect(Collectors.toList());

    // Benefits 리스트 조회
    List<Benefits> benefits = benefitsRepository.findByCardProductId(cardProduct);
    List<CardProductDetailDTO.MajorBenefit> majorBenefitList = benefits.stream()
        .map(benefit -> new CardProductDetailDTO.MajorBenefit(
            benefit.getBenefitName(),
            benefit.getBenefitSummaryDescription(),
            benefit.getBenefitSummaryIconImgUrl()))
        .collect(Collectors.toList());

    List<CardProductDetailDTO.DetailBenefit> detailedBenefitList = benefits.stream()
        .map(benefit -> new CardProductDetailDTO.DetailBenefit(
            benefit.getBenefitName(),
            benefit.getBenefitDetailDescription(),
            benefit.getBenefitDetailIconImgUrl()))
        .collect(Collectors.toList());

    // UseInstructions 리스트 조회
    List<UseInstructions> useInstructionList = useInstructionsRepository.findByCardProductId(cardProduct);
    List<CardProductDetailDTO.UseInstruction> useInstructions = useInstructionList.stream()
        .map(useInstruction -> new CardProductDetailDTO.UseInstruction(
            useInstruction.getUseInstructionTitle(),
            useInstruction.getUseInstructionDescription()
        )).toList();

    // CardProductDetailDTO 생성 및 데이터 매핑
    CardProductDetailDTO cardProductDetailDTO = CardProductDetailDTO.builder()
        .cardImgUrl(cardProduct.getCardImage())
        .cardName(cardProduct.getCardName())
        .cardDescription(cardProduct.getCardDescription())
        .cardProductPdfUrl(cardProduct.getCardPdfUrl())
        .cardApplyUrl(cardProduct.getCardWebsiteLink())
        .cardReleaseDate(cardProduct.getCardReleaseDate())
        .complianceReview(cardProduct.getComplianceReview())
        .annualFeeList(annualFeeList)
        .majorBenefitList(majorBenefitList)
        .detailedBenefitList(detailedBenefitList)
        .useInstructionList(useInstructions)
        .build();

    return new ResponseDTO<>(true, "카드 상품의 상세 데이터를 조회했습니다.", cardProductDetailDTO);
  }


  public ResponseDTO<CardTop3Detail> getCardTop3Detail(String cardCategory) {
    // 해당 카테고리에 맞는 상위 3개의 카드를 조회
    Pageable pageable = PageRequest.of(0, 3); // 첫 번째 페이지에서 3개의 결과만 가져오기
    System.out.println("들어온 카테고리 이름 : " + cardCategory);
    List<CardProducts> top5Cards = cardProductsRepository.findTopByCategory(cardCategory, pageable);
    CommonCodes category = commonCodesRepository.findCommonCodesByCommonCode(cardCategory);

    if (top5Cards.isEmpty()) {
      return new ResponseDTO<>(false, "해당 카테고리에 대한 카드 정보를 찾을 수 없습니다.", null);
    }

    // DTO로 반환할 리스트를 구성
    List<CardTop3Detail.CardDetail> cardDetailList = new ArrayList<>();

    for (CardProducts cardProduct : top5Cards) {
      // 각 카드에 해당하는 혜택 정보 구성
      List<CardTop3Detail.CardDetail.CardBenefit> benefitList = new ArrayList<>();


      // 카드에 연결된 여러 Benefits를 순회
      for (Benefits benefit : benefitsRepository.findByCardProductId(cardProduct)) {
        benefitList.add(new CardTop3Detail.CardDetail.CardBenefit(benefit.getBenefitName()));
      }
      int point = (cardProduct.getPageView() != null ? cardProduct.getPageView() : 0)
          + (cardProduct.getApplyCount() != null ? cardProduct.getApplyCount() * 10 : 0);

      // 카드 상세 정보 구성
      CardTop3Detail.CardDetail cardDetail = new CardTop3Detail.CardDetail(
          benefitList,
          cardProduct.getCardName(),
          point, // 포인트는 pageView와 applyCount로 계산
          cardProduct.getCardImage()
      );
      cardDetailList.add(cardDetail);
    }

    // 최종 DTO 구성
    CardTop3Detail cardTop3Detail = new CardTop3Detail(category.getCodeName(), cardDetailList);

    // 성공적으로 조회되었다는 응답 메시지와 함께 DTO 반환
    return new ResponseDTO<>(true, "성공적으로 카드 TOP3 데이터를 조회했습니다.", cardTop3Detail);
  }


}
