package com.hararo.kopo_final_project.controller;


import com.hararo.kopo_final_project.requestdto.UserLoginRequestDTO;
import com.hararo.kopo_final_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody UserLoginRequestDTO request) {
    String response = userService.validateUser(request.getUserId(), request.getPassword());
    return ResponseEntity.ok(response);
  }

}
