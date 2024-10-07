package com.hararo.kopo_final_project.requestdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BenefitMapRecommendCardRequestDTO {
    private String token;
    private String userId;
    private String storeId;
    private String storeCategory;
}
