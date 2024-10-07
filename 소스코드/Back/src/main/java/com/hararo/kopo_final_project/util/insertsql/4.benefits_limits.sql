-- | CARD-001 : 트래블 GO 체크카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,null,0.011,0,0,0,1,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,null,0.011,0,0,0,2,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.05,499999,10000,200000,3,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.05,499999,10000,200000,3,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.05,499999,200000,1400,3,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.05,9999999999,7000,500000,3,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.05,9999999999,50000,500000,3,'UTILITY','RATE');

-- | CARD-002 :트래블로그 PRESTIGE 신용카드 (항공 마일리지 환산 15원 기준)
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,NULL,0.09,9999999999,0,0,
        'ANY',4,'RATE');
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (500,500,NULL,9999999999,0,0,
        'ANY',7,'FIXED');

-- | CARD-003 :JADE First Centum
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,200000,0.03,9999999999,0,500000,
        'OVERSEAS',10,'RATE');
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,200000,0.03,9999999999,0,500000,
        'AIRLINE',10,'RATE');
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,200000,0.03,9999999999,0,500000,
        'DEPARTMENT',10,'RATE');
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,200000,0.03,9999999999,0,500000,
        'TRAVEL',10,'RATE');
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,100000,0.015,9999999999,0,2000000,
        'ANY',10,'RATE');
INSERT INTO BENEFIT_LIMITS (BENEFIT_AMOUNT, BENEFIT_LIMIT, BENEFIT_RATE, MAXIMUM_RANGE, MINIMUM_PAYMENT_AMOUNT, MINIMUM_RANGE, BENEFIT_AREA_CATEGORY_CODE, BENEFIT_ID, FIXED_OR_RATE_CODE)
VALUES (NULL,30000,0.13,9999999999,0,500000,
        'FUEL',11,'RATE');

-- | CARD-004 : 트래블로그 체크카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,null,0.010,0,
        0,0,12,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,null,0.010,0,
        0,0,13,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,NULL,0.003,9999999999,
        0,0,14,'ANY','RATE');

-- | CARD-005 : JADE Classic
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,9999999999,0.01,9999999999,
        0,0,17,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.015,9999999999,
        0,500000,17,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.015,9999999999,
        0,500000,17,'AIRLINE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.015,9999999999,
        0,500000,17,'TAX-FREE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.015,9999999999,
        0,500000,17,'TRAVEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.012,9999999999,
        0,500000,17,'ONLINE_SHOP','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.012,9999999999,
        0,500000,17,'DEPARTMENT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.012,9999999999,
        0,500000,17,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,100000,0.012,9999999999,
        0,500000,17,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,10000,0.5,9999999999,
        0,500000,17,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.5,9999999999,
        0,500000,17,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,5000,0.5,9999999999,
        0,500000,17,'TAXI','RATE');

-- | CARD-081 : 원더카드 FREE
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.007,9999999999,
        0,0,31,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.02,9999999999,
        0,0,32,'ONLINE_SHOP','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.02,9999999999,
        0,0,32,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.03,9999999999,
        0,0,32,'TRANSIT','RATE');

-- | CARD-006 : 원더카드 T
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,8000,0.02,799999,
        0,400000,18,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,12000,0.02,1199999,
        0,1200000,18,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,15000,0.02,9999999999,
        0,1200000,18,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,4000,0.01,799999,
        0,400000,20,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,8000,0.01,1199999,
        0,800000,20,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,12000,0.01,999999999,
        0,1200000,20,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,4000,0.01,799999,
        0,400000,21,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,8000,0.01,1199999,
        0,800000,21,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,12000,0.01,999999999,
        0,1200000,21,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,4000,0.01,799999,
        0,400000,22,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,8000,0.01,1199999,
        0,800000,22,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,12000,0.01,999999999,
        0,1200000,22,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,4000,0.01,799999,
        0,400000,23,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,8000,0.01,1199999,
        0,800000,23,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,12000,0.01,999999999,
        0,1200000,23,'TAXI','RATE');

-- | CARD-009 : #MY WAY(샵 마이웨이) 카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,3000,NULL,599999,
        300,200000,24,'TRANSIT','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,6000,NULL,999999,
        300,600000,24,'TRANSIT','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,9000,NULL,9999999999,
        300,1000000,24,'TRANSIT','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,3000,NULL,599999,
        300,200000,25,'COFFEE','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,6000,NULL,999999,
        300,600000,25,'COFFEE','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,9000,NULL,9999999999,
        300,1000000,25,'COFFEE','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,3000,NULL,599999,
        300,200000,26,'CONVENIENCE','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,6000,NULL,999999,
        300,600000,26,'CONVENIENCE','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (300,9000,NULL,9999999999,
        300,1000000,26,'CONVENIENCE','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,599999,
        3000,200000,27,'SUBSCRIPTION','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,6000,NULL,999999,
        3000,600000,27,'SUBSCRIPTION','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,9000,NULL,9999999999,
        3000,1000000,27,'SUBSCRIPTION','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,599999,
        3000,200000,28,'FUEL','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,6000,NULL,999999,
        3000,600000,28,'FUEL','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,9000,NULL,9999999999,
        3000,1000000,28,'FUEL','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,599999,
        3000,200000,29,'MART','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,6000,NULL,999999,
        3000,600000,29,'MART','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,9000,NULL,9999999999,
        3000,1000000,29,'MART','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,599999,
        3000,200000,29,'ONLINE_SHOP','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,6000,NULL,999999,
        3000,600000,29,'ONLINE_SHOP','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,9000,NULL,9999999999,
        3000,1000000,29,'ONLINE_SHOP','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,599999,
        30000,200000,29,'DEPARTMENT','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,6000,NULL,999999,
        30000,600000,29,'DEPARTMENT','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,9000,NULL,9999999999,
        30000,1000000,29,'DEPARTMENT','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,599999,
        30000,200000,30,'TELECOM','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,6000,NULL,999999,
        30000,600000,30,'TELECOM','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
        VALUES (3000,9000,NULL,9999999999,
        30000,1000000,30,'TELECOM','FIXED');


-- | CARD-082 원더카드 FREE+
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.008,9999999999,
        0,0,35,'ANY','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.04,799999,
        0,400000,36,'ONLINE_SHOP','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,8000,0.04,1199999,
        0,800000,36,'ONLINE_SHOP','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.04,9999999999,
        0,1200000,36,'ONLINE_SHOP','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.04,799999,
        0,400000,37,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.04,1199999,
        0,800000,37,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.04,9999999999,
        0,1200000,37,'DELIVERY','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.04,799999,
        0,400000,38,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,8000,0.04,1199999,
        0,800000,38,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.04,9999999999,
        0,1200000,38,'TAXI','RATE');

-- | CARD-083 : 원더카드 DAILY
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.1,799999,
        0,400000,39,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.1,1199999,
        0,800000,39,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.1,9999999999,
        0,1200000,39,'DELIVERY','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.1,799999,
        0,400000,40,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,8000,0.1,1199999,
        0,800000,40,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,12000,0.1,9999999999,
        0,1200000,40,'CONVENIENCE','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,8000,0.4,799999,
        0,400000,41,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,12000,0.4,1199999,
        0,800000,41,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,15000,0.4,9999999999,
        0,1200000,41,'SUBSCRIPTION','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.1,799999,
        0,400000,42,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,8000,0.1,1199999,
        0,800000,42,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,12000,0.1,9999999999,
        0,1200000,42,'TAXI','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.1,799999,
        0,400000,43,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,8000,0.1,1199999,
        0,800000,43,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,12000,0.1,9999999999,
        0,1200000,43,'TRANSIT','RATE');

-- | CARD-007 : JADE Prime
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.5,9999999999,
        0,500000,46,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.5,9999999999,
        0,500000,46,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.03,9999999999,
        0,500000,46,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.03,9999999999,
        0,500000,46,'AIRLINE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.03,9999999999,
        0,500000,46,'TAX-FREE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.03,9999999999,
        0,500000,46,'TRAVEL','RATE');

-- | CARD-074 : 달달 하나 체크 카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,47,'DEPARTMENT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,47,'DEPARTMENT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,47,'DEPARTMENT','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,47,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,47,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,47,'MART','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,47,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,47,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,47,'CONVENIENCE','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,48,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,48,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,48,'DELIVERY','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,49,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,49,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,49,'TRANSIT','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,49,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,49,'TAXI','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,49,'TAXI','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,49,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,49,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,49,'FUEL','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        0,300000,50,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        0,700000,50,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        0,1000000,50,'COFFEE','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        30000,300000,51,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        30000,700000,51,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        30000,1000000,51,'TELECOM','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,699999,
        30000,300000,51,'UTILITY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,999999,
        30000,700000,51,'UTILITY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.05,9999999999,
        30000,1000000,51,'UTILITY','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.1,699999,
        0,300000,52,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.1,999999,
        0,700000,52,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.1,9999999999,
        0,1000000,52,'SUBSCRIPTION','RATE');

-- | CARD-059 : Young Hana+ 체크카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,1000,0.05,299999,
        10000,100000,53,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,599999,
        10000,300000,53,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,9999999999,
        10000,600000,53,'CONVENIENCE','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,1000,0.05,299999,
        20000,100000,54,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.05,599999,
        20000,300000,54,'DELIVERY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.05,9999999999,
        20000,600000,54,'DELIVERY','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,1000,0.1,299999,
        0,100000,55,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.1,599999,
        0,300000,55,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.1,9999999999,
        0,600000,55,'TRANSIT','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,1000,0.2,299999,
        10000,100000,56,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,2000,0.2,599999,
        10000,300000,56,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,4000,0.2,9999999999,
        10000,600000,56,'COFFEE','RATE');

-- | CARD-026 : #tag1카드 Orange
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,20000,0.5,9999999999,
        0,300000,57,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.01,9999999999,
        0,300000,58,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (4000,4000,NULL,9999999999,
        10000,300000,59,'MOVIE','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.1,9999999999,
        0,300000,60,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.1,9999999999,
        0,300000,61,'ONLINE_SHOP','RATE');

-- | CARD-024 : My Trip SKYPASS 카드 My flight
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,9999999999,0.01,9999999999,
        0,0,62,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (null,9999999999,0.012,9999999999,
        0,0,62,'OVERSEAS','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (15000,15000,NULL,9999999999,
        0,500000,63,'AIRLINE','FIXED');

-- | CARD-011 : CLUB SK(클럽 SK)카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (5000,5000,null,699999,
        0,400000,64,'TELECOM','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (10000,10000,null,999999,
        0,700000,64,'TELECOM','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (15000,15000,null,9999999999,
        0,1000000,64,'TELECOM','FIXED');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,15000,0.07,699999,
        0,400000,67,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,22000,0.1,9999999999,
        0,700000,67,'FUEL','RATE');

INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.07,9999999999,
        0,400000,66,'TRANSIT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,400000,66,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (3000,3000,NULL,9999999999,
        10000,400000,66,'MOVIE','FIXED');

-- | CARD-010 : #any 하나카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.5,9999999999,
        0,500000,68,'SUBSCRIPTION','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.005,9999999999,
        0,0,68,'ANY','RATE');

-- | CARD-091 : 하나 원큐 카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,100000,0.008,9999999999,
        0,0,70,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.018,9999999999,
        0,0,71,'OVERSEAS','RATE');

-- | CARD-012 : 에너지 더블 카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.1,799999,
        0,400000,72,'UTILITY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,20000,0.1,9999999999,
        0,800000,72,'UTILITY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,400000,73,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,400000,73,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,400000,73,'TRANSIT','RATE');

-- | CARD-116 : 모두의 건강
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.004,9999999999,
        0,0,75,'PHARMACY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.003,9999999999,
        0,0,76,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.002,9999999999,
        0,0,77,'ANY','RATE');

-- | CARD-113 : 신세계 the Mile 하나카드 (항공 마일리지 환산 15원)
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.03,9999999999,
        0,0,78,'DEPARTMENT','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.021,9999999999,
        0,0,78,'ANY','RATE');

-- | CARD-027 : #tag1카드 Navy
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.05,9999999999,
        0,400000,81,'UTILITY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (4000,10000,NULL,9999999999,
        10000,400000,83,'MOVIE','FIXED');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,6000,0.1,9999999999,
        0,400000,83,'TELECOM','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.1,9999999999,
        0,400000,83,'ONLINE_SHOP','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.04,9999999999,
        0,400000,84,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,400000,82,'MART','RATE');

-- | CARD-014 : MULTI Oil 모바일카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,15000,0.1,699999,
        0,400000,85,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,30000,0.1,9999999999,
        0,700000,85,'FUEL','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,400000,82,'COFFEE','RATE');

-- | CARD-029 : 모두의 일상 체크카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.003,9999999999,
        0,0,89,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.004,9999999999,
        0,0,90,'OVERSEAS','RATE');

-- | CARD-032 : VIVA X 체크카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,50000,0.003,9999999999,
        0,300000,93,'ANY','RATE');

-- | CARD-018 : Any PLUS 카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,999999999,0.007,9999999999,
        0,0,94,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,100000,0.017,9999999999,
        0,0,95,'ONLINE_SHOP','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,10000,0.017,9999999999,
        0,0,95,'OVERSEAS','RATE');

-- | CARD-034 : 토스뱅크 신용카드 Wide
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,100000,0.001,399999,
        0,0,97,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,100000,0.002,9999999999,
        0,400000,97,'ANY','RATE');

-- | CARD-127 : 하나멤버스 1Q 체크카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.005,9999999999,
        10000,0,98,'CONVENIENCE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.005,9999999999,
        10000,0,98,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.005,9999999999,
        0,500000,98,'TRANSIT','RATE');

-- | CARD-017 : 하나 스카이패스 아멕스 플래티늄 카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.001,9999999999,
        0,0,100,'ANY','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,9999999999,0.002,9999999999,
        0,500000,100,'OVERSEAS','RATE');

-- | CARD-067 : 하나로마트 하나카드
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,15000,0.1,9999999999,
        0,1000000,102,'MART','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,300000,104,'COFFEE','RATE');
INSERT INTO BENEFIT_LIMITS (benefit_amount, benefit_limit, benefit_rate, maximum_range, minimum_payment_amount, minimum_range, benefit_id, benefit_area_category_code, fixed_or_rate_code)
VALUES (NULL,5000,0.05,9999999999,
        0,600000,105,'TELECOM','RATE');




