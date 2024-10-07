import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  Step,
  Stepper,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  useSteps,
  StepNumber,
  StepIcon,
  StepSeparator,
  Divider,
} from "@chakra-ui/react";

import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import AnimatedNumber from "./AnimatedNumber";

export default function IncomeTaxDeduction() {
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);

  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [incomeInputValue, setIncomeInputValue] = useState("");
  const [data, setData] = useState({}); // 불러온 데이터를 저장하는 상태

  // 스크롤을 위한 section refs
  const sectionRefs = {
    step1: useRef(null),
    step2: useRef(null),
    step3: useRef(null),
    step4: useRef(null),
  };

  // 스크롤 이동 함수
  const scrollToSection = (section) => {
    if (sectionRefs[section] && sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Section ${section} is not available for scrolling.`);
    }
  };

  const steps = [
    {
      title: "Step 1",
      description: "연수입 입력",
    },
    { title: "Step 2", description: "데이터 확인" },
    // { title: "Step 3", description: "차트 확인" },
    { title: "Step 3", description: "다시하기" },
  ];

  const thousandUnits = ["", "만", "억", "조", "경", "해"];

  // 배열 쪼개기
  function chunkAtEnd(value = "", n = 1) {
    const result = [];

    for (let end = value.length; end > 0; end -= n) {
      result.push(value.substring(Math.max(0, end - n), end));
    }

    return result;
  }

  // 4자리씩 숫자로 변환
  function formatNumber(number) {
    return chunkAtEnd(String(number), 4)
      .reduce((acc, item, index) => {
        const unit = thousandUnits[index] ?? "";

        if (!Number(item)) {
          return acc;
        }

        return `${Number(item)}${unit} ${acc}`;
      }, "")
      .trim();
  }

  const comment = [
    "지금부터 소득공제를 위해서는 체크카드와 현금을 쓰시는 것이 좋아요! 다만 교통카드는 80%, 재래시장은 40% 추가로 공제가 되니 그땐 신용카드를 쓰셔도 괜찮습니다!",
    `총 급여의 25% 초과분부터 소득공제가 가능해요! 25% 달성까지 남은 ${1} 비교적 혜택이 더 좋은 신용카드를 사용하셔도 좋지만 그 이후부터는 체크카드 사용을 추천드려요!`,
  ];

  // 사용자가 입력한 연수입을 handleSubmitIncome으로 전달
  const handleSubmitIncome = () => {
    setActiveStep(activeStep + 1);
    scrollToSection(`step2`);
    setIsLoading(true);
    axios
      .post(
        "https://hana-ro-backend.site:8080/api/login-block/income-tax-deduction",
        {
          userId: `${user.id}`,
          token: token,
          income: incomeInputValue,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        } else {
          console.error("Failed to fetch data:", response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="income-tax-deduction-container">
        <div className="income-tax-deduction-article">
          <Box
            width="100%"
            margin="auto"
            style={{
              position: "sticky",
              top: "0px",
              width: "90%",
              fontFamily: "notosans",
            }}
          >
            <Stepper index={activeStep} marginTop="20px">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box>
                    <StepTitle marginBottom={0}>{step.title}</StepTitle>
                    <StepDescription marginBottom={0}>
                      {step.description}
                    </StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>

          <>
            {/* Section 1 */}
            <div
              ref={sectionRefs.step1}
              className="income-tax-section income-tax-section1"
            >
              <h1>
                <strong>{user.name}</strong>님의 연수입은 얼마인가요?
              </h1>
              <div style={{ opacity: "0.8", fontSize: "1.3rem" }}>
                연수입과 결제 데이터를 기반으로 신용카드, 체크카드 사용 전략을
                알려드려요!
              </div>
              <div className="income-input-container">
                <input
                  type="number"
                  id="incomeInput"
                  placeholder={`사전 입력된 연수입 : ${user.income.toLocaleString()}원`}
                  value={incomeInputValue}
                  onChange={(e) => setIncomeInputValue(e.target.value)} // 입력값 업데이트
                />

                <label htmlFor="incomeInput">연수입</label>
                <div style={{ opacity: 0.7, fontSize: "1.3rem" }}>
                  {formatNumber(incomeInputValue)}원
                </div>
              </div>
              <div
                onClick={handleSubmitIncome}
                className="income-tax-section1-button hvr-underline-from-center-black"
              >
                시작하기
              </div>
            </div>

            {/* Section 2 */}
            {isLoading ? (
              <div
                ref={sectionRefs.step2}
                className="income-tax-section income-tax-section2"
              >
                <div className="mycard-loading-container">
                  <img
                    src={process.env.PUBLIC_URL + "/img/img_loading.gif"}
                    alt="loader"
                  />
                  <br />
                  <div style={{ color: "white", fontSize: "1.3rem" }}>
                    결제 기록을 가져오는 중입니다...
                  </div>
                </div>
              </div>
            ) : (
              <div
                ref={sectionRefs.step2}
                className="income-tax-section income-tax-section2"
              >
                <h1 style={{ marginTop: "3.5rem" }}>결과 확인</h1>
                <div className="income-tax-section2-container">
                  {" "}
                  <div className="income-tax-section2-left">
                    <div className="income-tax-section2-left-information">
                      <div className="income-tax-section2-left-information-title">
                        {" "}
                        <span style={{ fontSize: "1.9rem" }}>연수입</span>
                      </div>
                      <div className="income-tax-section2-left-information-article">
                        <AnimatedNumber value={data.income} />
                      </div>
                      <div className="income-tax-section2-left-information-sub">
                        {formatNumber(data.income)}원
                      </div>
                    </div>

                    <div className="income-tax-section2-left-information">
                      <div className="income-tax-section2-left-information-title">
                        {" "}
                        <span style={{ fontSize: "1.9rem" }}>신용카드</span> (
                        {data.creditApprovalCount}회 결제){" "}
                      </div>
                      <div className="income-tax-section2-left-information-article">
                        <AnimatedNumber value={data.creditAmount} /> 결제
                      </div>
                      <div className="income-tax-section2-left-information-sub">
                        {formatNumber(data.creditAmount)}원
                      </div>
                    </div>

                    <div className="income-tax-section2-left-information">
                      <div className="income-tax-section2-left-information-title">
                        {" "}
                        <span style={{ fontSize: "1.9rem" }}>체크카드</span> (
                        {data.debitApprovalCount}회 결제){" "}
                      </div>
                      <div className="income-tax-section2-left-information-article">
                        <AnimatedNumber value={data.debitAmount} /> 결제
                      </div>
                      <div className="income-tax-section2-left-information-sub">
                        {formatNumber(data.debitAmount)}원
                      </div>
                    </div>
                  </div>
                  <div className="income-tax-section2-right">
                    <div className="income-tax-section2-left-information">
                      <div className="income-tax-section2-right-title">
                        예상 세율
                        <Popover placement="center">
                          <PopoverTrigger>
                            <IoMdInformationCircleOutline
                              size={33}
                              style={{ opacity: "0.6", cursor: "help" }}
                            />
                          </PopoverTrigger>
                          <PopoverContent
                            style={{
                              width: "60rem", // Popover 크기를 키움
                              height: "40rem",
                              padding: "20px", // 내부 패딩 추가
                              fontSize: "1rem",
                              backgroundColor: "rgba(255, 255, 255,0.9)",
                              position: "relative",
                              top: "30%",
                              left: "18%",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <h2 style={{ margin: "2rem 0rem" }}>
                                <strong>급여에 따른 세액 공제율</strong>
                              </h2>
                              <table className="custom-tax-table">
                                <thead className="custom-tax-table-header">
                                  <tr className="custom-tax-table-header-row">
                                    <th className="custom-tax-table-header-cell">
                                      연 급여
                                    </th>
                                    <th className="custom-tax-table-header-cell">
                                      공제율
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="custom-tax-table-body">
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      1400만원 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      6%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      ~ 5000만원 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      15%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      ~ 8800만원 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      24%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      ~ 1억 5천만원 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      35%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      ~ 3억 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      38%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      ~ 5억 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      40%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      ~10억 이하
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      42%
                                    </td>
                                  </tr>
                                  <tr className="custom-tax-table-row">
                                    <td className="custom-tax-table-cell">
                                      10억 초과
                                    </td>
                                    <td className="custom-tax-table-cell">
                                      45%
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="income-tax-section2-right-information">
                        {data.estimatedApplicableTaxRate * 100}%
                      </div>
                      <div className="income-tax-section2-left-information-sub">
                        *소득공제 후 연간 급여액의 변동에 따라 적용 세율 구간이
                        한 단계 낮아질 수 있습니다
                      </div>
                    </div>
                    <div className="income-tax-section2-left-information">
                      {" "}
                      <div className="income-tax-section2-right-title">
                        아낄 수 있는 예상 세금
                      </div>
                      <div className="income-tax-section2-right-information">
                        {" "}
                        <AnimatedNumber value={data.estimatedAmount} />
                      </div>
                      <div className="income-tax-section2-left-information-sub">
                        *본 금액은 환급액이 아니며 실제 환급액은 기존 납입
                        세금에 따라 달라집니다
                      </div>
                    </div>
                    <div className="income-tax-section2-left-information">
                      <div className="income-tax-section2-right-title">
                        소득공제 전략
                      </div>
                      <div className="income-tax-section2-right-comment">
                        {" "}
                        {data.commentCode === "CREDIT_FIRST" && (
                          <p>
                            급여의 25% 초과분부터 소득공제가 가능합니다. 앞으로{" "}
                            <strong
                              style={{
                                fontSize: "1.25rem",
                                color: " rgb(24, 169, 147)",
                              }}
                            >
                              {data.remainingAmount?.toLocaleString()}
                            </strong>
                            원까지는 혜택에 따라 신용카드를 사용하셔도 좋지만 그
                            이후부터는 체크카드와 현금 공제율이 더 높습니다.
                          </p>
                        )}
                        {data.commentCode === "DEBIT_FOCUS" && (
                          <p>
                            현재 아낄 수 있는 예상세금은{" "}
                            <strong
                              style={{
                                fontSize: "1.25rem",
                                color: " rgb(24, 169, 147)",
                              }}
                            >
                              {data.estimatedAmount?.toLocaleString()}원
                            </strong>
                            입니다. 소득공제를 위해서는 앞으로{" "}
                            <strong>체크카드</strong>를 쓰시는 것이 좋습니다.
                            다만 교통카드는 80%, 재래시장은 40% 공제가 되니
                            신용카드를 쓰셔도 괜찮습니다.
                          </p>
                        )}
                        {data.commentCode === "FULL_DEDUCTION" && (
                          <p>
                            소득공제 한도를 모두 채우셨습니다. 신용카드,
                            체크카드 구분없이 혜택이 가장 높은 카드를
                            사용해보세요!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Divider
                  style={{ opacity: "0.2", width: "90%", marginTop: "2rem" }}
                />
                <Button
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                    scrollToSection("step4");
                  }}
                  style={{ fontSize: "1.3rem" }}
                >
                  다음
                </Button>
              </div>
            )}

            {/* Section 3 */}
            {/* <div
              ref={sectionRefs.step3}
              className="income-tax-section income-tax-section3"
            >
              <h1>차트를 확인하세요.</h1>
              <div>차트를 여기에 표시합니다.</div>
              <Button
                onClick={() => {
                  setActiveStep(activeStep + 1);
                  scrollToSection("step4");
                }}
              >
                다음
              </Button>
            </div> */}

            {/* Section 4 */}
            <div
              ref={sectionRefs.step4}
              className="income-tax-section income-tax-section4"
            >
              <h1>다시하기</h1>
              <Button
                onClick={() => {
                  setActiveStep(0);
                  scrollToSection("step1");
                }}
              >
                처음으로 돌아가기
              </Button>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
