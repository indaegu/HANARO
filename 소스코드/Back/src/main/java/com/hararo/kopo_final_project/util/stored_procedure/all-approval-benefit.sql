CREATE OR REPLACE PROCEDURE simulate_best_cards_for_all_payments(
    p_user_id                        IN VARCHAR2,    -- 입력 받을 사용자 ID
    o_card1_id                       OUT VARCHAR2,   -- 가장 좋은 혜택의 카드 1 상품 ID
    o_card1_name                     OUT VARCHAR2,   -- 가장 좋은 혜택의 카드 1 이름
    o_card1_img_url                  OUT VARCHAR2,   -- 가장 좋은 혜택의 카드 1 이미지 URL
    o_card1_benefit_all_amount       OUT NUMBER,     -- 가장 좋은 혜택의 카드 1 총 혜택 금액 (연회비 고려)
    o_card1_picking_rate             OUT NUMBER,     -- 가장 좋은 혜택의 카드 1 피킹률 (연회비 고려)
    o_card1_card_apply_url           OUT VARCHAR2,   -- 가장 좋은 혜택의 카드 1 카드 신청 URL
    o_benefit_cursor1                OUT SYS_REFCURSOR, -- 카드 1 혜택의 카테고리 리스트 커서
    o_benefit_description_cursor1    OUT SYS_REFCURSOR, -- 카드 1 혜택 설명 리스트 커서
    o_card2_id                       OUT VARCHAR2,   -- 두 번째로 좋은 혜택의 카드 2 상품 ID
    o_card2_name                     OUT VARCHAR2,   -- 두 번째로 좋은 혜택의 카드 2 이름
    o_card2_img_url                  OUT VARCHAR2,   -- 두 번째로 좋은 혜택의 카드 2 이미지 URL
    o_card2_benefit_all_amount       OUT NUMBER,     -- 두 번째로 좋은 혜택의 카드 2 총 혜택 금액 (연회비 고려)
    o_card2_picking_rate             OUT NUMBER,     -- 두 번째로 좋은 혜택의 카드 2 피킹률 (연회비 고려)
    o_card2_card_apply_url           OUT VARCHAR2,   -- 두 번째로 좋은 혜택의 카드 2 카드 신청 URL
    o_benefit_cursor2                OUT SYS_REFCURSOR, -- 카드 2 혜택의 카테고리 리스트 커서
    o_benefit_description_cursor2    OUT SYS_REFCURSOR, -- 카드 2 혜택 설명 리스트 커서
    o_card3_id                       OUT VARCHAR2,   -- 세 번째로 좋은 혜택의 카드 3 상품 ID
    o_card3_name                     OUT VARCHAR2,   -- 세 번째로 좋은 혜택의 카드 3 이름
    o_card3_img_url                  OUT VARCHAR2,   -- 세 번째로 좋은 혜택의 카드 3 이미지 URL
    o_card3_benefit_all_amount       OUT NUMBER,     -- 세 번째로 좋은 혜택의 카드 3 총 혜택 금액 (연회비 고려)
    o_card3_picking_rate             OUT NUMBER,     -- 세 번째로 좋은 혜택의 카드 3 피킹률 (연회비 고려)
    o_card3_card_apply_url           OUT VARCHAR2,   -- 세 번째로 좋은 혜택의 카드 3 카드 신청 URL
    o_benefit_cursor3                OUT SYS_REFCURSOR, -- 카드 3 혜택의 카테고리 리스트 커서
    o_benefit_description_cursor3    OUT SYS_REFCURSOR  -- 카드 3 혜택 설명 리스트 커서
) AS
    -- 필요한 변수 선언
    v_total_approval_amount        NUMBER := 0; -- 사용자의 총 결제 금액을 저장할 변수

    -- 카드별 혜택 정보를 저장할 레코드 타입 정의
    TYPE card_benefit_summary_record IS RECORD (
                                                   card_id            VARCHAR2(255),  -- 카드 ID
                                                   card_name          VARCHAR2(255),  -- 카드 이름
                                                   card_img_url       VARCHAR2(500),  -- 카드 이미지 URL
                                                   total_benefit      NUMBER,         -- 총 혜택 금액 (연회비 고려)
                                                   picking_rate       NUMBER,         -- 피킹률 (연회비 고려)
                                                   card_apply_url     VARCHAR2(500),  -- 카드 신청 URL
                                                   annual_fee         NUMBER          -- 카드의 최소 연회비
                                               );

    -- 카드 혜택 정보를 저장할 테이블 타입 정의
    TYPE card_benefit_summary_table_type IS TABLE OF card_benefit_summary_record;

    -- 카드 혜택 정보를 저장할 변수들
    v_card_benefit_summary_table   card_benefit_summary_table_type := card_benefit_summary_table_type(); -- 모든 카드의 혜택 정보
    v_top_cards                    card_benefit_summary_table_type := card_benefit_summary_table_type(); -- 상위 3개의 카드 정보

    -- 혜택 사용량을 관리하기 위한 레코드 타입 정의
    TYPE benefit_usage_record IS RECORD (
                                            card_id          VARCHAR2(255), -- 카드 ID
                                            benefit_id       NUMBER,        -- 혜택 ID
                                            benefit_limit_id NUMBER,        -- 혜택 한도 ID
                                            used_amount      NUMBER         -- 사용된 혜택 금액
                                        );

    -- 혜택 사용량을 저장할 테이블 타입 정의 (인덱스는 VARCHAR2 타입)
    TYPE benefit_usage_table IS TABLE OF benefit_usage_record INDEX BY VARCHAR2(50);

    -- 혜택 계산에 필요한 변수들
    v_current_benefit        NUMBER := 0; -- 현재 거래에서 계산된 혜택 금액
    v_total_benefit          NUMBER := 0; -- 현재 카드에서 누적된 총 혜택 금액
    v_picking_rate           NUMBER := 0; -- 피킹률 계산을 위한 변수

    -- 혜택 사용량 관리 변수들
    v_benefit_limit_key       VARCHAR2(50); -- 혜택 한도를 구분하기 위한 키
    v_benefit_limit_remaining NUMBER;       -- 남은 혜택 한도
    v_used_amount             NUMBER;       -- 이미 사용된 혜택 금액

    -- 연회비 관련 변수
    v_annual_fee              NUMBER;       -- 최소 연회비

    -- 날짜 관련 변수들
    start_date                DATE;         -- 분석 시작 날짜 (12개월 전)
    end_date                  DATE;         -- 분석 종료 날짜 (현재 날짜)
    current_month_start       DATE;         -- 현재 처리 중인 월의 시작 날짜
    current_month_end         DATE;         -- 현재 처리 중인 월의 종료 날짜
    v_months_ago              NUMBER;       -- 몇 개월 전인지 계산하기 위한 변수

BEGIN
    DBMS_OUTPUT.PUT_LINE('Procedure started for user_id: ' || p_user_id);

    -- 1. 임시 테이블 데이터 삭제 (초기화)
    DELETE FROM DEVELOPER.TEMP_BENEFIT_TABLE;
    DELETE FROM DEVELOPER.TEMP_CATEGORY_TOTALS;

    -- 2. 사용자의 지난 12개월 총 결제 금액 계산
    SELECT NVL(SUM(ca.approval_amount), 0)
    INTO v_total_approval_amount
    FROM customer_approvals ca
             JOIN customer_cards cc ON ca.CUSTOMER_CARD_ID = cc.CUSTOMER_CARD_ID
    WHERE cc.CUSTOMER_ID = p_user_id
      AND ca.approval_date >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -12);

    DBMS_OUTPUT.PUT_LINE('Total approval amount (last 12 months): ' || v_total_approval_amount);

    -- 3. 카테고리별 총 결제 금액 계산 및 TEMP_CATEGORY_TOTALS 테이블에 저장
    INSERT INTO DEVELOPER.TEMP_CATEGORY_TOTALS (CATEGORY_CODE, CATEGORY_NAME, TOTAL_AMOUNT)
    SELECT ca.PAYMENT_CATEGORY_CODE,
           cc.CODE_NAME AS CATEGORY_NAME,
           SUM(ca.approval_amount) AS TOTAL_AMOUNT
    FROM customer_approvals ca
             JOIN customer_cards cc_card ON ca.CUSTOMER_CARD_ID = cc_card.CUSTOMER_CARD_ID
             JOIN common_codes cc ON ca.PAYMENT_CATEGORY_CODE = cc.COMMON_CODE
    WHERE cc_card.CUSTOMER_ID = p_user_id
      AND ca.approval_date >= ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -12)
    GROUP BY ca.PAYMENT_CATEGORY_CODE, cc.CODE_NAME;

    -- 분석 기간 설정 (지난 12개월)
    start_date := ADD_MONTHS(TRUNC(SYSDATE, 'MM'), -12); -- 12개월 전 월의 첫 날
    end_date := ADD_MONTHS(TRUNC(SYSDATE, 'MM'), 1); -- 다음 달의 첫 날

    -- 4. 모든 카드 상품을 순회하며 혜택 계산 시작
    FOR card_rec IN (
        SELECT DISTINCT cp.CARD_PRODUCT_ID,  -- 카드 상품 ID
                        cp.card_name,        -- 카드 이름
                        cp.card_image,       -- 카드 이미지 URL
                        cp.card_website_link -- 카드 신청 URL
        FROM card_products cp
                 JOIN benefits b ON cp.CARD_PRODUCT_ID = b.CARD_PRODUCT_ID
        WHERE EXISTS (
            SELECT 1 FROM benefits b_inner WHERE b_inner.CARD_PRODUCT_ID = cp.CARD_PRODUCT_ID
        )
        )
        LOOP
            -- 5. 카드별 총 혜택 금액 초기화
            v_total_benefit := 0;

            DBMS_OUTPUT.PUT_LINE('Calculating benefits for card_id: ' || card_rec.CARD_PRODUCT_ID);

            -- 6. 지난 12개월을 월별로 순회
            current_month_start := start_date;

            WHILE current_month_start < end_date LOOP
                    current_month_end := ADD_MONTHS(current_month_start, 1); -- 다음 달의 첫 날

                    DBMS_OUTPUT.PUT_LINE('Processing month starting from: ' || TO_CHAR(current_month_start, 'YYYY-MM-DD'));

                    -- 혜택 사용량 초기화 (매월)
                    DECLARE
                        v_benefit_usage  benefit_usage_table := benefit_usage_table(); -- 혜택 사용량을 저장할 변수 (매월 초기화)
                    BEGIN
                        -- 7. 해당 월의 사용자의 결제 내역을 순회하며 혜택 계산
                        FOR payment_rec IN (
                            SELECT ca.approval_number,         -- 거래 고유 식별자
                                   ca.approval_amount,         -- 거래 금액
                                   ca.PAYMENT_CATEGORY_CODE    -- 거래 카테고리 코드
                            FROM customer_approvals ca
                                     JOIN customer_cards cc ON ca.CUSTOMER_CARD_ID = cc.CUSTOMER_CARD_ID
                            WHERE cc.CUSTOMER_ID = p_user_id
                              AND ca.approval_date >= current_month_start
                              AND ca.approval_date < current_month_end
                            )
                            LOOP
                                DBMS_OUTPUT.PUT_LINE('Processing approval_number: ' || payment_rec.approval_number ||
                                                     ', amount: ' || payment_rec.approval_amount ||
                                                     ', category_code: ' || payment_rec.PAYMENT_CATEGORY_CODE);

                                -- 8. 해당 거래에 적용 가능한 혜택 한도를 가져옴
                                DECLARE
                                    TYPE benefit_limit_rec_type IS RECORD (
                                                                              BENEFIT_LIMIT_ID NUMBER,                  -- 혜택 한도 ID
                                                                              benefit_amount NUMBER,                    -- 혜택 금액 (고정 금액일 경우)
                                                                              benefit_rate NUMBER,                      -- 혜택 비율 (비율일 경우)
                                                                              benefit_limit NUMBER,                     -- 혜택 한도 금액
                                                                              BENEFIT_AREA_CATEGORY_CODE VARCHAR2(255), -- 혜택 적용 카테고리 코드
                                                                              FIXED_OR_RATE_CODE VARCHAR2(255),         -- 혜택 방식 ('FIXED' 또는 'RATE')
                                                                              MINIMUM_PAYMENT_AMOUNT NUMBER,            -- 최소 결제 금액
                                                                              BENEFIT_ID NUMBER                         -- 혜택 ID
                                                                          );
                                    TYPE benefit_limit_table_type IS TABLE OF benefit_limit_rec_type;
                                    v_applicable_benefits benefit_limit_table_type := benefit_limit_table_type(); -- 적용 가능한 혜택 리스트
                                    v_max_benefit NUMBER := 0;                       -- 최대 혜택 금액
                                    v_best_benefit_rec benefit_limit_rec_type;       -- 최대 혜택을 제공하는 혜택 레코드
                                    v_potential_benefit NUMBER;                      -- 잠재적 혜택 금액
                                BEGIN
                                    -- 9. 적용 가능한 혜택 한도를 BULK COLLECT로 가져옴
                                    SELECT bl.BENEFIT_LIMIT_ID,
                                           bl.benefit_amount,
                                           bl.benefit_rate,
                                           bl.benefit_limit,
                                           bl.BENEFIT_AREA_CATEGORY_CODE,
                                           bl.FIXED_OR_RATE_CODE,
                                           bl.MINIMUM_PAYMENT_AMOUNT,
                                           bl.BENEFIT_ID
                                            BULK COLLECT INTO v_applicable_benefits
                                    FROM benefit_limits bl
                                    WHERE bl.BENEFIT_ID IN (
                                        SELECT b.BENEFIT_ID
                                        FROM benefits b
                                        WHERE b.CARD_PRODUCT_ID = card_rec.CARD_PRODUCT_ID
                                          AND b.benefit_method_code IN ('DISCOUNT', 'POINTS', 'CASHBACK')
                                    )
                                      AND (UPPER(bl.BENEFIT_AREA_CATEGORY_CODE) = 'ANY' OR UPPER(bl.BENEFIT_AREA_CATEGORY_CODE) = UPPER(payment_rec.PAYMENT_CATEGORY_CODE))
                                      AND (payment_rec.approval_amount >= NVL(bl.MINIMUM_PAYMENT_AMOUNT, 0))
                                    ORDER BY bl.benefit_amount DESC, bl.benefit_rate DESC;

                                    -- 10. 각 혜택 한도를 순회하며 최대 혜택을 계산
                                    v_max_benefit := 0; -- 최대 혜택 초기화
                                    FOR i IN 1 .. v_applicable_benefits.COUNT LOOP
                                            v_benefit_limit_key := card_rec.CARD_PRODUCT_ID || '_' || v_applicable_benefits(i).BENEFIT_LIMIT_ID;

                                            -- 11. 이미 사용된 혜택 금액 조회
                                            IF v_benefit_usage.EXISTS(v_benefit_limit_key) THEN
                                                v_used_amount := v_benefit_usage(v_benefit_limit_key).used_amount;
                                            ELSE
                                                v_used_amount := 0;
                                            END IF;

                                            -- 12. 남은 혜택 한도 계산
                                            IF v_applicable_benefits(i).benefit_limit IS NOT NULL THEN
                                                v_benefit_limit_remaining := v_applicable_benefits(i).benefit_limit - v_used_amount;
                                            ELSE
                                                v_benefit_limit_remaining := NULL; -- 한도 없음
                                            END IF;

                                            -- 13. 남은 한도가 있는 경우 잠재적 혜택 금액 계산
                                            IF v_benefit_limit_remaining IS NULL OR v_benefit_limit_remaining > 0 THEN
                                                -- 14. 혜택 방식에 따라 혜택 금액 계산
                                                IF v_applicable_benefits(i).FIXED_OR_RATE_CODE = 'FIXED' THEN
                                                    v_potential_benefit := v_applicable_benefits(i).benefit_amount;
                                                    IF v_benefit_limit_remaining IS NOT NULL THEN
                                                        -- 최대 혜택을 초과하지 않도록 설정
                                                        v_potential_benefit := LEAST(v_potential_benefit, v_benefit_limit_remaining);
                                                    END IF;
                                                ELSIF v_applicable_benefits(i).FIXED_OR_RATE_CODE = 'RATE' THEN
                                                    v_potential_benefit := payment_rec.approval_amount * v_applicable_benefits(i).benefit_rate;
                                                    IF v_benefit_limit_remaining IS NOT NULL THEN
                                                        -- 최대 혜택을 초과하지 않도록 설정
                                                        v_potential_benefit := LEAST(v_potential_benefit, v_benefit_limit_remaining);
                                                    END IF;
                                                ELSE
                                                    v_potential_benefit := 0;
                                                END IF;

                                                -- 15. 최대 혜택 금액 및 혜택 레코드 업데이트
                                                IF v_potential_benefit > v_max_benefit THEN
                                                    v_max_benefit := v_potential_benefit;
                                                    v_best_benefit_rec := v_applicable_benefits(i);
                                                END IF;
                                            END IF;
                                        END LOOP;

                                    -- 16. 최대 혜택을 적용
                                    IF v_max_benefit > 0 THEN
                                        v_current_benefit := v_max_benefit;
                                        v_benefit_limit_key := card_rec.CARD_PRODUCT_ID || '_' || v_best_benefit_rec.BENEFIT_LIMIT_ID;

                                        -- 17. 총 혜택 금액 업데이트
                                        v_total_benefit := v_total_benefit + v_current_benefit;

                                        -- 18. 혜택 사용량 업데이트
                                        IF v_benefit_usage.EXISTS(v_benefit_limit_key) THEN
                                            v_benefit_usage(v_benefit_limit_key).used_amount := v_benefit_usage(v_benefit_limit_key).used_amount + v_current_benefit;
                                        ELSE
                                            v_benefit_usage(v_benefit_limit_key) := benefit_usage_record(
                                                    card_id          => card_rec.CARD_PRODUCT_ID,
                                                    benefit_id       => v_best_benefit_rec.BENEFIT_ID,
                                                    benefit_limit_id => v_best_benefit_rec.BENEFIT_LIMIT_ID,
                                                    used_amount      => v_current_benefit
                                                );
                                        END IF;

                                        -- 19. 카테고리별 혜택 정보를 TEMP_BENEFIT_TABLE에 저장
                                        DECLARE
                                            v_category_name VARCHAR2(255); -- 카테고리 이름 저장 변수
                                        BEGIN
                                            SELECT cc.CODE_NAME INTO v_category_name
                                            FROM common_codes cc
                                            WHERE cc.COMMON_CODE = payment_rec.PAYMENT_CATEGORY_CODE;

                                            MERGE INTO DEVELOPER.TEMP_BENEFIT_TABLE t
                                            USING (
                                                SELECT
                                                    card_rec.CARD_PRODUCT_ID AS CARD_PRODUCT_ID,
                                                    payment_rec.PAYMENT_CATEGORY_CODE AS CATEGORY_CODE,
                                                    v_category_name AS CATEGORY_NAME,
                                                    v_current_benefit AS TOTAL_BENEFIT
                                                FROM dual
                                            ) s
                                            ON (t.CARD_PRODUCT_ID = s.CARD_PRODUCT_ID AND t.CATEGORY_CODE = s.CATEGORY_CODE)
                                            WHEN MATCHED THEN
                                                UPDATE SET
                                                    t.TOTAL_BENEFIT = t.TOTAL_BENEFIT + s.TOTAL_BENEFIT
                                            WHEN NOT MATCHED THEN
                                                INSERT (CARD_PRODUCT_ID, CATEGORY_CODE, CATEGORY_NAME, TOTAL_BENEFIT)
                                                VALUES (s.CARD_PRODUCT_ID, s.CATEGORY_CODE, s.CATEGORY_NAME, s.TOTAL_BENEFIT);

                                            DBMS_OUTPUT.PUT_LINE('Merged into TEMP_BENEFIT_TABLE for card_id: ' || card_rec.CARD_PRODUCT_ID ||
                                                                 ', category_code: ' || payment_rec.PAYMENT_CATEGORY_CODE ||
                                                                 ', benefit_amount: ' || v_current_benefit);
                                        END;

                                    END IF; -- 최대 혜택 적용 종료
                                END; -- 적용 가능한 혜택 한도 계산 블록 종료
                            END LOOP; -- 결제 내역 순회 종료

                    END; -- 혜택 사용량 초기화 블록 종료

                    -- 다음 달로 이동
                    current_month_start := current_month_end;
                END LOOP; -- 월별 순회 종료

            DBMS_OUTPUT.PUT_LINE('Total benefit for card ' || card_rec.CARD_PRODUCT_ID || ': ' || v_total_benefit);

            -- **연회비 조회 및 최소 연회비 선택**
            SELECT MIN(NVL(af.ANNUAL_FEE_AMOUNT, 0))
            INTO v_annual_fee
            FROM DEVELOPER.ANNUAL_FEES af
            WHERE af.CARD_PRODUCT_ID = card_rec.CARD_PRODUCT_ID;

            IF v_annual_fee IS NULL THEN
                v_annual_fee := 0; -- 연회비가 없을 경우 0으로 설정
            END IF;

            DBMS_OUTPUT.PUT_LINE('Annual fee for card ' || card_rec.CARD_PRODUCT_ID || ': ' || v_annual_fee);

            -- **총 혜택 금액에서 연회비를 차감**
            v_total_benefit := v_total_benefit - v_annual_fee;

            -- **총 혜택 금액이 음수가 될 경우 0으로 설정**
            IF v_total_benefit < 0 THEN
                v_total_benefit := 0;
            END IF;

            -- 20. 카드별 피킹률 계산 (연회비 고려)
            IF (v_total_approval_amount + v_annual_fee) > 0 THEN
                v_picking_rate := (v_total_benefit / (v_total_approval_amount + v_annual_fee)) * 100;
            ELSE
                v_picking_rate := 0;
            END IF;

            DBMS_OUTPUT.PUT_LINE('Picking rate for card ' || card_rec.CARD_PRODUCT_ID || ': ' || v_picking_rate);

            -- 21. 카드 혜택 정보 저장
            v_card_benefit_summary_table.EXTEND;
            v_card_benefit_summary_table(v_card_benefit_summary_table.COUNT) := card_benefit_summary_record(
                    card_id        => card_rec.CARD_PRODUCT_ID,
                    card_name      => card_rec.card_name,
                    card_img_url   => card_rec.card_image,
                    total_benefit  => v_total_benefit,
                    picking_rate   => v_picking_rate,
                    card_apply_url => card_rec.card_website_link,
                    annual_fee     => v_annual_fee
                );
        END LOOP; -- 모든 카드 순회 종료

    DBMS_OUTPUT.PUT_LINE('Sorting cards based on total benefits.');

    -- 22. 카드별 총 혜택 금액을 기준으로 내림차순 정렬 (버블 정렬)
    FOR i IN 1 .. v_card_benefit_summary_table.COUNT - 1
        LOOP
            FOR j IN i + 1 .. v_card_benefit_summary_table.COUNT
                LOOP
                    IF v_card_benefit_summary_table(i).total_benefit < v_card_benefit_summary_table(j).total_benefit THEN
                        -- 두 카드의 위치 교환
                        DECLARE
                            temp card_benefit_summary_record;
                        BEGIN
                            temp := v_card_benefit_summary_table(i);
                            v_card_benefit_summary_table(i) := v_card_benefit_summary_table(j);
                            v_card_benefit_summary_table(j) := temp;
                        END;
                    END IF;
                END LOOP;
        END LOOP;

    DBMS_OUTPUT.PUT_LINE('Top cards selected.');

    -- 23. 상위 3개의 카드 선택
    FOR i IN 1 .. LEAST(3, v_card_benefit_summary_table.COUNT)
        LOOP
            v_top_cards.EXTEND;
            v_top_cards(v_top_cards.COUNT) := v_card_benefit_summary_table(i);
        END LOOP;

    DBMS_OUTPUT.PUT_LINE('Opening cursors for top cards.');

    -- 24. 출력 파라미터에 상위 카드 정보 할당 및 커서 열기

    -- 카드 1 정보 및 커서 열기
    IF v_top_cards.COUNT >= 1 THEN
        o_card1_id := v_top_cards(1).card_id;
        o_card1_name := v_top_cards(1).card_name;
        o_card1_img_url := v_top_cards(1).card_img_url;
        o_card1_benefit_all_amount := v_top_cards(1).total_benefit;
        o_card1_picking_rate := v_top_cards(1).picking_rate;
        o_card1_card_apply_url := v_top_cards(1).card_apply_url;

        DBMS_OUTPUT.PUT_LINE('Opening benefit_description_cursor1 for card_id: ' || o_card1_id);

        -- 카드 1 혜택 설명 커서 열기
        OPEN o_benefit_description_cursor1 FOR
            SELECT BENEFIT_SUMMARY_DESCRIPTION
            FROM benefits
            WHERE CARD_PRODUCT_ID = o_card1_id;

        DBMS_OUTPUT.PUT_LINE('Opening benefit_cursor1 for card_id: ' || o_card1_id);

        -- 카드 1 혜택 카테고리 커서 열기
        OPEN o_benefit_cursor1 FOR
            SELECT
                t.CATEGORY_NAME AS category_name,
                c.TOTAL_AMOUNT AS total_amount,
                t.TOTAL_BENEFIT AS total_benefit
            FROM DEVELOPER.TEMP_BENEFIT_TABLE t
                     JOIN DEVELOPER.TEMP_CATEGORY_TOTALS c ON t.CATEGORY_CODE = c.CATEGORY_CODE
            WHERE t.CARD_PRODUCT_ID = o_card1_id;

        DBMS_OUTPUT.PUT_LINE('Benefit cursor1 opened successfully.');
    END IF;

    -- 카드 2 정보 및 커서 열기
    IF v_top_cards.COUNT >= 2 THEN
        o_card2_id := v_top_cards(2).card_id;
        o_card2_name := v_top_cards(2).card_name;
        o_card2_img_url := v_top_cards(2).card_img_url;
        o_card2_benefit_all_amount := v_top_cards(2).total_benefit;
        o_card2_picking_rate := v_top_cards(2).picking_rate;
        o_card2_card_apply_url := v_top_cards(2).card_apply_url;

        DBMS_OUTPUT.PUT_LINE('Opening benefit_description_cursor2 for card_id: ' || o_card2_id);

        -- 카드 2 혜택 설명 커서 열기
        OPEN o_benefit_description_cursor2 FOR
            SELECT BENEFIT_SUMMARY_DESCRIPTION
            FROM benefits
            WHERE CARD_PRODUCT_ID = o_card2_id;

        DBMS_OUTPUT.PUT_LINE('Opening benefit_cursor2 for card_id: ' || o_card2_id);

        -- 카드 2 혜택 카테고리 커서 열기
        OPEN o_benefit_cursor2 FOR
            SELECT
                t.CATEGORY_NAME AS category_name,
                c.TOTAL_AMOUNT AS total_amount,
                t.TOTAL_BENEFIT AS total_benefit
            FROM DEVELOPER.TEMP_BENEFIT_TABLE t
                     JOIN DEVELOPER.TEMP_CATEGORY_TOTALS c ON t.CATEGORY_CODE = c.CATEGORY_CODE
            WHERE t.CARD_PRODUCT_ID = o_card2_id;

        DBMS_OUTPUT.PUT_LINE('Benefit cursor2 opened successfully.');
    END IF;

    -- 카드 3 정보 및 커서 열기
    IF v_top_cards.COUNT >= 3 THEN
        o_card3_id := v_top_cards(3).card_id;
        o_card3_name := v_top_cards(3).card_name;
        o_card3_img_url := v_top_cards(3).card_img_url;
        o_card3_benefit_all_amount := v_top_cards(3).total_benefit;
        o_card3_picking_rate := v_top_cards(3).picking_rate;
        o_card3_card_apply_url := v_top_cards(3).card_apply_url;

        DBMS_OUTPUT.PUT_LINE('Opening benefit_description_cursor3 for card_id: ' || o_card3_id);

        -- 카드 3 혜택 설명 커서 열기
        OPEN o_benefit_description_cursor3 FOR
            SELECT BENEFIT_SUMMARY_DESCRIPTION
            FROM benefits
            WHERE CARD_PRODUCT_ID = o_card3_id;

        DBMS_OUTPUT.PUT_LINE('Opening benefit_cursor3 for card_id: ' || o_card3_id);

        -- 카드 3 혜택 카테고리 커서 열기
        OPEN o_benefit_cursor3 FOR
            SELECT
                t.CATEGORY_NAME AS category_name,
                c.TOTAL_AMOUNT AS total_amount,
                t.TOTAL_BENEFIT AS total_benefit
            FROM DEVELOPER.TEMP_BENEFIT_TABLE t
                     JOIN DEVELOPER.TEMP_CATEGORY_TOTALS c ON t.CATEGORY_CODE = c.CATEGORY_CODE
            WHERE t.CARD_PRODUCT_ID = o_card3_id;

        DBMS_OUTPUT.PUT_LINE('Benefit cursor3 opened successfully.');
    END IF;

    DBMS_OUTPUT.PUT_LINE('Procedure completed successfully.');

    -- 25. 임시 테이블 데이터 삭제
    DELETE FROM DEVELOPER.TEMP_BENEFIT_TABLE;
    DELETE FROM DEVELOPER.TEMP_CATEGORY_TOTALS;

EXCEPTION
    WHEN OTHERS THEN
        -- 예외 발생 시 에러 메시지 출력
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        RAISE;
END simulate_best_cards_for_all_payments;
/
