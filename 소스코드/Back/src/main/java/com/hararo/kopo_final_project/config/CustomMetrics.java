package com.hararo.kopo_final_project.config;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

@Component
public class CustomMetrics {

  // DB 쿼리 수를 저장하는 AtomicInteger
  private final AtomicInteger dbQueryCount = new AtomicInteger(0);

  // Redis 쿼리 수를 저장하는 AtomicInteger (예시로 추가)
  private final AtomicInteger redisQueryCount = new AtomicInteger(0);

  // 생성자에서 커스텀 메트릭 등록
  public CustomMetrics(MeterRegistry registry) {
    // DB 쿼리 수를 추적하는 게이지 추가
    registry.gauge("custom.db.query.count", dbQueryCount);

    // Redis 쿼리 수를 추적하는 게이지 추가 (필요할 경우)
    registry.gauge("custom.redis.query.count", redisQueryCount);
  }

  // DB 쿼리가 발생할 때 호출할 메서드
  public void incrementDbQueryCount() {
    dbQueryCount.incrementAndGet(); // DB 쿼리 수를 1 증가
  }

  // Redis 쿼리가 발생할 때 호출할 메서드 (필요할 경우)
  public void incrementRedisQueryCount() {
    redisQueryCount.incrementAndGet(); // Redis 쿼리 수를 1 증가
  }
}
