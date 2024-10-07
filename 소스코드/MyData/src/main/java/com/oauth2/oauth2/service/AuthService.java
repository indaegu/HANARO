package com.oauth2.oauth2.service;


import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import com.oauth2.oauth2.entity.UserInfo;
import com.oauth2.oauth2.repository.UserRepository;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Value("${coolsms.apikey}")
    private String apiKey;

    @Value("${coolsms.apisecret}")
    private String apiSecret;

    @Value("${coolsms.fromnumber}")
    private String fromNumber;

    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();


    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 인증번호 전송하기
    public String sendSMS(String phoneNumber) {
        Message coolsms = new Message(apiKey, apiSecret);
        String randomNum = createRandomNumber();
        System.out.println("Generated Random Number: " + randomNum);
        HashMap<String, String> params = makeParams(phoneNumber, randomNum);

        try {
            coolsms.send(params);
            verificationCodes.put(phoneNumber, randomNum);
        } catch (CoolsmsException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Code: " + e.getCode());
            return "문자 전송 실패: " + e.getMessage();
        }

        return "문자 전송이 완료되었습니다.";
    }

    private String createRandomNumber() {
        Random rand = new Random();
        StringBuilder randomNum = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            String random = Integer.toString(rand.nextInt(10));
            randomNum.append(random);
        }
        return randomNum.toString();
    }

    private HashMap<String, String> makeParams(String to, String randomNum) {
        HashMap<String, String> params = new HashMap<>();
        params.put("from", fromNumber);
        params.put("type", "SMS");
        params.put("app_version", "test app 1.2");
        params.put("to", to);
        params.put("text", "Your verification code is: " + randomNum);
        return params;
    }

    public boolean verifyCode(String phoneNumber, String code) {
        String storedCode = verificationCodes.get(phoneNumber);
        System.out.println("storeCode : " + storedCode);
        System.out.println("code : " + code);
        return storedCode != null && storedCode.equals(code);
    }


    public boolean registerUser(String phoneNumber, String name, String birthDate, String ci) {
        // CI를 기준으로 사용자 정보가 이미 존재하는지 확인
        UserInfo existingUserInfo = userRepository.findById(ci).orElse(null);
        if (existingUserInfo != null) {
            return false; // 이미 사용자가 존재하면 false 반환
        }

        // 새로운 사용자 등록
        UserInfo newUserInfo = new UserInfo();
        newUserInfo.setCi(ci);  // CI를 기본 키로 사용
        newUserInfo.setUsername(phoneNumber);
        newUserInfo.setName(name);

        // 비밀번호를 해시로 저장 (예: 주민등록번호의 해시)
        String encodedPassword = passwordEncoder.encode(birthDate); // 단순 예시
        newUserInfo.setPassword(encodedPassword);

        userRepository.save(newUserInfo);
        return true;
    }

    public boolean authenticateUser(String phoneNumber, String ci) {
        System.out.println("CI 값 : " + ci);
        UserInfo userInfo = userRepository.findById(ci).orElse(null);
        System.out.println(userInfo);
        // 사용자 존재 여부 및 CI 정보 검증
        if (userInfo != null) {
            return true; // 인증 성공
        }
        return false; // 인증 실패
    }
}