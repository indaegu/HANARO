package com.hararo.kopo_final_project.repository;
import com.hararo.kopo_final_project.entity.BenefitLimits;
import org.springframework.data.domain.Pageable;

import com.hararo.kopo_final_project.entity.CardProducts;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardProductsRepository extends JpaRepository<CardProducts, String> {
  // cardReleaseDate를 기준으로 가장 최근 10개의 카드를 조회
  @Query("SELECT c FROM CardProducts c ORDER BY c.cardReleaseDate DESC")
  List<CardProducts> findTop10ByOrderByCardReleaseDateDesc(Pageable pageable);

  @Query("SELECT c FROM CardProducts c ORDER BY COALESCE(c.pageView, 0) + COALESCE(c.applyCount, 0) * 10 DESC")
  List<CardProducts> findPopularCards(Pageable pageable);

  // 해당 benefitAreaCategoryCode에 해당하는 카드들 중에서 pageView와 applyCount를 기준으로 정렬하여 상위 3개의 카드를 조회하는 쿼리
  @Query("SELECT cp FROM CardProducts cp WHERE cp.cardProductId IN (" +
          "SELECT b.cardProductId.cardProductId FROM Benefits b WHERE b.benefitId IN (" +
          "SELECT bl.benefitId.benefitId FROM BenefitLimits bl WHERE bl.benefitAreaCategoryCode.commonCode = :cardCategory" +
          ")" +
          ") ORDER BY (COALESCE(cp.pageView, 0) + COALESCE(cp.applyCount, 0) * 10) DESC")
  List<CardProducts> findTopByCategory(@Param("cardCategory") String cardCategory, Pageable pageable);

  @Query("SELECT DISTINCT cp FROM CardProducts cp JOIN FETCH cp.benefits b WHERE b.benefitId IS NOT NULL")
  List<CardProducts> findAllWithBenefits();



}

