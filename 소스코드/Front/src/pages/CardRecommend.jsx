import "../style/CardRecommend.css";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { IoIosArrowForward } from "react-icons/io";
import Typewriter from "typewriter-effect";

export default function CardRecommend() {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <>
      <div className="cardrecommend-container ">
        <div className="cardrecommend-section1-title page-enter">
          <h1 style={{ marginBottom: "20px" }}>
            {user && user.name ? (
              <>
                <strong>{user.name}님</strong>을 위한 카드추천
              </>
            ) : (
              <>
                <strong>손님</strong>을 위한 카드추천
              </>
            )}
          </h1>
          <span style={{ fontSize: "26px", opacity: "0.8" }}>
            <Typewriter
              options={{
                strings: [
                  "소비패턴 기반 결제 시뮬레이터와, 간단한 설문조사로 카드 추천을 받아보세요!",
                ],
                autoStart: true,
                loop: false,
                delay: 75,
                pauseFor: 999999,
              }}
            />
          </span>
        </div>
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
                src={process.env.PUBLIC_URL + "/card-img/travellog-credit.png"}
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
                src={process.env.PUBLIC_URL + "/card-img/onethe-kleague.png"}
                alt="cardimg"
                className="cardrecommend-card-col cardrecommend-card-img "
              />
            </div>
            <div className="cardrecommend-card-img-container hvr-grow hvr-grow">
              <img
                src={process.env.PUBLIC_URL + "/card-img/onethecard-living.png"}
                alt="cardimg"
                className="cardrecommend-card-row cardrecommend-card-img "
              />
            </div>
            <div className="cardrecommend-card-img-container hvr-grow">
              <img
                src={process.env.PUBLIC_URL + "/card-img/onethecard-free.png"}
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
        <div className="cardrecommend-section3-button hvr-icon-forward page-enter">
          <Link
            to="/cardrecommend/recommend-choice"
            className="cardrecommend-button"
          >
            START
          </Link>
          <IoIosArrowForward
            className="hvr-icon"
            style={{ fontSize: "35px" }}
          ></IoIosArrowForward>
        </div>
      </div>
    </>
  );
}
