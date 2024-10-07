package com.oauth2.oauth2.controller;

import com.oauth2.oauth2.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/oauth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/send")
    public ResponseEntity<String> sendVerificationCode(@RequestParam String phoneNumber) {
        String responseMessage = authService.sendSMS(phoneNumber);
        return ResponseEntity.ok(responseMessage);
    }

    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyCode(@RequestParam String phoneNumber, @RequestParam String code) {
        boolean isVerified = authService.verifyCode(phoneNumber, code);
        System.out.println(isVerified);
        return ResponseEntity.ok(isVerified);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam String phoneNumber,
                                               @RequestParam String name,
                                               @RequestParam String birthDate,
                                               @RequestParam String ci) {
        boolean success = authService.registerUser(phoneNumber, name, birthDate, ci);
        if (success) {
            return ResponseEntity.ok("User registered successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists.");
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestParam String phoneNumber, @RequestParam String ci) {
        boolean isAuthenticated = authService.authenticateUser(phoneNumber, ci);
        System.out.println("CI 값: " + ci);

        Map<String, Object> response = new HashMap<>();
        response.put("isAuthenticated", isAuthenticated);
        response.put("ci", ci); // CI 값을 함께 반환

        return ResponseEntity.ok(response);
    }

}