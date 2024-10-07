import { useEffect, useState } from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import "../style/CardChartTop3.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import Swal from "sweetalert2";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function CardChartTop3() {
  const { categoryId } = useParams();
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 130);
    axios
      .get(
        `https://hana-ro-backend.site:8080/api/card-find/card-top3?categoryId=${categoryId}`
      )
      .then((response) => {
        if (response.status === 200) {
          setCardData(response.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "예기치 못한 에러가 발생했습니다...",
            text:
              response.data.message ||
              "예기치 못한 에러가 발생했습니다.. 나중에 다시 시도해주세요",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        Swal.fire({
          icon: "error",
          title: "네트워크 에러",
          text: "서버로부터 카드 데이터를 받아오는데 실패했습니다.",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div
        className="cardcharttop3-back page-enter"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/img/top3_bg.jpg"
          })`,
          //   backgroundImage: `url(${
          //     process.env.PUBLIC_URL + "/img/top3_bg_white.jpg"
          //   })`,
        }}
      >
        <div className="cardcharttop3-container">
          {isLoading ? (
            <span className="login-loader"></span>
          ) : (
            <>
              {" "}
              <h1
                style={{
                  color: "#ffdda1",
                  fontSize: "3.5rem",
                  marginTop: "1rem",
                  fontFamily: "notoserif",
                }}
              >
                - TOP3 -
              </h1>
              <h3
                style={{
                  color: "#ffdda1",
                  opacity: "0.75",
                  fontSize: "1.5rem",
                  fontFamily: "notoserif",
                }}
              >
                <strong style={{ fontSize: "2rem" }}>
                  {cardData.categoryName}
                </strong>{" "}
                카테고리에서 가장 인기 있는 카드들만 모아봤어요
              </h3>
              <EmblaCarousel
                slides={SLIDES}
                options={OPTIONS}
                data={cardData}
              />{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
}
