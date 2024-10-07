import React, { useEffect, useState } from "react";
import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Box,
  Button,
  RadioGroup,
  Stack,
  Radio,
  useDisclosure,
} from "@chakra-ui/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "../style/RecommendTest.css";
import { useSelector } from "react-redux";
import axios from "axios";

export default function RecommendTest() {
  const [activeStep, setActiveStep] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [answers, setAnswers] = useState([]); // 사용자의 응답을 저장
  const [modes, setModes] = useState([]); // 모드 상태 추가
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  const [totalScore, setTotalScore] = useState(Array(questions.length).fill(0)); // 질문 수만큼 배열 생성

  useEffect(() => {
    window.scrollTo(0, 0);
    const queryParams = new URLSearchParams(location.search);
    const modesParam = queryParams.get("modes");
    setModes(modesParam ? modesParam.split(",") : []);
  }, [location]);

  const handleNextSlide = () => {
    if (activeStep < questions.length - 1 && swiperInstance) {
      setActiveStep((prev) => prev + 1);
      swiperInstance.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (activeStep > 0 && swiperInstance) {
      setActiveStep((prev) => prev - 1);
      swiperInstance.slidePrev();
    }
  };

  const handleFinalAction = () => {
    // 응답 확인 로그
    console.log("User's Answers: ", answers);

    // 각 타입(a, b, c, d)의 점수를 저장할 객체
    const scoreByType = { a: 0, b: 0, c: 0, d: 0 };

    // 모든 질문을 순회하면서 점수를 계산
    questions.forEach((question, questionIndex) => {
      const userAnswer = answers[questionIndex]; // 사용자가 선택한 답변
      const selectedOptionIndex = question.options.indexOf(userAnswer); // 선택한 옵션의 인덱스
      const questionScore = question.score[selectedOptionIndex]; // 선택한 옵션의 점수

      // 각 타입의 점수를 누적
      scoreByType.a += questionScore.a;
      scoreByType.b += questionScore.b;
      scoreByType.c += questionScore.c;
      scoreByType.d += questionScore.d;
    });

    // 타입별 총점을 배열로 정렬 (점수 높은 순서대로)
    const sortedScores = Object.entries(scoreByType).sort(
      ([, scoreA], [, scoreB]) => scoreB - scoreA
    );

    // 동점인지 확인
    const isTied = sortedScores[0][1] === sortedScores[1][1];

    let finalType = sortedScores[0][0]; // 기본적으로 가장 높은 점수를 가진 타입

    if (isTied) {
      // 동점일 경우 7번 질문의 응답에 따라 타입 결정
      const seventhAnswer = answers[6]; // 7번 질문에 대한 사용자의 응답
      const seventhQuestionIndex = questions[6].options.indexOf(seventhAnswer);
      const seventhQuestionScore = questions[6].score[seventhQuestionIndex];

      // 7번 질문의 점수를 기준으로 동점 타입 중 결정
      const tiedTypes = sortedScores.filter(
        ([type, score]) => score === sortedScores[0][1]
      );
      finalType = tiedTypes.reduce((bestType, [currentType]) => {
        return seventhQuestionScore[currentType] >
          seventhQuestionScore[bestType]
          ? currentType
          : bestType;
      }, tiedTypes[0][0]);
    }

    console.log("최종 타입: ", finalType);

    // 서버로 데이터 전송 (최종 타입과 함께)
    axios
      .post(
        "https://hana-ro-backend.site:8080/api/card-recommend/survey-results",
        {
          userId: user.id,
          answers: answers,
          finalType: finalType,
        }
      )
      .then((response) => {
        console.log("Data successfully sent to server:", response.data.data);

        // 응답에 따라 다음 스텝으로 이동
        if (modes.includes("data")) {
          navigate(`/cardrecommend/recommend-choice/data`, {
            state: {
              responseData: response.data, // 서버에서 받은 데이터를 state로 넘기기
              finalType: finalType, // 추가로 넘길 데이터가 있다면 함께 넘기기
            },
          });
        } else {
          navigate(`/cardrecommend/recommend-choice/survey-results`, {
            state: {
              responseData: response.data.data, // 서버에서 받은 데이터를 state로 넘기기
              finalType: finalType,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const navigateToNextStep = (answers, modes) => {
    // 모드와 함께 다음 단계로 이동하는 로직 구현
    console.log("Navigating to next step with modes:", modes);
    console.log("Answers:", answers);

    if (modes.includes("data")) {
      navigate(`/cardrecommend/recommend-choice/data?modes=${modes.join(",")}`);
    } else {
      navigate(`/cardrecommend/recommend-choice/results`);
    }
  };

  const handleAnswerChange = (value, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[activeStep] = value;
    setAnswers(updatedAnswers);

    // 현재 질문의 선택에 따른 점수를 계산
    const selectedOptionIndex = questions[activeStep].options.indexOf(value);
    const questionScore = questions[activeStep].score[selectedOptionIndex];

    // 기존 totalScore 배열을 복사하여 현재 질문의 점수를 업데이트
    const updatedScore = [...totalScore];
    updatedScore[activeStep] = questionScore; // 현재 질문에 대한 점수 업데이트
    setTotalScore(updatedScore);
  };

  return (
    <>
      <div className="recommendtest-back">
        <div className="recommendtest-container">
          <StepperComponent activeStep={activeStep} />
          <div className="recommendtest-test-container">
            <Swiper
              cssMode={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="mySwiper"
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
            >
              {questions.map((question, index) => (
                <SwiperSlide key={index} className="myswiper-slide">
                  <div style={{ fontSize: "1.5rem" }}>{question.text}</div>
                  <RadioGroup
                    onChange={handleAnswerChange}
                    value={answers[index] || ""}
                  >
                    <Stack direction="column">
                      {question.options.map((option, i) => (
                        <Radio key={i} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                  <div className="button-group">
                    <Button
                      onClick={handlePrevSlide}
                      isDisabled={index === 0} // 첫 번째 질문에서는 비활성화
                    >
                      뒤로가기
                    </Button>
                    {index === questions.length - 1 ? (
                      <Button
                        onClick={handleFinalAction}
                        isDisabled={!answers[index]}
                      >
                        소비 패턴 분석하기
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextSlide}
                        isDisabled={!answers[index]} // 사용자가 응답을 선택하지 않으면 비활성화
                      >
                        다음
                      </Button>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* OAuth 모달 */}
    </>
  );
}

const questions = [
  {
    text: "1. 내가 주로 하는 여가 활동은?",
    options: [
      "침대속에서 넷플릭스 보기",
      "답답한 집을 떠나 여행을 떠난다.",
      "심심할땐 역시 쇼핑! 쇼핑을 한다.",
      "자기개발이 곧 여가, 자기개발을 진행한다.",
    ],
    score: [
      { a: 4, b: 1, c: 2, d: 2 },
      { a: 1, b: 4, c: 3, d: 2 },
      { a: 2, b: 3, c: 4, d: 1 },
      { a: 3, b: 2, c: 1, d: 4 },
    ],
  },
  {
    text: "2. 커피를 마시고 싶다! 나의 선택은?",
    options: [
      "가격은 모르겠고 나가기 싫으니 배달시켜 마신다.",
      "저가형 커피를 마신다.",
      "고가의 커피를 마신다.",
    ],
    score: [
      { a: 4, b: 1, c: 3, d: 2 },
      { a: 2, b: 3, c: 1, d: 4 },
      { a: 2, b: 3, c: 4, d: 1 },
    ],
  },
  {
    text: "3. 카드를 하나 고른다면?",
    options: [
      "1가지 영역에서 50%의 혜택을 제공하는 카드 (하나의 영역에 대해서 확실한 카드)",
      "10가지 영역에서 5%의 혜택을 제공하는 카드 (여러영역이 커버가 가능한 카드)",
      "굳이 상관 하지 않는다.",
    ],
    score: [
      { a: 3, b: 2, c: 4, d: 1 },
      { a: 2, b: 3, c: 1, d: 4 },
      { a: 3, b: 2, c: 2, d: 3 },
    ],
  },
  {
    text: "4. 가장 자주 사용하는 어플은?",
    options: [
      "넷플릭스, 디즈니플러스 등 구독형 영상스트리밍 어플",
      "카카오맵, 네이버지도, 스카이스캐너 등 여행 관련 어플",
      "인스타그램, 페이스북 등 SNS 어플",
      "쿠팡, G마켓 등 온라인 쇼핑 관련 어플",
    ],
    score: [
      { a: 4, b: 1, c: 3, d: 2 },
      { a: 1, b: 4, c: 2, d: 3 },
      { a: 1, b: 3, c: 4, d: 2 },
      { a: 3, b: 2, c: 1, d: 4 },
    ],
  },
  {
    text: "5. 나의 일주일에 외출횟수",
    options: ["1번 이하", "1 ~ 2회", "3 ~ 5회", "6 ~ 7회"],
    score: [
      { a: 4, b: 1, c: 2, d: 3 },
      { a: 3, b: 2, c: 2, d: 3 },
      { a: 2, b: 3, c: 3, d: 2 },
      { a: 1, b: 4, c: 3, d: 2 },
    ],
  },
  {
    text: "6. 선호하는 쇼핑 방법은?",
    options: ["온라인 쇼핑", "마트", "백화점", "편의점"],
    score: [
      { a: 4, b: 1, c: 3, d: 3 },
      { a: 1, b: 3, c: 2, d: 4 },
      { a: 2, b: 3, c: 4, d: 2 },
      { a: 3, b: 3, c: 2, d: 1 },
    ],
  },
  {
    text: "7. 카드 혜택중 가장 중요하게 생각하는것은?",
    options: ["구독, 배달", "여행, 대중교통", "호텔, 면세", "공과금, 통신"],
    score: [
      { a: 4, b: 1, c: 3, d: 2 },
      { a: 1, b: 4, c: 3, d: 2 },
      { a: 1, b: 3, c: 4, d: 2 },
      { a: 3, b: 2, c: 1, d: 4 },
    ],
  },
];

function StepperComponent({ activeStep }) {
  return (
    <Stepper size="lg" index={activeStep}>
      {questions.map(
        (
          step,
          index // 'steps'를 'questions'로 수정
        ) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0"></Box>

            {index < questions.length - 1 && <StepSeparator />}
          </Step>
        )
      )}
    </Stepper>
  );
}
