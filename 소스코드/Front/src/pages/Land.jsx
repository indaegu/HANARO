/*eslint-disable*/

import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionStepper from "../components/SectionStepper";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import "../style/hover.css";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

function Land() {
  const [activeStep, setActiveStep] = useState(1);
  const [manualScroll, setManualScroll] = useState(false);
  const sectionRefs = useRef([
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]).current;

  const scrollToSection = useCallback(
    (index) => {
      setManualScroll(true);
      setTimeout(() => {
        loadAnimation(index);
      }, 100);
      sectionRefs[index].current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      setTimeout(() => setManualScroll(false), 100);
    },
    [sectionRefs]
  );

  const handleScroll = useCallback(() => {
    if (manualScroll) return;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let foundStep = sectionRefs.findIndex((ref) => {
      return (
        ref.current &&
        scrollPosition >= ref.current.offsetTop &&
        scrollPosition < ref.current.offsetTop + ref.current.offsetHeight
      );
    });

    if (foundStep !== -1 && foundStep !== activeStep - 1) {
      setActiveStep(foundStep + 1);
      scrollToSection(foundStep);
    }
  });

  useEffect(() => {
    const throttledScrollHandler = throttle(handleScroll, 300);
    window.addEventListener("scroll", throttledScrollHandler);
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  });

  function loadAnimation(index) {
    if (index === 1) {
      const section2AnimationElement = document.querySelector(
        ".section2-container"
      );
      if (section2AnimationElement) {
        section2AnimationElement.classList.add("fadeup-animation");
      }
    } else if (index === 2) {
      const section3AnimationElement = document.querySelector(
        ".section3-container1"
      );
      const section3AnimationElement2 = document.querySelector(
        ".section3-container2"
      );
      if (section3AnimationElement && section3AnimationElement2) {
        section3AnimationElement.classList.add("fadeleft-animation");
        section3AnimationElement2.classList.add("faderight-animation");
      }
    } else if (index === 3) {
      const section4AnimationElement = document.querySelector(
        ".section4-container1"
      );
      const section4AnimationElement2 = document.querySelector(
        ".section4-container2"
      );
      if (section4AnimationElement) {
        section4AnimationElement.classList.add("faderight-animation");
        section4AnimationElement2.classList.add("fadeleft-animation");
      }
    } else if (index === 4) {
      const section5AnimationElement = document.querySelector(
        ".section5-container"
      );
      if (section5AnimationElement) {
        section5AnimationElement.classList.add("fadein-animation");
      }
    }
  }

  return (
    <div className="page-enter-2">
      <Navbar />
      <SectionStepper activeStep={activeStep} />
      <div ref={sectionRefs[0]} className="section section1">
        <div className="overlay"></div>
        <div className="section1-text">
          <h1>
            스마트한 소비로 가는길 <b>하나로</b>
          </h1>
        </div>
        <div
          className="arrowDown"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            top: "30vh",
          }}
        >
          <MdKeyboardDoubleArrowDown
            size="80"
            color="white"
            onClick={() => {
              // 누르면 정확히 section3에 포커싱 되는 로직
              scrollToSection(1);
            }}
          />
        </div>
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source
              src={process.env.PUBLIC_URL + "/img/main-ann-mp4.mp4"}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div ref={sectionRefs[1]} className="section section2">
        <div className="section2-container">
          <div className="section2-text">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>스마트한 소비</h3>
            <h1 className="notosans">간편한 카드 실적 및 카드 혜택 관리</h1>
            <span className="notosans">
              모든 카드의 실적 및 혜택을 손쉽게 관리하세요
            </span>
          </div>
          <img
            src={process.env.PUBLIC_URL + "./img/3d-card-section2.png"}
            className="section2-img"
          />
        </div>

        <div
          className="arrowDown"
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            top: "80vh",
          }}
        >
          <MdKeyboardDoubleArrowDown
            size="80"
            onClick={() => {
              // 누르면 정확히 section3에 포커싱 되는 로직
              scrollToSection(2);
            }}
          />
        </div>
      </div>
      <div ref={sectionRefs[2]} className="section section3 ">
        <div className="section3-container1">
          <div className="section3-text1">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>편리한 소비</h3>
            <h1 className="notosans">위치기반 카드 혜택 지도</h1>
            <span className="notosans">
              내 주변 가장 많은 혜택을 받는 가맹점을 선택하고 추천카드로
              결제하세요
            </span>
          </div>
          <div className="section3-img1">
            <img
              src={process.env.PUBLIC_URL + "/img/3d-map-section3.png"}
              className="section3-img"
            />
          </div>
        </div>
        <div className="section3-container2 ">
          <div className="section3-img2">
            <img
              src={
                process.env.PUBLIC_URL + "/img/3d-cardrecommand-section3.png"
              }
              className="section3-img"
            />
          </div>
          <div className="section3-text2">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>현명한 선택</h3>
            <h1 className="notosans">소비 내역 기반 카드 추천</h1>
            <span className="notosans">
              내 소비 내역을 기반으로 가장 적합한 카드를 추천 받아보세요
            </span>
          </div>
        </div>

        <div
          className="arrowDown"
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            top: "80vh",
          }}
        >
          <MdKeyboardDoubleArrowDown
            size="80"
            onClick={() => {
              // 누르면 정확히 section3에 포커싱 되는 로직
              scrollToSection(3);
            }}
          />
        </div>
      </div>
      <div ref={sectionRefs[3]} className="section section4 ">
        <div className="section4-container1">
          <div className="section3-text1">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>현명한 소비</h3>
            <h1 className="notosans">스마트 소비 진단</h1>
            <span className="notosans">
              방금 결제, 현명한 결제였을까요? 소비진단으로 확인해보세요
            </span>
          </div>
          <div className="section3-img1">
            <img
              src={process.env.PUBLIC_URL + "/img/3d-medical-chart.png"}
              className="section3-img"
            />
          </div>
        </div>
        <div className="section4-container2 ">
          <div className="section3-img2">
            <img
              src={process.env.PUBLIC_URL + "/img/3d-dimensinal.png"}
              className="section3-img"
            />
          </div>
          <div className="section3-text2">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>최적의 결제</h3>
            <h1 className="notosans">신용,체크카드 황금비율</h1>
            <span className="notosans">
              내 소득을 기준으로 소득공제 황금비율을 알아보세요
            </span>
          </div>
        </div>
        <div
          className="arrowDown"
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            top: "80vh",
          }}
        >
          <MdKeyboardDoubleArrowDown
            size="80"
            onClick={() => {
              // 누르면 정확히 section3에 포커싱 되는 로직
              scrollToSection(4);
            }}
          />
        </div>
      </div>
      <div ref={sectionRefs[4]} className="section section5 ">
        <div className="section5-container">
          <h1 style={{ fontSize: "50px" }}>지금 바로 시작해보세요</h1>
          <br />
          <Link
            className="hvr-underline-from-center"
            to="/"
            style={{ fontSize: "30px" }}
          >
            시작하기
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default Land;
