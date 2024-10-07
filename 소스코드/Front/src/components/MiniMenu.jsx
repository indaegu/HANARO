import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/hover.css";

export default function MiniMenu() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="minimenu-container">
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={2.5}
        // centeredSlides={true} // true 로 하면 해당 슬라이드가 중앙에 배치됨
        spaceBetween={10}
        // pagination={{
        //   type: "progressbar",
        // }}
        // navigation={true}
        // speed={300} // 슬라이드 이동 속도
        // loop={true} // 슬라이드가 끝없이 반복되도록 설정
        // autoplay={{
        //   delay: 1000, // 지연 없이 연속적으로 슬라이드 이동
        //   disableOnInteraction: false, // 사용자가 슬라이드를 터치해도 자동 재생 유지
        // }}
        virtual
      >
        <SwiperSlide key={4} virtualIndex={4}>
          <div className="minimenu-div minimenu-div4 hvr-icon-pulse">
            <div className="minimenu-text">
              <h4>내 소비 현명 했을까?</h4>
              <span>지금 바로 확인하기</span>
            </div>
            <div className="minimenu-img">
              <img
                src={process.env.PUBLIC_URL + "./img/3d-medical-chart.png"}
                className="minimenu-img-individual hvr-icon"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={2} virtualIndex={2}>
          <div className="minimenu-div minimenu-div2 hvr-icon-bounce">
            <div className="minimenu-text">
              <h4>내 주변 혜택 가맹점</h4>
              <span>지금 바로 확인하기</span>
            </div>
            <div className="minimenu-img">
              <img
                src={process.env.PUBLIC_URL + "./img/3d-map-section3.png"}
                className="minimenu-img-individual hvr-icon"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={1} virtualIndex={1}>
          <div className="minimenu-div minimenu-div1 hvr-icon-grow-rotate">
            <div className="minimenu-text ">
              <h4>카드 실적 및 혜택</h4>
              <span>지금 바로 확인하기</span>
            </div>
            <div className="minimenu-img">
              <img
                src={process.env.PUBLIC_URL + "./img/3d-card-section2.png"}
                className="minimenu-img-individual hvr-icon"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide key={3} virtualIndex={3}>
          <div className="minimenu-div minimenu-div3 hvr-icon-wobble-horizontal">
            <div className="minimenu-text">
              <h4>나에게 맞는 카드 추천</h4>
              <span>지금 바로 확인하기</span>
            </div>
            <div className="minimenu-img">
              <img
                src={
                  process.env.PUBLIC_URL + "./img/3d-cardrecommand-section3.png"
                }
                className="minimenu-img-individual hvr-icon"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
