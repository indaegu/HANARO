import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";
import "../style/CardFind.css";
import Typewriter from "typewriter-effect";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import RotatableImage from "../components/RotatableImage";

function CardFind() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [popularCards, setPopularCards] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("https://hana-ro-backend.site:8080/api/card-find/popular-card")
      .then((response) => {
        if (response.data.success) {
          setPopularCards(response.data.data);
          setIsLoading(false); // 데이터가 성공적으로 받아진 후 로딩 상태를 해제
        } else {
          Swal.fire({
            icon: "error",
            title: "예기치 못한 에러가 발생했습니다...",
            text: response.data.message,
          });
          setIsLoading(false); // 에러가 발생한 경우에도 로딩 상태를 해제
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        Swal.fire({
          icon: "error",
          title: "네트워크 에러",
          text: "서버로 부터 카드 데이터를 받아오는데 실패 했어요...",
        });
        setIsLoading(false); // 네트워크 에러가 발생한 경우에도 로딩 상태를 해제
      });
  }, []);

  return (
    <>
      <div className="cardfind-back">
        <div className="cardfind-container page-enter">
          {isLoading ? (
            <span className="login-loader"></span>
          ) : (
            <>
              <div className="cardfind-bestcard-container">
                <div className="cardfind-bestcard-top">
                  <h3 className="cardfind-bestcard-title">
                    <strong>놓치지 마세요! 이달의 인기 카드</strong>{" "}
                    <Popover placement="right-end">
                      <PopoverTrigger>
                        <IoMdInformationCircleOutline
                          size={38}
                          style={{ opacity: "0.6", cursor: "help" }}
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        className="custom-popover-content"
                        style={{
                          width: "30rem", // Popover 크기를 키움
                          padding: "20px", // 내부 패딩 추가
                          fontSize: "1rem",
                          backgroundColor: "rgba(255, 255, 255,0.9)",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: "15px" }}>
                            <h5>
                              <strong>인기순위 산정 방법</strong>
                            </h5>
                          </div>

                          <p style={{ color: "#21897E", fontWeight: "bold" }}>
                            카드상세페이지 PV + 카드 신청 전환수 * 10 = 인기점수
                          </p>
                          <p>카드 차트는 실시간으로 업데이트 됩니다.</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </h3>
                  <button
                    className="cardfind-bestcard-button hvr-back-pulse"
                    onClick={() => {
                      navigate("/card-product");
                    }}
                  >
                    전체보기
                  </button>
                </div>
                <div className="cardfind-bestcard-down">
                  <Marquee
                    speed={70}
                    direction="left"
                    pauseOnHover={true}
                    gradient={true}
                    gradientWidth={50}
                  >
                    {popularCards.map((card, index) => (
                      <PopularCard
                        key={index}
                        cardImgUrl={card.cardImgUrl}
                        cardName={card.cardName}
                        cardId={card.cardId}
                      />
                    ))}
                  </Marquee>
                </div>
              </div>
              <div className="cardfind-benefits-top3-cards-container">
                <div className="cardfind-benefit-top3-cards-top">
                  <h3 className="cardfind-benefit-top3-cards-title">
                    <strong>혜택별 인기차트</strong>
                  </h3>
                  <div> </div>
                </div>
                <div className="cardfind-benefit-top3-cards-article cardfind-benefit-top3-cards-article1">
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-tour.jpg"}
                    text={"여행"}
                    link={"/findcard/TRAVEL"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-mart.jpg"}
                    text={"마트"}
                    link={"/findcard/MART"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-bus.jpg"}
                    text={"교통"}
                    link={"/findcard/TRANSIT"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-oil.jpg"}
                    text={"주유"}
                    link={"/findcard/FUEL"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-coffee.jpg"}
                    text={"커피"}
                    link={"/findcard/COFFEE"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-delivery.jpg"}
                    text={"배달"}
                    link={"/findcard/DELIVERY"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-shopping.jpg"}
                    text={"온라인쇼핑"}
                    link={"/findcard/ONLINE_SHOP"}
                  />
                  <BenfitTop3Card
                    backImgUrl={"/benefit-top3-card-img/tips_p-mobile.jpg"}
                    text={"통신"}
                    link={"/findcard/TELECOM"}
                  />
                </div>
              </div>
              <div className="cardfind-card-type-popularity-container">
                <div className=" cardfind-card-type-section1">
                  <h3 className="cardfind-card-type-title">
                    <strong>혜택유형별 인기차트</strong>
                  </h3>
                  <div className="cardfind-benefit-type-container">
                    <div className="cardfind-benefit-type-section">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/card-type-img/tips_type_coin.png"
                        }
                        alt=""
                      />
                      <div>포인트형</div>
                    </div>
                    <hr
                      style={{
                        border: "1px solid #808080",
                        width: "1",
                        height: "50%",
                      }}
                    />

                    <div className="cardfind-benefit-type-section">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/card-type-img/tips_type_airplane.png"
                        }
                        alt=""
                      />{" "}
                      <div>바우처</div>
                    </div>
                    <hr
                      style={{
                        border: "1px solid #808080",
                        width: "1",
                        height: "50%",
                      }}
                    />

                    <div className="cardfind-benefit-type-section">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/card-type-img/tips_type_percent.png"
                        }
                        alt=""
                      />
                      <div>할인형</div>
                    </div>
                  </div>
                </div>
                <div className=" cardfind-card-type-section2">
                  <h3 className="cardfind-card-type-title">
                    <strong>카드타입별 인기차트</strong>
                  </h3>
                  <div className="cardfind-card-type-container">
                    <div className="cardfind-card-type-section">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/card-type-img/blue-card.png"
                        }
                        alt="blue-card.png"
                      />
                      <div className="cardfind-card-type-section-name">
                        신용카드
                      </div>
                    </div>
                    <hr
                      style={{
                        border: "1px solid #808080",
                        width: "1",
                        height: "50%",
                      }}
                    />
                    <div className="cardfind-card-type-section">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/card-type-img/pink-card.png"
                        }
                        alt="pink-card.png"
                      />
                      <div className="cardfind-card-type-section-name">
                        체크카드
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="cardfind-goto-all-card hvr-back-pulse"
                onClick={() => {
                  navigate("/card-product");
                }}
              >
                <Typewriter
                  options={{
                    strings: ["더 다양한 카드를 찾으시나요? 모든 카드 찾기!"],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    pauseFor: 10000,
                  }}
                />{" "}
                {/* <IoIosArrowForward size={40} /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function BenfitTop3Card({ backImgUrl, text, link }) {
  let navigate = useNavigate();

  return (
    <div
      className="cardfind-benefit-top3-card-container"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + backImgUrl})` }}
      onClick={() => {
        navigate(link);
      }}
    >
      <div className="cardfind-benefit-top3-card-text">
        {text}
        <strong>TOP3</strong>
      </div>
    </div>
  );
}

function PopularCard({ cardImgUrl, cardName, cardId }) {
  const navigate = useNavigate();

  function CardProductDetail(cardId) {
    navigate(`/card-product/${cardId}`);
  }

  return (
    <>
      <div className="popularcard-container">
        <div
          className="popularcard-img-container"
          onClick={() => {
            CardProductDetail(cardId);
          }}
        >
          <RotatableImage
            src={cardImgUrl}
            alt={`${cardName} 이미지`}
            className="popularcard-img"
            style={{}}
            rotationDirection="horizontal" // 또는 "vertical"
          />
        </div>
        <div className="popularcard-title">{cardName}</div>
      </div>
    </>
  );
}

export default CardFind;
