import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

function ADSwipe() {
  let navigate = useNavigate();

  const swiperStyle = {
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  return (
    <div className="ad-swipe-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // navigation={true}
        // pagination={{ type: "progressbar" }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        allowTouchMove={true}
        spaceBetween={100}
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        className="cursor-pointer"
      >
        <SwiperSlide
          style={swiperStyle}
          onClick={() => {
            navigate("/mycard");
          }}
          className="adswipe-container"
        >
          <div
            className="card3d-container AD-1"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/img/hanacard-back-1.png"
              })`,
              backgroundSize: "cover",
            }}
          >
            <div className="card3d-title card3d-title1">
              <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>
                여행 직구 할땐?
              </h3>
              <h1>53종 통화 무료환전 LET'S GO 통큰혜택</h1>
              <span>트래블로그 체크카드</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={swiperStyle}
          onClick={() => {
            navigate("/findcard");
          }}
        >
          <div
            className="card3d-container AD-2"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/img/hanacard-back-2.png"
              })`,
              backgroundSize: "cover",
            }}
          >
            <div className="card3d-title card3d-title2">
              <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>
                당신의 선택은 제이드
              </h3>
              <h1>
                제일 <br />
                이상적인 카드 Jade
              </h1>
              <span>JADE Classice 카드 출시</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={swiperStyle}
          onClick={() => {
            navigate("/map");
          }}
        >
          {" "}
          <div
            className="card3d-container AD-3"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/img/hanacard-back-3.png"
              })`,
              backgroundSize: "cover",
            }}
          >
            <div className="card3d-title card3d-title3">
              <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>
                나를 위한 맞춤 혜택
              </h3>
              <h1>
                iF DESIGN <br /> AWARD 2024 수상
              </h1>
              <span>원더카드 FREE+</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide style={swiperStyle}>
          {" "}
          <div
            className="card3d-container AD-4"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/img/hanacard-back-4.png"
              })`,
              backgroundSize: "cover",
            }}
          >
            <div className="card3d-title card3d-title4">
              <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>
                K리그 직관 필수템
              </h3>
              <h1>
                혜택 가득한 <br />
                축덕을 위한 카드
              </h1>
              <span>K리그 축덕 하나</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ADSwipe;
