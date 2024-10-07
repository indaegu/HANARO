package com.hararo.kopo_final_project.controller;

import com.hararo.kopo_final_project.dto.CardProductDTO;
import com.hararo.kopo_final_project.dto.CardProductDetailDTO;
import com.hararo.kopo_final_project.dto.CardTop3Detail;
import com.hararo.kopo_final_project.dto.PopularCardDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.service.CardFindService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/card-find")
public class CardFindController {

  @Autowired
  private CardFindService cardFindService;

  @GetMapping("/popular-card")
  public ResponseEntity<ResponseDTO<List<PopularCardDTO>>> getPopularCardList() {
    ResponseDTO<List<PopularCardDTO>> response = cardFindService.getPopularCardList();
    return ResponseEntity.ok(response);
  }

  // API 요청 처리
  @GetMapping("/all-card-product-cached")
  public ResponseEntity<ResponseDTO<List<CardProductDTO>>> getAllCardProductsWithCache() {
    ResponseDTO<List<CardProductDTO>> response = cardFindService.getAllCardProductWithCache();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/all-card-product-uncached")
  public ResponseEntity<ResponseDTO<List<CardProductDTO>>> getAllCardProductsWithoutCache() {
    ResponseDTO<List<CardProductDTO>> response = cardFindService.getAllCardProductWithoutCache();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/card-product")
  public ResponseEntity<ResponseDTO<CardProductDetailDTO>> getCardProduct(
      @RequestParam(name = "cardId") String cardId) {
    ResponseDTO<CardProductDetailDTO> response = cardFindService.getCardProductDetail(cardId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/card-top3")
  public ResponseEntity<ResponseDTO<CardTop3Detail>> getCardTop3Detail(
      @RequestParam(name = "categoryId") String cardCategory) {
    ResponseDTO<CardTop3Detail> response = cardFindService.getCardTop3Detail(cardCategory);
    return ResponseEntity.ok(response);
  }


}
