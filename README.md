# [하나로] - 카드 혜택 극대화 및 카드 추천 서비스

#### 2024 하나금융티아이 채용연계형 교육 최종프로젝트

[프로젝트 홈페이지](https://hana-ro.site)

# 1. 프로젝트 개요

### 1-1. 프로젝트 기획 배경
![페이지 3 - 판넬 2](https://github.com/user-attachments/assets/471005df-15e3-4777-b251-55069670504d)

- 수익성 개선을 목적으로 카드사들은 고 혜택 카드들을 단종시킴으로서 손님들이 누릴 수 있는 <strong>혜택 감소</strong>

- <strong>1인당 카드 보유량 또한 역대 최고치 </strong>를 달성하면서 카드 혜택 관리에 어려움 증가

- 손님들은 신용카드 선택 시 최우선 고려 사항으로 <strong>부가 서비스 제공 여부</strong>를 1순위로 지목

<span style="font-size: 24px;">&rarr; 손님에게 <strong>편리한 혜택 관리와 최대의 실속</strong>을 제공하는 서비스를 통해 손님 확보</span>

### 1-2. 프로젝트 주요 기능
![페이지 5 - 판넬 3](https://github.com/user-attachments/assets/9df03ece-ee75-4bed-ad7d-26b6a2dd2fb4)

- 스마트 소비 진단 : 최근 결제 내역에 대해서 <strong>최적의 결제 카드와 혜택 금액</strong>을 제안

- 혜택 지도 : 주변 가맹점 중 결제 시 <strong>가장 유리한 카드 제안</strong>

- 소비데이터 기반 카드 추천 : 손님의 지난 12개월 간의 결제 기록을 바탕으로 <strong>손님 맞춤 고혜택 카드를 추천</strong>

- 혜택 및 실적 관리 : 보유한 카드의 혜택과 실적을 한눈에 확인 / 잔여 혜택, 결제 기록, 혜택 구간 확인 가능

- 소득공제 황금비율 : 연소득과 신용카드 및 체크카드의 사용 비율을 기반으로 <strong>소득공제를 최대화할 수 있는 전략 제시</strong>

- 카드 차트 : 다양한 필터와 인기 점수로 카드들의 상세 정보 제공

### 1-3. 서비스 기대효과
![페이지 6 - 판넬 4](https://github.com/user-attachments/assets/c9e624ea-b802-4519-a041-cabb4204ce3f)

# 2. 개발 환경 및 기술적 구현

### 2-1. 개발 환경
![페이지 7](https://github.com/user-attachments/assets/d1799e70-9443-413b-95ea-b2e8241b96d5)

### 2-2. 시스템 아키텍처
![페이지 8 - 판넬 5](https://github.com/user-attachments/assets/b775a7c3-20e3-46de-8396-3b394e355fb6)

| 분류            | OS           | CPU      | RAM | 저장공간 | 비고                         |
| --------------- | ------------ | -------- | --- | -------- | ---------------------------- |
| 하나로 Frontend | Debian12     | vCPU 2개 | 4GB | 15GB     | Nginx                        |
| 하나로 Backend  | Debian12     | vCPU 2개 | 4GB | 15GB     | Spring boot (jar)            |
| 하나로 DB       | Debian12     | vCPU 2개 | 4GB | 30GB     | Docker, Oracle 21c           |
| 마이데이터      | Ubuntu 24.04 | vCPU 2개 | 4GB | 15GB     | Spring boot (war) + tomcat10 |
| 마이데이터 DB   | Debian12     | vCPU 2개 | 4GB | 30GB     | Docker, Oracle 21            |

- <strong>모든 시스템</strong>은 GCP를 이용한 <strong>클라우드 환경</strong>에 배포

- <strong> SSL 인증서</strong> 적용

### 2-3. 주요 응용 기술

#### 2-3-1. 주요 응용 기술 : PL/SQL
![페이지 9 - 판넬 6](https://github.com/user-attachments/assets/025d8eaa-e86e-4101-a4c9-58c7fbd11158)

#### 2-3-2 주요 응용 기술 : Redis
![페이지 10 - 판넬 7](https://github.com/user-attachments/assets/afbb32cd-6ccf-4aeb-8e56-1b1c4083fef3)

#### 2-3-3 주요 응용 기술 : 성능 모니터링 및 부하 테스트 도구
![페이지 11 - 판넬 8](https://github.com/user-attachments/assets/19456ff5-173f-4d0c-bdfc-8e864125b776)

- 시계열 메트릭 수집과 메트릭 시각화를 위해 <strong>Prometheus, Grafana</strong> 사용

#### 2-3-4 주요 응용 기술 : 그 외 활용 기술
![페이지 12](https://github.com/user-attachments/assets/4001edf4-7244-46a9-a4a5-c4c6415e88f2)

# 3. 프로젝트 결과

### 3-1. 사용 시나리오
![페이지 13](https://github.com/user-attachments/assets/3a1e3fdf-d585-460d-ad4c-eb791ba4a2ea)

### 3-2. 발표 ppt
[발표자료<img src="https://github.com/user-attachments/assets/b216a7b0-7e63-4f21-ace3-84c56ef81c3d" />
](/산출물/성창민_하나로.pdf) <br/>

### 3-3. 시연 동영상

<a href="https://">시연 동영상</a><br/>
![image](https://github.com/user-attachments/assets/0362a7c2-b69a-4a3d-b150-b6ed29a446fc)

### 3-4. 성능 모니터링 결과 화면
![스크린샷 2024-10-07 184306](https://github.com/user-attachments/assets/735a6da8-b812-479e-872e-02571a5415d4)


# 4. 본인 소개

| 구분      | 내용                                                                                         | 비고                                       |
| --------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 이름      | 성창민                                                                                       |   <img src="https://github.com/user-attachments/assets/f277dcc5-3ce2-4aca-a751-865dbc0d6bea" width="150px" style="display: block; margin: 0 auto;" >|
| 연락처    | 이메일                                                                                       | scm8572@naver.com                          |
| 전공      | 정보통신공학전공                                                                             | 졸업(2024.02.22)                           |
| Skill set | Language                                                                                     | Java, Javascript, PL/SQL, C++, C, Python   |
|           | Framework & Library                                                                          | Spring, Spring Security, Hibernate, React  |
|           | Database                                                                                     | Oracle, MySQL                              |
|           | Etc                                                                                          | Git, AWS, GCP, Docker, Prometheus, Grafana |
| 자격증    | 정보처리기사                                                                                 | 2023.11.15                                 |
|           | SQLD                                                                                         | 2023.12.15                                 |
|           | 리눅스마스터 2급 (1차)                                                                       | 2023.10.13                                 |
|           | 컴퓨터활용능력 1급                                                                           | 2023.01.27                                 |
| 수상      | ICT 멘토링 한이음 공모전 (한국정보산업협회회장상)                                            | 과학기술정보통신부 (2023.12.07)            |
|           | 프로젝트 최우수상                                                                            | 한국소프트웨어기술진흥협회 (2023.12.29)    |
| 교육      | 하나금융티아이 채용연계형 교육 1200시간 (한국폴리텍대학교 광명융합기술교육원 - 데이터분석과) | 2024.03.04 ~ 2024.10.18 (1200시간)         |
