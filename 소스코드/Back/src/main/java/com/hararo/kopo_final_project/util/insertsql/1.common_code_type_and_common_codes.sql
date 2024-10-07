-- COMMON_CODE_TYPES 테이블에 데이터 삽입
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('GENDER', '성별 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('CUSTOMER_STATUS', '사용자 상태 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('CARD_STATUS', '카드 상태 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('CARD_TYPE', '카드 유형 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('APPROVAL_STATUS', '승인 상태 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('PAYMENT_CATEGORY', '결제 카테고리 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('BENEFIT_TYPE', '혜택 유형 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('FIXED_OR_RATE', '고정 또는 비율 코드');
INSERT INTO COMMON_CODE_TYPES (COMMON_CODE_TYPE_ID, COMMON_CODE_TYPE_NAME) VALUES ('MERCHANT_CATEGORY', '가맹점 카테고리 코드');

-- COMMON_CODES 테이블에 데이터 삽입
-- 성별 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('M', '남성', 'GENDER');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('F', '여성', 'GENDER');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('U', '미상', 'GENDER');

-- 카드 상태 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('ACTIVE', '활성화', 'CARD_STATUS');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('INACTIVE', '비활성화', 'CARD_STATUS');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('EXPIRED', '만료됨', 'CARD_STATUS');

-- 사용자 상태 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('NORMAL', '정상', 'CUSTOMER_STATUS');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('BANNED', '정지됨', 'CUSTOMER_STATUS');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('PENDDING', '보류중', 'CUSTOMER_STATUS');


-- 카드 유형 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('CREDIT', '신용카드', 'CARD_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('DEBIT', '체크카드', 'CARD_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('PREPAID', '선불카드', 'CARD_TYPE');

-- 승인 상태 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('APPROVED', '승인됨', 'APPROVAL_STATUS');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('PENDING', '승인 대기', 'APPROVAL_STATUS');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('DECLINED', '거절됨', 'APPROVAL_STATUS');

-- 결제 카테고리 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('FUEL', '주유', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('TAXI', '택시', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('TRANSIT', '대중교통', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('MART', '마트', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('ONLINE_SHOP', '온라인쇼핑', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('DEPARTMENT', '백화점', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('TRAVEL', '여행', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('OVERSEAS', '해외결제', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('AIRLINE', '항공', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('MOVIE', '영화', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('COFFEE', '커피', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('TELECOM', '통신', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('SUBSCRIPTION', '구독', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('ANY', '조건없음', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('CONVENIENCE', '편의점', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('UTILITY', '공과금', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('PHARMACY', '의료', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('DELIVERY', '딜리버리', 'PAYMENT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('TAX-FREE', '면세', 'PAYMENT_CATEGORY');

-- 혜택 유형 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('CASHBACK', '캐쉬백', 'BENEFIT_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('DISCOUNT', '할인', 'BENEFIT_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('POINTS', '하나머니 적립', 'BENEFIT_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('VOUCHER', '바우처 제공', 'BENEFIT_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('TAX_FREE', '수수료면제', 'BENEFIT_TYPE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('ETC', '기타', 'BENEFIT_TYPE');

-- 고정 또는 비율 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('FIXED', '고정 금액', 'FIXED_OR_RATE');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('RATE', '비율', 'FIXED_OR_RATE');

-- 가맹점 카테고리 코드
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('CAFE', '카페', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('MART_MERCHANT', '마트', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('RESTAURANT', '음식점', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('PHARMACY_MERCHANT', '약국', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('HOSPITAL', '병원', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('CONVENIENCE_MERCHANT', '편의점', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('FUEL_MERCHANT', '주유소', 'MERCHANT_CATEGORY');
INSERT INTO COMMON_CODES (COMMON_CODE, CODE_NAME, COMMON_CODE_TYPE_ID) VALUES ('BANK', '은행', 'MERCHANT_CATEGORY');
