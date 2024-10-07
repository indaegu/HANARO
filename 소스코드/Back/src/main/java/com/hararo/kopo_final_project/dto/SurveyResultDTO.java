package com.hararo.kopo_final_project.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResultDTO {
    private String resultType; // 결과 타입
    private List<Card> cardList; // 반횐될 카드 데이터
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Card{
        private String cardId;
        private String cardName;
        private String cardImgUrl;
        private String cardDescription;
    }
}
