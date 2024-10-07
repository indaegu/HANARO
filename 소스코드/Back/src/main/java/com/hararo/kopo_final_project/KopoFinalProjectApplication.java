package com.hararo.kopo_final_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class KopoFinalProjectApplication {
  public static void main(String[] args) {
    SpringApplication.run(KopoFinalProjectApplication.class, args);
  }

}
