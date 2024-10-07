import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "../style/RecommendSurveyResult.css";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import RotatableImage from "../components/RotatableImage";
import Marquee from "react-fast-marquee";
import Typewriter from "typewriter-effect";

export default function RecommendSurveyResult() {
  const location = useLocation();
  const { responseData, finalType } = location.state || {};
  const [animateSection2, setAnimateSection2] = useState(false);
  const [animateSection3, setAnimateSection3] = useState(false);
  const navigate = useNavigate();
  // 각 섹션에 대한 ref 생성
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const typewriterRef = useRef(null); // Typewriter 인스턴스 저장

  // 버튼 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(sectionRef);

    // ref의 current 값을 비교하여 section2로 이동 시 애니메이션 활성화
    if (sectionRef.current === section2Ref.current) {
      setAnimateSection2(true);
    } else if (sectionRef.current === section3Ref.current) {
      setAnimateSection3(true);
      if (typewriterRef.current) {
        setTimeout(() => {
          typewriterRef.current.start(); // Typewriter 시작
        }, 1000);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 160);

    if (responseData && finalType) {
      console.log("Received data:", responseData);
    } else {
      console.log("No data received.");
    }
  }, [responseData, finalType]);

  // finalType 값에 따라 배경색을 설정하는 로직
  const getBackgroundColor = (type) => {
    switch (type) {
      case "a":
        return "#f8f6f1";
      case "b":
        return "#f1f6f8";
      case "c":
        return "#f0e0f8";
      case "d":
        return "#f1f8f3";
      default:
        return "white";
    }
  };

  // finalType에 따른 타입별 정보 설정
  const getTypeSpecificData = (type) => {
    const data = {
      a: {
        title: "이불 밖은 위험해! 집이 가장 소중한 타입!",
        comment1: "OTT 구독료, 배달 혜택에 특화되어 있는 카드를 찾고 있어요",
        comment2: "쿠팡, G마켓 같은 온라인 쇼핑몰에서 쇼핑을 자주해요",
        image: "/person/home_person-removebg-preview.png",
        fontColor: "#847154",
        card1Comment:
          "배달의민족, 요기요, 영상 스트리밍, 디지털 멤버쉽 등 집에서 즐기는 모든 소비의 혜택을 보장하는 카드",
        card2Comment:
          "디지털 구독 및 디지털 결제에서 매우 강력한 혜택을 제공하는 카드",
        card3Comment:
          "쿠팡, 컬리, G마켓 등 온라인 쇼핑에서 특화된 혜택을 제공하는 온라인 쇼핑 맞춤 혜택 카드 ",
      },
      b: {
        title: "여행과 여가를 사랑하는 활동적인 타입!",
        comment1: "여행, 카페 등 밖에서 하는 활동에 많은 시간을 보내요",
        comment2: "항공권, 숙박, 카페 혜택에 특화된 카드를 선호해요",
        image: "/person/travler_person-removebg-preview.png",
        fontColor: "#5a7988",
        card1Comment:
          "커피, 택시, 항공 등 이곳저곳 돌아다니는 활동적인 타입에게 안성 맞춤 카드 ",
        card2Comment:
          "버스, 지하철, 커피, 주유, 쇼핑 활동적인 타입에게 필요한 모든 혜택 카테고리를 커버하는 만능카드",
        card3Comment: "커피, 쇼핑에서 강력한 혜택을 보장하는 카드",
      },
      c: {
        title: "소비는 과감하게! 럭셔리한 소비를 즐기는 타입!",
        comment1: "면세점, 백화점, 명품 등 큰 지출을 즐겨요",
        comment2: "프리미엄 혜택과 적립이 있는 카드를 선호해요",
        image: "/person/flex_person-removebg-preview.png",
        fontColor: "#8e59a8",
        card1Comment:
          "프리미엄 바우처, 전세계 공항라운지 무료이용, 특급 호텔 발렛파킹 서비스 등 호화로운 생활을 즐기는 타입에게 안성 맞춤 카드",
        card2Comment:
          "면세점, 백화점 등 럭셔리한 소비를 즐겨하는 타입에게 어울리는 카드",
        card3Comment:
          "프리미엄 바우처, 항공 마일리지 적립, 해외 ATM 수수료 면제 등 해외에서 다양한 혜택을 제공하는 카드",
      },
      d: {
        title: "실속을 챙기는 알뜰한 소비의 달인!",
        comment1: "공과금, 통신비, 마트 혜택을 중요하게 생각해요",
        comment2: "조건 없는 할인과 적립을 제공하는 카드를 원해요",
        image: "/person/mart_person-removebg-preview.png",
        fontColor: "#519c62",
        card1Comment:
          "공과금, 쇼핑, 마트 등 다양한 분야의 혜택을 가지고 있어 알뜰한 소비를 즐겨하는 타입에게 안성 맞춤!",
        card2Comment:
          "전월 실적 제한이 없어 과소비 없이 현명한 혜택을 받을 수 있는 알뜰한 카드",
        card3Comment:
          "반드시 나가는 고정비들에 대한 강력한 혜택을 제공하는 현명한 소비자들의 카드",
      },
    };

    return data[type] || {};
  };

  const typeData = getTypeSpecificData(finalType);

  return (
    <div className="recommendsurveyresult-container">
      {responseData ? (
        <div className="recommendsurveyresult-sections-container">
          {/* Section 1 */}
          <div
            className="recommendsurvetresult-section1"
            ref={section1Ref}
            style={{ backgroundColor: getBackgroundColor(finalType) }} // 배경색 설정
          >
            <div className="recommendsurveyresult-section1-img-container">
              <img
                className="recommendsurveyresult-section1-img"
                src={process.env.PUBLIC_URL + `${typeData.image}`}
                alt="asd"
              />
            </div>
            <div className="recommendsurveyresult-section1-container">
              {" "}
              <div className="recommendsurvetresult-section1-title">
                {typeData.title}
              </div>
              <div
                className="recommendsurvetresult-section1-comments"
                style={{ color: `${typeData.fontColor}` }}
              >
                <div className="recommendsurvetresult-section1-comment">
                  <FaCheck /> {typeData.comment1}
                </div>
                <div className="recommendsurvetresult-section1-comment">
                  <FaCheck /> {typeData.comment2}
                </div>
              </div>
            </div>
            <ArrowDown onClick={() => scrollToSection(section2Ref)} />
          </div>

          {/* Section 2 */}
          <div
            className={`recommendsurvetresult-section2 ${
              animateSection2 ? "animate-section2" : ""
            }`} // 애니메이션 활성화 시 클래스 추가
            ref={section2Ref}
          >
            <div className="recommendsurveyresult-section2-1">
              <div className="recommendsurveyresult-section2-title-description-container">
                <div
                  className="recommendsurveyresult-section2-card-title"
                  style={{ color: `${typeData.fontColor}`, fontSize: "1.4rem" }}
                >
                  {responseData.cardList[0].cardName}
                </div>
                <div className="recommendsurveyresult-section2-card-description">
                  {responseData.cardList[0].cardDescription}
                </div>
                <div className="recommendsurveyresult-section2-card-detail-description">
                  {typeData.card1Comment}
                </div>
              </div>
              <div className="recommendsurveyresult-section2-img-container">
                <RotatableImage
                  src={responseData.cardList[0].cardImgUrl}
                  alt={`${responseData.cardList[0].cardImgUrl} 이미지`}
                  className="recommendsurveyresult-section2-img"
                  rotationDirection="horizontal" // 또는 "vertical" "horizontal"
                />
              </div>
            </div>
            <div className="recommendsurveyresult-section2-2">
              <div className="recommendsurveyresult-section2-img-container">
                <RotatableImage
                  src={responseData.cardList[1].cardImgUrl}
                  alt={`${responseData.cardList[1].cardImgUrl} 이미지`}
                  className="recommendsurveyresult-section2-img"
                  rotationDirection="horizontal" // 또는 "vertical"
                />
              </div>
              <div className="recommendsurveyresult-section2-title-description-container">
                <div
                  className="recommendsurveyresult-section2-card-title"
                  style={{ color: `${typeData.fontColor}`, fontSize: "1.4rem" }}
                >
                  {responseData.cardList[1].cardName}
                </div>
                <div
                  className="recommendsurveyresult-section2-card-description"
                  style={{ color: "black", fontSize: "1.7rem" }}
                >
                  {responseData.cardList[1].cardDescription}
                </div>
                <div className="recommendsurveyresult-section2-card-detail-description">
                  {typeData.card2Comment}
                </div>
              </div>
            </div>
            <div className="recommendsurveyresult-section2-3">
              <div className="recommendsurveyresult-section2-title-description-container">
                <div
                  className="recommendsurveyresult-section2-card-title"
                  style={{ color: `${typeData.fontColor}`, fontSize: "1.4rem" }}
                >
                  {responseData.cardList[2].cardName}
                </div>
                <div
                  className="recommendsurveyresult-section2-card-description"
                  style={{ color: "black", fontSize: "1.7rem" }}
                >
                  {responseData.cardList[2].cardDescription}
                </div>
                <div className="recommendsurveyresult-section2-card-detail-description">
                  {typeData.card3Comment}
                </div>
              </div>
              <div className="recommendsurveyresult-section2-img-container">
                <RotatableImage
                  src={responseData.cardList[2].cardImgUrl}
                  alt={`${responseData.cardList[2].cardImgUrl} 이미지`}
                  className="recommendsurveyresult-section2-img"
                  rotationDirection="horizontal" // 또는 "vertical"
                />
              </div>
            </div>
            <ArrowDown onClick={() => scrollToSection(section3Ref)} />
          </div>

          {/* Section 3 */}
          <div
            className={`recommendsurvetresult-section3 ${
              animateSection3 ? "animate-section3" : ""
            }`} // 애니메이션 활성화 시 클래스 추가
            ref={section3Ref}
          >
            <div className="recommendsurvetresult-section3-title">
              <strong>원하시는 카드</strong>가 없으신가요?
            </div>
            <span style={{ fontSize: "26px", opacity: "0.8" }}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriterRef.current = typewriter; // Typewriter 인스턴스 저장
                  // 초기에는 autoStart를 false로 설정
                  typewriter
                    .typeString(
                      "소비내역 기반 결제 시뮬레이터로 정밀한 카드 추천을 받아보세요!"
                    )
                    .pauseFor(999999999);
                }}
                options={{
                  autoStart: false, // 수동으로 시작
                  loop: false,
                  delay: 55,
                }}
              />
            </span>
            <div className="cardrecommend-section2-marquee page-enter">
              <Marquee speed={130} direction="left">
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/jade-prime.png"}
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  {" "}
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/jade-classic.png"}
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/card-img/travellog-credit.png"
                    }
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/card-img/travellog-prestige-credit.png"
                    }
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/card-img/onethe-kleague.png"
                    }
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow hvr-grow">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/card-img/onethecard-living.png"
                    }
                    alt="cardimg"
                    className="cardrecommend-card-row cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/card-img/onethecard-free.png"
                    }
                    alt="cardimg"
                    className="cardrecommend-card-row cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/kakaobank.png"}
                    alt="cardimg"
                    className="cardrecommend-card-row cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/hana-1q.png"}
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/club-sk.png"}
                    alt="cardimg"
                    className="cardrecommend-card-row cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/mile1.png"}
                    alt="cardimg"
                    className="cardrecommend-card-col cardrecommend-card-img "
                  />
                </div>
                <div className="cardrecommend-card-img-container hvr-grow">
                  <img
                    src={process.env.PUBLIC_URL + "/card-img/hana-skypass.png"}
                    alt="cardimg"
                    className="cardrecommend-card-row cardrecommend-card-img "
                  />
                </div>
              </Marquee>
            </div>
            <div className="recommendsurvetresult-section3-button-container">
              {" "}
              <div
                className="recommendsurvetresult-section3-button"
                onClick={() =>
                  navigate("/cardrecommend/recommend-choice/certificate-form")
                }
              >
                좋아요!
              </div>
              <div
                className="recommendsurvetresult-section3-button"
                onClick={() => navigate("/cardrecommend/recommend-choice")}
              >
                다음에 할게요
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mycard-loading-container">
          <img
            src={process.env.PUBLIC_URL + "/img/img_loading.gif"}
            alt="loader"
          />
          <br />
          <div style={{ color: "white", fontSize: "1.3rem" }}>
            잠시만 기다려주세요...
          </div>
        </div>
      )}
    </div>
  );
}

const ArrowDown = ({
  onClick,
  size = "80",
  position = "absolute",
  top = "84vh",
}) => {
  return (
    <div
      className="arrowDown"
      style={{
        position: position,
        display: "flex",
        justifyContent: "center",
        top: top,
      }}
    >
      <MdKeyboardDoubleArrowDown size={size} onClick={onClick} />
    </div>
  );
};
