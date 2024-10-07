import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "animate.css";
import "../style/MyCard.css";
import Swal from "sweetalert2"; // SweetAlert2 임포트
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { disassemble } from "es-hangul"; // es-hangul의 disassemble 함수 import
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";
import RotatableImage from "../components/RotatableImage";

function MyCard() {
  const user = useSelector((state) => state.user.userInfo);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false); // 로드 완료 상태 관리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [allBenefits, setAllBenefits] = useState([]); // 모든 혜택 리스트
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(false); // 컴포넌트 마운트 시 항상 로드 상태를 초기화
    const fetchCards = async () => {
      if (!user || !user.id) {
        Swal.fire({
          title: "회원전용",
          html: "로그인이 필요한 서비스입니다.<br>로그인을 먼저 진행해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
        return;
      }

      try {
        const url = `https://hana-ro-backend.site:8080/api/mycard`;
        setTimeout(async () => {
          // 특정시간뒤에 데이터를 받아오도록 설정
          const response = await axios.post(url, { userId: user.id });
          setCards(response.data.data);
          setIsLoading(false);
          setLoaded(true); // 데이터 로드가 완료되면 로드 완료 상태를 true로 설정

          // 모든 혜택 리스트 수집 및 중복 제거
          const allBenefitsArray = response.data.data
            .flatMap((card) => card.cardBenefitList)
            .filter((value, index, self) => self.indexOf(value) === index); // 중복 제거
          setAllBenefits(allBenefitsArray);
        }, 100);
      } catch (error) {
        console.error("카드 정보를 가져오는데 실패했습니다.", error);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [user, navigate]);

  const includesChosung = (text, query) => {
    const disassembledText = Object.values(disassemble(text)).join(""); // es-hangul로 분해
    const disassembledQuery = Object.values(disassemble(query)).join("");
    return disassembledText.includes(disassembledQuery);
  };

  // 혜택 이름을 포함한 필터링
  const filteredCards = cards.filter((card) => {
    const matchesCardName = includesChosung(card.cardName, searchTerm);
    const matchesBenefits = card.cardBenefitList.some((benefit) =>
      includesChosung(benefit, searchTerm)
    );
    return matchesCardName || matchesBenefits;
  });
  const handleTagClick = (benefit) => {
    setSearchTerm(benefit); // 클릭한 태그를 검색창에 입력된 것처럼 처리
  };

  return (
    <>
      <div className="mycard-back">
        {isLoading ? (
          <>
            {" "}
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
          </>
        ) : (
          <>
            <div className="mycard-container">
              <div className="mycard-header animate__animated animate__fadeIn">
                <div className="mycard-header-content">
                  <h1>내 카드 정보</h1>
                  <span>내 카드의 정보와 실적 구간을 한번에 확인해보세요</span>
                </div>
                <input
                  type="text"
                  placeholder="  혜택을 검색해보세요 ex) 마트, 영화, 카페..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar-2"
                />
                {/* 혜택 태그 리스트 */}
                <div className="benefit-tags-container">
                  <div className="benefit-tags-scroll">
                    <span style={{ fontSize: "1.5rem" }}>보유중인 혜택 : </span>
                    <div className="benefit-tags">
                      {allBenefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="benefit-tag"
                          onClick={() => handleTagClick(benefit)} // 태그 클릭 시 검색어로 설정
                        >
                          # {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {filteredCards.length > 0 ? (
                filteredCards.map((card, index) => (
                  <CardDetail
                    key={card.cardNumber}
                    card={card}
                    number={index}
                    loaded={loaded}
                  />
                ))
              ) : (
                <div className="no-results">검색 결과가 없습니다.</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function CardDetail({ card, number, loaded }) {
  const maxPerformance =
    card.performanceBracket.length > 0
      ? Math.max(...card.performanceBracket)
      : card.usedAmount; // performanceBracket이 없으면 사용 금액을 최대값으로 설정

  const customMarkPosition =
    card.customPerformanceBracket > 0
      ? (card.customPerformanceBracket / maxPerformance) * 100
      : null;

  const usedWidth = Math.min((card.usedAmount / maxPerformance) * 100, 100);

  const amountBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    if (amountBarRef.current && loaded) {
      timeoutId = setTimeout(() => {
        amountBarRef.current.style.setProperty("--used-width", `${usedWidth}%`);
        amountBarRef.current.classList.add("animated");
      }, (number + 1) * 300);
    }

    return () => clearTimeout(timeoutId); // 다른 페이지 이동시 함수를 정지 해줘야 에러가 안남
  }, []);

  const navigateToDetail = () => {
    const encodedCardNumber = Buffer.from(card.cardNumber).toString("base64"); // base64로 인코딩
    const encryptedCardNumber = CryptoJS.AES.encrypt(
      card.cardNumber,
      process.env.REACT_APP_AES_SECRET_KEY
    ).toString(); //aes 암호화 알고리즘으로 암호화
    navigate(`/mycard/${encodedCardNumber}`);
  };

  return (
    <div
      className={`mycard-detail-${number} hvr-float mycard-detail mycard-animation hvr-icon-forward animate__animated animate__fadeIn`}
      style={{ animationDelay: `${number * 0.3}s` }}
      onClick={navigateToDetail}
    >
      <div className="mycard-detail-section1">
        <div className="mycard-detail-img-container">
          {" "}
          <RotatableImage
            src={card.cardImage}
            alt={`${card.cardName} 이미지`}
            className="card-img"
            style={{ width: "9rem", height: "9rem" }}
          />
        </div>
        <div>
          <h2>{card.cardName}</h2>
          <p>카드 번호: {card.cardNumber}</p>
          <p>만료일: {card.expirationDate}</p>
        </div>
      </div>
      <div className="mycard-detail-section2">
        <p>사용 금액: {card.usedAmount.toLocaleString()}원</p>
        <div className="performance-bar">
          {card.performanceBracket.length > 0 ? (
            card.performanceBracket.map((value, index) => {
              if (value > 0) {
                const isReached = (value / maxPerformance) * 100 <= usedWidth;
                return (
                  <div
                    className={`performance-mark ${isReached ? "reached" : ""}`}
                    style={{ left: `${(value / maxPerformance) * 100}%` }}
                    key={index}
                  />
                );
              }
            })
          ) : (
            <div
              className="performance-mark reached"
              style={{ left: "100%" }}
            />
          )}

          {/* customPerformanceBracket이 0이 아닐 때만 마크 표시 */}
          {/* {customMarkPosition !== null && (
            <div
              className="custom-mark"
              style={{ left: `${customMarkPosition}%` }}
            >
              <div className="custom-flag">★</div>
            </div>
          )} */}
          <div ref={amountBarRef} className="amount-used-bar" />
        </div>
        {/* maxPerformance이 없을 때는 "실적 구간이 없는 카드" 표시 */}
        {card.performanceBracket.length > 1 ? (
          <p>
            다음 구간까지 남은 금액:{" "}
            {card.amountUntilNextBracket.toLocaleString()}원
          </p>
        ) : (
          <p>실적 관계없이 혜택제공</p>
        )}
      </div>
      <div className="mycard-actions mycard-detail-section3">
        <IoIosArrowForward
          className="hvr-icon"
          style={{ fontSize: "35px", position: "relative", right: "-80px" }}
        ></IoIosArrowForward>
      </div>
    </div>
  );
}

export default MyCard;
