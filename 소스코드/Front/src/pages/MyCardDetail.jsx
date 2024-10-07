import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/MyCard.css";
import "../style/MyCardDetail.css";
import AnimatedNumber from "../components/AnimatedNumber";
import AnimatedNumberCount from "../components/AnimatedNumberCount";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { MdOutlineStorefront } from "react-icons/md";
import RotatableImage from "../components/RotatableImage";

export default function MyCardDetail() {
  const { cardId } = useParams();
  const [cardDetails, setCardDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const decodedCardNumber = Buffer.from(cardId, "base64").toString("utf-8");

  // 이미지 매핑 객체 생성
  const transactionIconMap = {
    주유: process.env.PUBLIC_URL + "/img/icons/fuel.png",
    택시: process.env.PUBLIC_URL + "/img/icons/taxi.png",
    대중교통: process.env.PUBLIC_URL + "/img/icons/public_transport.png",
    마트: process.env.PUBLIC_URL + "/img/icons/mart.png",
    온라인쇼핑: process.env.PUBLIC_URL + "/img/icons/online_shopping.png",
    백화점: process.env.PUBLIC_URL + "/img/icons/department_store.png",
    여행: process.env.PUBLIC_URL + "/img/icons/travel.png",
    해외결제: process.env.PUBLIC_URL + "/img/icons/overseas_payment.png",
    항공: process.env.PUBLIC_URL + "/img/icons/airline.png",
    영화: process.env.PUBLIC_URL + "/img/icons/movies.png",
    커피: process.env.PUBLIC_URL + "/img/icons/coffee.png",
    통신: process.env.PUBLIC_URL + "/img/icons/communication.png",
    구독: process.env.PUBLIC_URL + "/img/icons/subscription.png",
    조건없음: process.env.PUBLIC_URL + "/img/icons/default.png",
    편의점: process.env.PUBLIC_URL + "/img/icons/convenience_store.png",
    공과금: process.env.PUBLIC_URL + "/img/icons/utility_bills.png",
    의료: process.env.PUBLIC_URL + "/img/icons/medical.png",
    딜리버리: process.env.PUBLIC_URL + "/img/icons/delivery.png",
    면세: process.env.PUBLIC_URL + "/img/icons/duty_free.png",
  };

  // 아이콘을 반환하는 함수
  function getTransactionIcon(transactionName) {
    // 매핑된 아이콘이 있는지 확인하고, 없으면 기본 아이콘 반환
    return (
      transactionIconMap[transactionName] ||
      process.env.PUBLIC_URL + "/img/icons/default.png"
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 스크롤을 맨 위로
    const fetchData = async () => {
      setIsLoading(true);
      setCardDetails(null); // 상태 초기화
      try {
        const decryptedCardNumber = CryptoJS.AES.decrypt(
          cardId,
          process.env.REACT_APP_AES_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        const response = await axios.post(
          `https://hana-ro-backend.site:8080/api/mycard/detail`,
          {
            cardId: `${decodedCardNumber}`,
            token: "123",
          }
        );
        setCardDetails(response.data.data); // 카드 정보 저장
      } catch (error) {
        console.error("Error fetching card details:", error); // 에러 처리
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchData();
  }, [cardId]); // cardId가 변경될 때만 useEffect 재실행

  const formatNumber = (number) => {
    return number.toLocaleString() + "원"; // Format numbers with commas
  };

  const groupTransactionsByDate = (transactions) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = transaction.transactionDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});

    // 날짜별로 그룹을 내림차순으로 정렬
    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // 날짜 내림차순 정렬
      .map(([date, transactions]) => ({
        date,
        transactions,
      }));
  };
  const calculateTotalAmountForDate = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return total + transaction.transactionAmount;
    }, 0);
  };

  // 피킹률 계산 함수
  const calculatePickingRate = (usedBenefitAmount, usedAmount) => {
    return usedAmount > 0
      ? ((usedBenefitAmount / usedAmount) * 100).toFixed(2)
      : 0;
  };

  return (
    <>
      <div className="mycard-back">
        {isLoading ? (
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
        ) : (
          <div className="mycard-container animate__animated animate__fadeIn">
            <>
              <div className="mycarddetail-title">
                <h1>카드 상세정보</h1>
                <span>카드의 혜택과 잔여혜택을 확인해보세요</span>
              </div>
              <div className="mycarddetail-container">
                <div className="mycarddetail-top-container">
                  {" "}
                  <div className="mycarddetail-section1">
                    <div style={{ fontSize: "25px" }}>
                      {cardDetails.cardName}
                    </div>
                    <h3>
                      <AnimatedNumber value={cardDetails.usedAmount} />{" "}
                    </h3>
                    <p style={{ fontSize: "20px" }}>
                      할인 받은 금액 :{" "}
                      <AnimatedNumber
                        value={cardDetails.currentRange.usedBenefitAmount}
                      />
                    </p>
                    <p style={{ fontSize: "20px", color: "#007bff" }}>
                      피킹률 :{" "}
                      <AnimatedNumberCount
                        value={calculatePickingRate(
                          cardDetails.currentRange.usedBenefitAmount,
                          cardDetails.usedAmount
                        )}
                      />
                      %
                    </p>
                  </div>
                  <div className="mycarddetail-section2">
                    {" "}
                    <RotatableImage
                      src={cardDetails.cardImage}
                      alt={`${cardDetails.cardName} 이미지`}
                      className=""
                      style={{}}
                      rotationDirection="vertical" // 또는 "vertical"
                    />
                  </div>
                </div>
                <Tabs isFitted variant="enclosed" style={{ marginTop: "2rem" }}>
                  <TabList mb="1em">
                    <Tab style={{ fontSize: "1.3rem", fontFamily: "notosans" }}>
                      혜택상세
                    </Tab>
                    <Tab style={{ fontSize: "1.3rem", fontFamily: "notosans" }}>
                      결제내역
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <div className="mycardtetail-section3">
                        <div style={{ fontSize: "2rem" }}>
                          {/* {cardDetails.currentRange.rangeNum}구간 혜택 적용중 */}
                          상세한 혜택을 확인해보세요
                        </div>
                        <div
                          onClick={() => onOpen()}
                          className="mycarddetail-modal-button hvr-icon-forward"
                        >
                          <div className="mycarddetail-modal-button-inner">
                            {" "}
                            <strong>{cardDetails?.cardName}</strong>의 모든
                            혜택과 약관을 확인해보세요
                            <IoIosArrowForward
                              className="hvr-icon"
                              style={{}}
                            ></IoIosArrowForward>
                          </div>
                        </div>
                      </div>
                      {/* <p>카드 번호: {cardDetails.cardNumber}</p> */}
                      {/* <p>카드 상태: {cardDetails.cardStatus}</p> */}
                      <ul className="benefit-list">
                        {cardDetails.currentRange.benefits.map(
                          (benefit, index) => {
                            // 혜택 한도가 9999999999인 경우 혜택이 없음을 표시
                            const benefitLimit =
                              benefit.type === "CASHBACK"
                                ? benefit.cashBackAmount
                                : benefit.discountAmount;

                            // 혜택 한도가 9999999999인 경우 '혜택 없음'으로 표시
                            const displayBenefitLimit =
                              benefitLimit === 9999999999
                                ? "혜택 없음"
                                : formatNumber(benefitLimit);

                            // 혜택 한도가 9999999999가 아닌 경우 진행률 계산
                            const progressWidth =
                              benefitLimit > 0 && benefitLimit !== 9999999999
                                ? (benefit.usedAmount / benefitLimit) * 100
                                : 0;

                            return (
                              <li key={index}>
                                <div className="mycarddetail-section5">
                                  <div>
                                    <strong>{benefit.description}</strong>
                                  </div>
                                  {/* <div>
                                    {benefit.type === "CASHBACK"
                                      ? `${displayBenefitLimit} 캐시백`
                                      : `${displayBenefitLimit} 할인`}
                                  </div> */}
                                </div>

                                <div className="progress-bar">
                                  <div
                                    className="progress-bar-filled"
                                    style={{
                                      width: `${progressWidth}%`,
                                      backgroundColor:
                                        progressWidth > 0 ? "#4caf50" : "#ccc", // 진행률이 0%일 때는 회색으로 표시
                                    }}
                                  ></div>
                                </div>
                                <div className="mycarddetail-section4">
                                  <div>
                                    사용한 혜택:{" "}
                                    {formatNumber(benefit.usedAmount)}
                                  </div>
                                  <div>
                                    잔여 혜택:{" "}
                                    {benefitLimit === 9999999999
                                      ? "제한 없음"
                                      : formatNumber(benefit.remainingAmount)}
                                  </div>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <h2 style={{ marginBottom: "1.5rem" }}>결제 내역</h2>
                      <div className="mycarddetail-transaction-container">
                        {groupTransactionsByDate(
                          cardDetails.transactionDetails
                        ).map((group, index) => (
                          <div key={index} className="transaction-date-group">
                            <div className="transaction-date-header-container">
                              {" "}
                              <h3
                                className="transaction-date-header"
                                style={{ fontFamily: "notosans" }}
                              >
                                {group.date}
                              </h3>
                              <h4
                                style={{
                                  fontFamily: "notosans",
                                  fontWeight: "bold",
                                }}
                              >
                                {" "}
                                {formatNumber(
                                  calculateTotalAmountForDate(
                                    group.transactions
                                  )
                                )}
                              </h4>
                            </div>
                            <ul className="transaction-list">
                              {group.transactions.map((transaction, idx) => (
                                <>
                                  {" "}
                                  <li key={idx} className="transaction-item">
                                    <div className="transaction-item-content">
                                      <div className="transaction-info">
                                        <div className="transaction-details">
                                          {/* <MdOutlineStorefront size={30} /> */}
                                          <div className="transaction-icon-container">
                                            {" "}
                                            <img
                                              src={getTransactionIcon(
                                                transaction.transactionCategory
                                              )}
                                              alt={
                                                transaction.transactionCategory
                                              }
                                              className="transaction-icon"
                                            />
                                          </div>
                                          <span className="transaction-name">
                                            {transaction.transactionName}
                                          </span>
                                          <span className="transaction-time">
                                            {transaction.transactionTime}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="transaction-amounts">
                                        <span className="transaction-amount">
                                          {formatNumber(
                                            transaction.transactionAmount
                                          )}
                                        </span>
                                        <span className="benefit-amount">
                                          {transaction.benefitAmount > 0
                                            ? `캐시백 ${formatNumber(
                                                transaction.benefitAmount
                                              )}`
                                            : "혜택없음"}
                                        </span>
                                      </div>
                                    </div>
                                    <hr />
                                  </li>
                                </>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW="50%" minH="90%">
          <ModalHeader>{cardDetails?.cardName} 혜택 및 약관</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              id="frame"
              src={cardDetails?.pdfUrl}
              width="100%"
              height="100%"
              title="Card Benefits PDF"
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
