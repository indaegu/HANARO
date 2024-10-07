import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import RotatableImage from "../components/RotatableImage";

export default function CardSummary() {
  const [cardSummaryData, setCardSummaryData] = useState([]);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // 로딩 상태를 true로 설정
    axios
      .post("https://hana-ro-backend.site:8080/api/login-block/card-summary", {
        userId: `${user.id}`,
        token: token,
      })
      .then((response) => {
        if (response.data.success) {
          setCardSummaryData(response.data.data.cardDataList);
          setTimeout(() => {
            setIsLoading(false); // 데이터를 모두 불러온 후 0.5초 뒤에 로딩 상태를 false로 설정
          }, 500); // 0.5초 대기
        } else {
          console.error("Failed to fetch data:", response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="cardsummury-container">
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
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{ type: "progressbar" }}
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {cardSummaryData.map((card, index) => (
              <SwiperSlide key={index}>
                <CardComponent
                  imgUrl={card.cardImgUrl}
                  title={card.cardName}
                  cardNumber={card.cardNumber}
                  cardAmount={card.amount.toLocaleString()}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}

function CardComponent({ imgUrl, title, cardNumber, cardAmount }) {
  return (
    <Card maxW="95%" maxH="80%">
      <CardBody
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Text>{cardAmount}</Text> */}

        <div className="cardsummury-title">
          {title + " " + "(" + cardNumber.slice(-4) + ")"}
        </div>
        <div className="cardsummury-img-container">
          <RotatableImage
            src={imgUrl}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            rotationDirection="horizontal"
          />
        </div>
        <button className="cardsummury-custom-button hvr-back-pulse">
          상세정보 확인하기
        </button>
      </CardBody>
    </Card>
  );
}
