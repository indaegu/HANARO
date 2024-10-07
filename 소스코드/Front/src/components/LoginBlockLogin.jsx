import { logout } from "../store.js";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useCustomDisclosure } from "../hook/useCustomDisclosure.jsx";
import AlertBenefit from "../components/AlertBenefit";
import BenefitBestWorst from "../components/BenefitBestWorst";
import CardSummury from "./CardSummary.jsx";
import IncomeTaxDeduction from "./IncomeTaxDeduction.jsx";

export default function LoginBlockLogin() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose, modalConfig } = useCustomDisclosure();
  const navigate = useNavigate();

  // 로그아웃 핸들러 함수
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // 홈페이지로 리디렉션
  };

  return (
    <>
      <div className="loginblock-container">
        <div className="loginblock-button-container">
          <div className="loginblock-button-section loginblock-button-section1">
            <ButtonWithIconAndText
              onClick={() => {
                onOpen(
                  "스마트진단",
                  "50%",
                  "85%",
                  <div>
                    <AlertBenefit />
                  </div>
                );
              }}
              buttonClass="loginblock-button-1"
              iconSrc={`${process.env.PUBLIC_URL}/loginblock-icon/Analysis-Model.png`}
              iconAlt="notification_checklist_3d.png"
              text="스마트진단"
              detailText="방금한 소비, n 현명했을까요?"
            />
            <ButtonWithIconAndText
              onClick={() => {
                onOpen(
                  "소비요약",
                  "30%",
                  "75%",
                  <div>
                    <BenefitBestWorst />
                  </div>
                );
              }}
              buttonClass="loginblock-button-2"
              iconSrc={`${process.env.PUBLIC_URL}/loginblock-icon/Saving-Day.png`}
              iconAlt="card-3d.png"
              text="소비요약"
              detailText="이번달 소비에 대한 요약을 n 받아보세요"
            />
          </div>
          <div className="loginblock-button-section2 loginblock-button-section2">
            <ButtonWithIconAndText
              onClick={() => {
                onOpen(
                  "보유카드",
                  "30%",
                  "60%",
                  <div>
                    <CardSummury />
                  </div>
                );
              }}
              buttonClass="loginblock-button-3"
              iconSrc={`${process.env.PUBLIC_URL}/loginblock-icon/Card-Secure.png`}
              iconAlt="card-3d.png"
              text="보유카드"
              detailText="보유 카드를 한곳에서 n 확인해보세요"
            />
            <ButtonWithIconAndText
              onClick={() => {
                onOpen(
                  "소득공제 황금 비율",
                  "70%",
                  "90%",
                  <IncomeTaxDeduction />
                );
              }}
              buttonClass="loginblock-button-4"
              iconSrc={`${process.env.PUBLIC_URL}/loginblock-icon/Financial-Analysis.png`}
              iconAlt="golden-percentage-3d"
              text="소득공제 황금비율"
              detailText="신용카드 vs 체크카드 사용의 n 황금비율을 알려드려요"
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          minWidth={modalConfig.minWidth}
          minHeight={modalConfig.minHeight}
        >
          <ModalHeader>{modalConfig.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalConfig.content}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function ButtonWithIconAndText({
  onClick,
  buttonClass,
  iconSrc,
  iconAlt,
  text,
  detailText,
}) {
  return (
    <button onClick={onClick} className={`loginblock-button ${buttonClass}`}>
      <span className="loginblock-button-title">{text}</span>
      <div className="loginblock-icon">
        <img src={iconSrc} alt={iconAlt} />
      </div>
      <div className="loginblock-detail-text">
        {detailText.split("n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br key={index} />
          </React.Fragment>
        ))}
      </div>
    </button>
  );
}
