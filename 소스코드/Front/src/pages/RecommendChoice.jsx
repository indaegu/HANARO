import React, { useEffect, useState } from "react";
import "../style/RecommendChoice.css";
import Swal from "sweetalert2";
import { Tooltip } from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6"; // 아이콘 임포트
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecommendChoice() {
  const [isSelectedSection1, setIsSelectedSection1] = useState(false);
  const [isSelectedSection2, setIsSelectedSection2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelection = (section) => {
    if (section === 1) {
      setIsSelectedSection1(!isSelectedSection1);
    } else if (section === 2) {
      setIsSelectedSection2(!isSelectedSection2);
    }
  };

  const handleStartRecommendation = () => {
    if (!isSelectedSection1 && !isSelectedSection2) {
      Swal.fire(
        "선택하세요",
        "적어도 하나의 섹션을 선택해야 합니다.",
        "warning"
      );
      return;
    }

    const selectedModes = [];
    if (isSelectedSection1) selectedModes.push("test");
    if (isSelectedSection2) selectedModes.push("data");

    if (selectedModes.length === 1 && selectedModes[0] === "data") {
      navigate(`/cardrecommend/recommend-choice/certificate-form`);
    } else {
      navigate(
        `/cardrecommend/recommend-choice/test?modes=${selectedModes.join(",")}`
      );
    }
  };

  // 선택된 섹션들에 대한 텍스트를 생성
  const selectedSectionsText = () => {
    const selected = [];
    if (isSelectedSection1) selected.push("테스트 기반 추천");
    if (isSelectedSection2) selected.push("소비 데이터 기반 추천");
    return selected.length > 0
      ? selected.join(" + ")
      : "추천 항목을 선택하세요";
  };

  return (
    <>
      <div className="recommendchoice-back">
        <div className="recommendchoice-container page-enter">
          <div className="recommendchoice-title-seciton-container">
            <h3 className="recommendchoice-title">
              <strong>마이데이터 기반 소비 데이터</strong> 및<br />
              <strong>테스트</strong>를 통해 꼭 맞는 카드를 찾아보세요!
            </h3>
          </div>
          <div className="recommendchoice-choice-section-container">
            <Tooltip
              label="상세한 설문조사를 통해서 손님에게 가장 어울리는 최적의 카드를 추천해드립니다."
              hasArrow
              arrowSize={15}
              fontSize="lg"
              p={5}
              maxWidth="30rem"
              borderRadius="15px"
            >
              <div
                className={`recommendchoice-choice-section1 hvr-icon-grow ${
                  isSelectedSection1 ? "selected" : ""
                }`}
                onClick={() => handleSelection(1)}
              >
                {isSelectedSection1 && (
                  <FaCircleCheck
                    className="check-icon"
                    color="rgb(0, 144, 127)"
                  />
                )}
                <img
                  src={process.env.PUBLIC_URL + "/img/3d-checklist.png"}
                  alt="3d-checklist.png"
                  className="hvr-icon"
                />
                <h4>테스트를 통한 카드 추천</h4>
                <input
                  type="checkbox"
                  checked={isSelectedSection1}
                  onChange={() => handleSelection(1)}
                  id="section1-checkbox"
                />
              </div>
            </Tooltip>
            <Tooltip
              label="마이데이터를 기반으로 손님의 소비 패턴을 분석하여 손님에게 가장 어울리는 최적의 카드를 추천해드립니다."
              hasArrow
              arrowSize={15}
              fontSize="lg"
              p={5}
              maxWidth="30rem"
              borderRadius="15px"
            >
              <div
                className={`recommendchoice-choice-section2 hvr-icon-grow ${
                  isSelectedSection2 ? "selected" : ""
                }`}
                onClick={() => handleSelection(2)}
              >
                {isSelectedSection2 && (
                  <FaCircleCheck
                    className="check-icon"
                    color="rgb(0, 144, 127)"
                  />
                )}
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/img/3d-pc_with_statistic-removebg.png"
                  }
                  alt="3d-checklist.png"
                  className="hvr-icon"
                />
                <h4>소비데이터 기반 카드 추천</h4>
                <input
                  type="checkbox"
                  checked={isSelectedSection2}
                  onChange={() => handleSelection(2)}
                  id="section2-checkbox"
                />
              </div>
            </Tooltip>
          </div>
          <div className="recommendchoice-start-button">
            <button
              onClick={() => {
                handleStartRecommendation();
              }}
            >
              {selectedSectionsText()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
