package com.hararo.kopo_final_project.service;

import com.hararo.kopo_final_project.dto.NewCardDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.entity.CardProducts;
import com.hararo.kopo_final_project.repository.CardProductsRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MainPageService {
  @Autowired
  private CardProductsRepository cardProductsRepository;

  @Cacheable(value = "newCardListCache", key = "'newCardList'")
  public ResponseDTO<List<NewCardDTO>> getNewCardList() {
    Pageable pageable = PageRequest.of(0, 8); // 0번째 페이지에서 10개의 항목을 가져옴
    List<CardProducts> cardProducts = cardProductsRepository.findTop10ByOrderByCardReleaseDateDesc(pageable);

    List<NewCardDTO> newCardList = cardProducts.stream().map(cardProduct ->
        new NewCardDTO(
            cardProduct.getCardProductId(),
            cardProduct.getCardName(),
            cardProduct.getCardImage(),
            cardProduct.getCardDescription()
        )
    ).collect(Collectors.toList());

    return new ResponseDTO<>(true, "성공적으로 신규카드 데이터 응답 완료", newCardList);
  }
}
