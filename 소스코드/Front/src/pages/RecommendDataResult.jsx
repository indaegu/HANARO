import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/RecommendData.css";
import { useSelector } from "react-redux";
import AnimatedNumberCount from "../components/AnimatedNumberCount";
import AnimatedNumber from "../components/AnimatedNumber";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import RotatableImage from "../components/RotatableImage";

export default function RecommendDataResult() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { responseData } = location.state || {};
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    console.log(responseData);
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        const url = `https://hana-ro-backend.site:8080/api/card-recommend/result-with-data-pl`;
        setTimeout(async () => {
          const response = await axios.post(url, {
            token: token,
            userId: user.id,
            approvals: responseData,
          });
          setData(response.data);
        }, 100);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  // 애니메이션을 넣을 문자열
  // '데이터 불러오는 중...' 문자열을 배열로 표현
  const letters = [" ", ".", " ", ".", " ", "."];

  return (
    <>
      <div className="recommenddata-back">
        <div className="recommenddata-container">
          {data ? (
            <div className="page-enter">
              <div className="recommenddata-top">
                <h1>
                  {user.name}님에게{" "}
                  <span style={{ color: " rgb(49, 130, 246, 1)" }}>
                    안성맞춤
                  </span>{" "}
                  카드
                </h1>
                <span style={{ fontSize: "1.1rem" }}>
                  손님의 <strong>최근 1년</strong> 소비내역에 각 카드 혜택을
                  적용해 시뮬레이션을 돌린 결과입니다.
                </span>
              </div>

              <div className="recommenddata-cards-container">
                {" "}
                {data.data.map((card, index) => (
                  <RecommendCard key={index} card={card} num={index} /> // Card 컴포넌트 사용
                ))}
              </div>
            </div>
          ) : (
            <div className="recommenddata-loading-container">
              <video className="recommenddata-loading-mp4" autoPlay muted loop>
                <source
                  src={process.env.PUBLIC_URL + "/mp4/card.mp4"}
                  type="video/mp4"
                />
              </video>
              <div className="waviy">
                분석중
                {letters.map((letter, index) => (
                  <span key={index} style={{ "--i": `${index + 1}` }}>
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function RecommendCard({ card, num }) {
  return (
    <div className="recommenddata-card">
      <div className="recommenddata-section1">
        <div className="recommenddata-section1-top">
          <span style={{ fontSize: "2rem", opacity: "0.7" }}>
            {num + 1}위{" "}
            <span
              style={{
                fontSize: "1.5rem",
                color: "rgb(49, 130, 246)",
                opacity: "1",
              }}
            >
              피킹률 : 
              <AnimatedNumberCount value={card.pickingRate.toFixed(2)} />%
            </span>
          </span>
          <span style={{ fontSize: "2.4rem" }}>{card.cardProductName}</span>
          <button
            type="button"
            onClick={() => (window.location.href = card.cardApplyUrl)}
            className="recommenddata-section1-button"
          >
            신청하기
          </button>
        </div>
        <div className="recommenddata-benefit-description-list">
          {card.benefitsDescriptions.map((benefit, index) => (
            <div className="recommenddata-benefit-description" key={index}>
              {index + 1}. {benefit.benefitDescription}
            </div>
          ))}
        </div>
      </div>
      <div className="recommenddata-section2">
        <div className="recommenddata-card-image-container">
          <RotatableImage
            src={card.cardProductImgUrl}
            alt={`${card.cardProductName} 이미지`}
            className="recommenddata-card-image"
            style={{}}
            rotationDirection="horizontal" // 또는 "vertical"
          />
        </div>
      </div>
      <div className="recommenddata-section3">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab style={{ fontSize: "1.3rem", fontFamily: "notosans" }}>
              1년
            </Tab>
            <Tab style={{ fontSize: "1.3rem", fontFamily: "notosans" }}>
              한 달
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {" "}
              <div className="recommenddata-benefit-container">
                <span style={{ fontSize: "1.5rem" }}>
                  1년 동안 썼다면 더 받았을 혜택
                </span>
                <span
                  style={{
                    fontSize: "2rem",
                    color: "rgb(49, 130, 246)",
                    marginBottom: "2rem",
                  }}
                >
                  총 <AnimatedNumber value={card.benefitAllAmount} />
                </span>
                <div className="recommenddata-benefit-list">
                  <MdKeyboardDoubleArrowDown className="recommenddata-arrrow" />
                  {card.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="recommenddata-benefit-list-container"
                    >
                      <div className="recommenddata-benefit-list-inner1">
                        {" "}
                        <img
                          src={benefit.benefitIcon}
                          alt="아이콘"
                          className="recommenddata-benefit-icon"
                        />
                        <div className="recommenddata-benefit-list-inner2">
                          {" "}
                          <span> {benefit.amount.toLocaleString()}원</span>
                          <span> {benefit.benefitCategoryName}</span>
                        </div>
                      </div>
                      {benefit.benefitAmount.toLocaleString()}원
                    </span>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              {" "}
              <div className="recommenddata-benefit-container">
                <span style={{ fontSize: "1.5rem" }}>
                  한 달 동안 썼다면 더 받았을 혜택
                </span>
                <span
                  style={{
                    fontSize: "2rem",
                    color: "rgb(49, 130, 246)",
                    marginBottom: "2rem",
                  }}
                >
                  총 <AnimatedNumber value={card.benefitAllAmount / 12} />
                </span>
                <div className="recommenddata-benefit-list">
                  <MdKeyboardDoubleArrowDown className="recommenddata-arrrow" />
                  {card.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="recommenddata-benefit-list-container"
                    >
                      <div className="recommenddata-benefit-list-inner1">
                        {" "}
                        <img
                          src={benefit.benefitIcon}
                          alt="아이콘"
                          className="recommenddata-benefit-icon"
                        />
                        <div className="recommenddata-benefit-list-inner2">
                          <span>
                            {Math.round(benefit.amount / 12).toLocaleString()}원
                          </span>
                          <span> {benefit.benefitCategoryName}</span>
                        </div>
                      </div>
                      {Math.round(benefit.benefitAmount / 12).toLocaleString()}
                      원
                    </span>
                  ))}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
