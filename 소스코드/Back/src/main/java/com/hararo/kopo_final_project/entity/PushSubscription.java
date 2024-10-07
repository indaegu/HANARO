package com.hararo.kopo_final_project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PushSubscription {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String endpoint;
  private String p256dh;
  private String auth;

  // Getter와 Setter
  public Long getId() {
    return id;
  }

  public String getEndpoint() {
    return endpoint;
  }

  public String getP256dh() {
    return p256dh;
  }

  public String getAuth() {
    return auth;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setEndpoint(String endpoint) {
    this.endpoint = endpoint;
  }

  public void setP256dh(String p256dh) {
    this.p256dh = p256dh;
  }

  public void setAuth(String auth) {
    this.auth = auth;
  }
}

