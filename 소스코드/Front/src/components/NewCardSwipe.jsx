import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import RotatableImage from "./RotatableImage";

export default function NewCardSwipe() {
  const [isActive, setIsActive] = useState(false);
  const [allNewCards, setAllNewCards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://hana-ro-backend.site:8080/api/main/new-cards")
      .then((response) => {
        if (response.data.success) {
          setAllNewCards(response.data.data);
          setIsActive(true); // 데이터가 로드되면 활성화 상태로 전환
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        Swal.fire("Network Error", "Failed to load card data.", "error");
      });
  }, []);

  return (
    <>
      <div className="main-card-list-container">
        <div className="main-card-list-text">
          <h2>Hana</h2>
          <h2>New Cards</h2>
          <span>하나카드의 신규카드들을 확인해보세요!</span>
          <br />
          <span
            onClick={() => {
              navigate("/card-product");
            }}
          >
            <strong
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              전체보기 <IoIosArrowForward size={20} />{" "}
            </strong>
          </span>
        </div>
        <div className="main-new-card-wrapper">
          {allNewCards.map((card, index) => (
            <div key={index} className="main-new-card-container">
              <div
                className="main-new-card-individual-container-img"
                onClick={() => {
                  navigate(`/card-product/${card.cardId}`);
                }}
              >
                <RotatableImage
                  src={card.newCardImgUrl}
                  alt={`${card.newCardName} 이미지`}
                  className="main-new-card-individual"
                  style={{}}
                  rotationDirection="horizontal" // 또는 "vertical"
                />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {card.newCardName}
              </h3>
              {/* <p>{card.newCardDescription}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
