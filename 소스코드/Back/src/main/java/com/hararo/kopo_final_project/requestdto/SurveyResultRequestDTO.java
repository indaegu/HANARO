package com.hararo.kopo_final_project.requestdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyResultRequestDTO {

    private String userId;
    private List<String> answers; // 또는 적절한 타입으로 수정
    private String finalType;

}
