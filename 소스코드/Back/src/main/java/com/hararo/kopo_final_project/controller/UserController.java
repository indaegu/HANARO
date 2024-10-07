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
//@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 서버 주소
@RestController
public class UserController {

  @Autowired
  private UserService userService;

//  @PostMapping("/login")
//  public ResponseEntity<?> login(@RequestBody UserLoginRequestDTO request) {
//    if (userService.validateUser(request.getUserId(), request.getPassword())) {
//      return ResponseEntity.ok().body(new Object() {
//        public final boolean success = true;
//        public final String message = "로그인 성공";
//        public final Object data = new Object() {
//          public final Object user = userService.getUserDetails(request.getUserId());
//          public final String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
//        };
//      });
//    } else {
//      return ResponseEntity.status(401).body(new Object() {
//        public final boolean success = false;
//        public final String message = "로그인 실패";
//      });
//    }
//  }
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody UserLoginRequestDTO request) {
    String response = userService.validateUser(request.getUserId(), request.getPassword());
    return ResponseEntity.ok(response);
  }

//  @PostMapping("/sign-up")
//  public ResponseEntity<?> signUp(@RequestBody UserLoginRequestDTO request) {
//
//  }

}
