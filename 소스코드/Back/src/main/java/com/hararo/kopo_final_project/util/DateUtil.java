package com.hararo.kopo_final_project.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.sql.Timestamp;

public class DateUtil {

  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");

  public static Timestamp convertStringToTimestamp(String dateString) {
    LocalDateTime localDateTime = LocalDateTime.parse(dateString, FORMATTER);
    return Timestamp.valueOf(localDateTime);
  }
}
