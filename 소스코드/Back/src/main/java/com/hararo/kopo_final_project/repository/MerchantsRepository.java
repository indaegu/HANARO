package com.hararo.kopo_final_project.repository;

import com.hararo.kopo_final_project.entity.CommonCodes;
import com.hararo.kopo_final_project.entity.Merchants;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MerchantsRepository extends JpaRepository<Merchants, Integer> {

  // 기존의 findByLocationWithin1Km 메서드 수정
  @Query("SELECT m FROM Merchants m WHERE " +
          "(m.latitude BETWEEN :latStart AND :latEnd) AND " +
          "(m.longitude BETWEEN :lonStart AND :lonEnd) AND " +
          "(6371 * acos(LEAST(1, GREATEST(-1, " +
          "cos(radians(:latitude)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:longitude)) + " +
          "sin(radians(:latitude)) * sin(radians(m.latitude))" +
          ")))) < 1 " +
          "AND m.latitude IS NOT NULL AND m.longitude IS NOT NULL")
  List<Merchants> findByLocationWithin1Km(
          @Param("latitude") double latitude,
          @Param("longitude") double longitude,
          @Param("latStart") double latStart,
          @Param("latEnd") double latEnd,
          @Param("lonStart") double lonStart,
          @Param("lonEnd") double lonEnd
  );

  // 새로운 메서드: 오프라인 가맹점만 조회 (변경 없음)
  @Query("SELECT m FROM Merchants m WHERE m.latitude IS NOT NULL AND m.longitude IS NOT NULL")
  List<Merchants> findAllOfflineMerchant();

  // null 조건을 추가한 findByCategoryCode_CommonCode 메서드 (변경 없음)
  @Query("SELECT m FROM Merchants m WHERE m.categoryCode.commonCode = :category " +
          "AND m.latitude IS NOT NULL AND m.longitude IS NOT NULL")
  List<Merchants> findByCategoryCode_CommonCode(@Param("category") String category);

  /**
   * 거리 내의 모든 가맹점 조회
   *
   * @param latitude  현재 위도
   * @param longitude 현재 경도
   * @param kmRange   거리(km)
   * @return List<Merchants>
   */
  @Query("SELECT m FROM Merchants m WHERE " +
          "(6371 * acos(LEAST(1, GREATEST(-1, " +
          "cos(radians(:latitude)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:longitude)) + " +
          "sin(radians(:latitude)) * sin(radians(m.latitude))" +
          ")))) <= :kmRange")
  List<Merchants> findMerchantsWithinDistance(
          @Param("latitude") Double latitude,
          @Param("longitude") Double longitude,
          @Param("kmRange") Double kmRange
  );

  /**
   * 거리 내의 특정 카테고리 가맹점 조회
   *
   * @param latitude  현재 위도
   * @param longitude 현재 경도
   * @param kmRange   거리(km)
   * @param category  카테고리 코드
   * @return List<Merchants>
   */
  @Query("SELECT m FROM Merchants m WHERE m.categoryCode.commonCode = :category AND " +
          "(6371 * acos(LEAST(1, GREATEST(-1, " +
          "cos(radians(:latitude)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:longitude)) + " +
          "sin(radians(:latitude)) * sin(radians(m.latitude))" +
          ")))) <= :kmRange")
  List<Merchants> findMerchantsWithinDistanceAndCategory(
          @Param("latitude") Double latitude,
          @Param("longitude") Double longitude,
          @Param("kmRange") Double kmRange,
          @Param("category") String category
  );
}
