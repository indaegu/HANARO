CREATE OR REPLACE PROCEDURE simulate_card_benefit(
    p_user_id            IN VARCHAR2, -- 입력 받을 사용자의 id
    o_best_card          OUT VARCHAR2, -- 반환할 최적의 카드 이름
    o_best_benefit       OUT NUMBER, -- 반환할 최적의 혜택값
    o_past_card_name     OUT VARCHAR2, -- 직전 결제 카드 이름
    o_past_benefit       OUT NUMBER, -- 직전 결제에서 받은 혜택 금액
    o_payment_name       OUT VARCHAR2, -- 결제한 가맹점 이름
    o_approval_amount    OUT NUMBER, -- 결제 금액
    o_payment_category   OUT VARCHAR2, -- 결제 카테고리 이름
    o_past_card_img_url  OUT VARCHAR2, -- 직전 결제 카드 이미지 URL
    o_best_card_img_url  OUT VARCHAR2 -- 최적의 카드 이미지 URL
) AS
    v_best_card_benefit      NUMBER; -- 각 카드의 최대 혜택 저장용 변수
    v_last_approval_amount   NUMBER; -- 마지막 결제 금액
    v_last_approval_category VARCHAR2(255); -- 마지막 결제 카테고리
    v_best_benefit           NUMBER := 0; -- 최적의 혜택
    v_current_benefit        NUMBER; -- 현재 혜택
    v_best_card_id           VARCHAR2(255); -- 최적의 카드 번호
    v_last_customer_card_id  VARCHAR2(255); -- 마지막 사용한 카드 ID
    v_last_month_performance NUMBER; -- 전월 실적


    -- 사용자의 마지막 결제 정보를 조회하는 커서
    CURSOR c_last_approval IS
        SELECT ca.approval_amount,        -- 결제금액
               cc.last_month_performance, -- 해당 카드의 전월 실적
               ca.PAYMENT_CATEGORY_CODE,  -- 결제 카테고리
               cp.card_name,              -- 카드 이름
               ca.benefit_amount,         -- 받은 혜택 금액
               m.merchant_name,           -- 가맹점 이름
               cp.card_image,             -- 직전 결제 카드 이미지 URL
               cc.CUSTOMER_CARD_ID        -- 마지막 사용한 카드 ID 추가
        FROM customer_approvals ca
                 JOIN customer_cards cc ON ca.CUSTOMER_CARD_ID = cc.CUSTOMER_CARD_ID
                 JOIN card_products cp ON cc.CARD_PRODUCT_ID = cp.CARD_PRODUCT_ID
                 JOIN merchants m ON ca.MERCHANT_ID = m.MERCHANT_ID
        WHERE cc.CUSTOMER_ID = p_user_id
        ORDER BY ca.approval_date DESC
            FETCH FIRST 1 ROWS ONLY;

BEGIN
    -- 1. 사용자의 마지막 결제 정보를 가져옴
    OPEN c_last_approval;
    FETCH c_last_approval
        INTO
        v_last_approval_amount,     -- 결제 금액
        v_last_month_performance, -- 마지막 결제 카드의 전월 실적 (사용하지 않음)
        v_last_approval_category,   -- 결제 카테고리
        o_past_card_name,           -- 직전 카드 이름
        o_past_benefit,             -- 직전 결제에서 받은 혜택 금액
        o_payment_name,             -- 결제한 가맹점 이름
        o_past_card_img_url,        -- 직전 결제 카드 이미지 URL
        v_last_customer_card_id;    -- 마지막 사용한 카드 ID
    CLOSE c_last_approval;

    IF v_last_approval_amount IS NULL THEN
        -- 마지막 결제가 없을 경우 예외 처리
        o_best_card := 'No last approval found';
        o_best_benefit := 0;
        RETURN;
    END IF;

    -- 결제 금액 설정
    o_approval_amount := v_last_approval_amount;

    -- 결제 카테고리 이름 설정 (CommonCodes 테이블에서 가져옴)
    SELECT code_name
    INTO o_payment_category
    FROM common_codes
    WHERE common_code = v_last_approval_category;

    -- 2. 다른 카드들에 대한 시뮬레이션
    FOR card_rec IN (
        SELECT cc.CUSTOMER_CARD_ID,
               cp.CARD_PRODUCT_ID,
               cp.card_image,
               cp.card_name,
               cc.last_month_performance
        FROM CUSTOMER_CARDS cc
                 JOIN card_products cp ON cc.CARD_PRODUCT_ID = cp.CARD_PRODUCT_ID
        WHERE cc.CUSTOMER_ID = p_user_id
          AND cc.CUSTOMER_CARD_ID != v_last_customer_card_id -- 마지막 사용한 카드 제외
        )
        LOOP
            v_best_card_benefit := 0;
            -- 각 카드에서 가장 큰 혜택을 저장할 변수

            -- 3. 해당 카드의 혜택들을 순회하며 시뮬레이션
            FOR benefit_rec IN (
                SELECT bl.benefit_amount,
                       bl.benefit_rate,
                       bl.benefit_limit,
                       bl.BENEFIT_AREA_CATEGORY_CODE,
                       bl.FIXED_OR_RATE_CODE,
                       bl.MINIMUM_PAYMENT_AMOUNT,
                       bl.minimum_range,
                       bl.maximum_range
                FROM benefit_limits bl
                WHERE bl.benefit_id IN (
                    SELECT benefit_id
                    FROM benefits b
                    WHERE b.card_product_id = card_rec.CARD_PRODUCT_ID
                      AND b.benefit_method_code IN ('DISCOUNT', 'POINTS', 'CASHBACK')
                )
                  AND bl.minimum_range <= card_rec.last_month_performance
                  AND bl.maximum_range >= card_rec.last_month_performance
                )
                LOOP
                    -- 현재 혜택 금액 초기화
                    v_current_benefit := 0;

                    -- 혜택이 'ANY'이거나 결제 카테고리에 맞는지 확인
                    IF benefit_rec.BENEFIT_AREA_CATEGORY_CODE = 'ANY'
                        OR benefit_rec.BENEFIT_AREA_CATEGORY_CODE = v_last_approval_category THEN
                        -- FIXED 방식일 경우
                        IF benefit_rec.FIXED_OR_RATE_CODE = 'FIXED' THEN
                            IF v_last_approval_amount >= NVL(benefit_rec.MINIMUM_PAYMENT_AMOUNT, 0) THEN
                                v_current_benefit := LEAST(benefit_rec.benefit_amount,
                                                           benefit_rec.benefit_limit);
                            END IF;
                            -- RATE 방식일 경우
                        ELSIF benefit_rec.FIXED_OR_RATE_CODE = 'RATE' THEN
                            IF v_last_approval_amount >= NVL(benefit_rec.MINIMUM_PAYMENT_AMOUNT, 0) THEN
                                v_current_benefit :=
                                        LEAST(v_last_approval_amount * benefit_rec.benefit_rate,
                                              benefit_rec.benefit_limit);
                            END IF;
                        END IF;

                        -- 카드의 혜택 중 가장 큰 혜택을 저장
                        IF v_current_benefit > v_best_card_benefit THEN
                            v_best_card_benefit := v_current_benefit;
                        END IF;
                    END IF;
                END LOOP;

            -- 4. 카드별 최적의 혜택과 전체 최적의 혜택 비교
            IF v_best_card_benefit > v_best_benefit THEN
                v_best_benefit := v_best_card_benefit;
                o_best_card_img_url := card_rec.card_image; -- 최적의 카드 이미지 URL 저장
                o_best_card := card_rec.card_name;          -- 최적의 카드 이름 저장
                v_best_card_id := card_rec.CUSTOMER_CARD_ID;
            END IF;
        END LOOP;

    -- 5. 최종 결과 반환
    IF v_best_benefit > 0 THEN
        o_best_benefit := v_best_benefit;
    ELSE
        o_best_card := 'No better card found';
        o_best_benefit := 0;
    END IF;

END simulate_card_benefit;
