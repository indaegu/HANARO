package com.hararo.kopo_final_project.controller;

import com.hararo.kopo_final_project.dto.BenefitMapRecommendCardsDTO;
import com.hararo.kopo_final_project.dto.ResponseDTO;
import com.hararo.kopo_final_project.dto.StoreMarkerDTO;
import com.hararo.kopo_final_project.requestdto.BenefitMapRecommendCardRequestDTO;
import com.hararo.kopo_final_project.requestdto.StoreMarkerFilterRequestDTO;
import com.hararo.kopo_final_project.requestdto.StoreMarkerRequestDTO;
import com.hararo.kopo_final_project.service.BenefitMapService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/benefit-map")
public class BenefitMapController {

    @Autowired
    private BenefitMapService benefitMapService;

    @PostMapping("/map")
    public ResponseEntity<ResponseDTO<List<StoreMarkerDTO>>> getStoreMarkers(@RequestBody StoreMarkerRequestDTO request) {
        ResponseDTO<List<StoreMarkerDTO>> response = benefitMapService.getStoreMarkers(request.getLatitude(), request.getLongitude(), request.getDistance(), request.getCategory() );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/1km")
    public ResponseEntity<ResponseDTO<List<StoreMarkerDTO>>> get1kmStoreMarker(@RequestBody
                                                                               StoreMarkerRequestDTO request) {
        ResponseDTO<List<StoreMarkerDTO>> response = benefitMapService.get1kmStoreMarker(request.getLatitude(), request.getLongitude());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/all")
    public ResponseEntity<ResponseDTO<List<StoreMarkerDTO>>> getAllStoreMarkers(@RequestBody StoreMarkerRequestDTO request) {
        ResponseDTO<List<StoreMarkerDTO>> response = benefitMapService.getAllStoreMarker(
                request.getLatitude(), request.getLongitude());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/filter")
    public ResponseEntity<ResponseDTO<List<StoreMarkerDTO>>> getFilteredStoreMarkers(@RequestBody StoreMarkerFilterRequestDTO request) {
        ResponseDTO<List<StoreMarkerDTO>> response = benefitMapService.getStoresByCategory(request.getLatitude(), request.getLongitude(), request.getCategory());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recommend-card")
    public ResponseEntity<ResponseDTO<BenefitMapRecommendCardsDTO>> getRecommendCards(@RequestBody BenefitMapRecommendCardRequestDTO request){
        ResponseDTO<BenefitMapRecommendCardsDTO> response = benefitMapService.getRecommendCards(request.getUserId(), request.getStoreId(), request.getStoreCategory());
        return ResponseEntity.ok(response);
    }
}
