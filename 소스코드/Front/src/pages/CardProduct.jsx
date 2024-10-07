import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SearchIcon } from "@chakra-ui/icons";
import AnimatedNumberCount from "../components/AnimatedNumberCount";
import "../style/CardProduct.css";
import { useNavigate } from "react-router-dom";
import { disassemble } from "es-hangul"; // es-hangul의 disassemble 함수 import
import RotatableImage from "../components/RotatableImage";
import { AnimatePresence, motion } from "framer-motion";

export default function CardProduct() {
  const [allCardProducts, setAllCardProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      axios
        .get("https://hana-ro-backend.site:8080/api/card-find/all-card-product")
        .then((response) => {
          if (response.data.success) {
            setAllCardProducts(response.data.data);
            setIsActive(true); // 데이터가 로드되면 활성화 상태로 전환
          } else {
            Swal.fire("Error", response.data.message, "error");
          }
          setLoading(false); // 데이터 로드 후 로딩 상태 해제
        })
        .catch((error) => {
          console.error("Network error:", error);
          Swal.fire("Network Error", "Failed to load card data.", "error");
          setLoading(false); // 오류 발생 시에도 로딩 상태 해제
        });
    }, 500); // 특정 시간후에 데이터 받아오기
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const includesChosung = (text, query) => {
    const disassembledText = Object.values(
      disassemble(text.toLowerCase())
    ).join("");
    const disassembledQuery = Object.values(
      disassemble(query.toLowerCase())
    ).join("");
    return disassembledText.includes(disassembledQuery);
  };

  const filteredCardProducts = allCardProducts.filter((card) =>
    includesChosung(card.cardName, searchTerm)
  );

  return (
    <div className="cardproduct-back">
      <div className="cardproduct-container page-enter">
        {!loading && ( // 로딩 중일 때는 숨기기
          <div className="cardproduct-top">
            <div className="cardproduct-top-title">
              {filteredCardProducts.length > 0 ? (
                <>
                  <strong>
                    <AnimatedNumberCount value={filteredCardProducts.length} />
                  </strong>
                  개의 카드 상품을 찾았어요!
                </>
              ) : (
                "일치하는 카드를 찾지 못했어요... 😰"
              )}
            </div>
            <div className="cardproduct-top-searchbar">
              <input
                id="search-bar"
                type="text"
                placeholder="카드 이름을 입력해주세요."
                className="search-input"
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <button className="search-button">
                <SearchIcon />
              </button>
            </div>
          </div>
        )}
        {loading ? ( // 로딩 중일 때 로딩 스피너를 표시
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
          <div className="cardproduct-article-container">
            <AnimatePresence>
              {filteredCardProducts.map((card) => (
                <motion.div
                  key={card.cardId}
                  layout
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className=""
                >
                  <IndividualCardProduct
                    key={card.cardId}
                    cardName={card.cardName}
                    cardImgUrl={card.cardImgUrl}
                    cardId={card.cardId}
                    cardDescription={card.cardDescription}
                    isActive={isActive}
                  />
                </motion.div>
              ))}
              {filteredCardProducts.length === 0 && (
                <p className="no-results">일치하는 카드가 없어요... 😰</p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function IndividualCardProduct({
  cardName,
  cardImgUrl,
  cardId,
  cardDescription,
  isActive,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`cardproduct-individual-container ${isActive ? "active" : ""}`}
      onClick={() => {
        navigate(`/card-product/${cardId}`);
      }}
    >
      <div className="cardproduct-individual-container-img">
        <RotatableImage
          src={cardImgUrl}
          alt={`${cardName} 이미지`}
          className=""
          style={{}}
          rotationDirection="horizontal" // 또는 "vertical"
        />
        {/* <img src={cardImgUrl} alt={cardName} /> */}
      </div>
      <h3>{cardName}</h3>
      <p
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "20rem",
        }}
      >
        {cardDescription}
      </p>
    </div>
  );
}
