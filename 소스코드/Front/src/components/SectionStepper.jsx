import React, { useEffect, useState } from "react";
import "../style/App.css"; // 스타일을 위한 CSS 파일

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepTitle,
  Stepper,
  Box,
  StepStatus,
} from "@chakra-ui/react";

const steps = [
  { title: "하나", description: "하나로를 소개합니다!" },
  { title: "둘", description: "하나로의 특장점!" },
  { title: "셋", description: "하나로 사용해보기!" },
  { title: "넷", description: "하나로 사용해보기!" },
  { title: "다섯", description: "하나로 사용해보기!" },
];

function SectionStepper({ activeStep, textColor }) {
  let [font, setFonts] = useState("text-white");
  let [logoColor, setLogoColor] = useState("logo-color-green");

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치에 따라 폰트 색상을 변경
      if (window.scrollY >= window.innerHeight) {
        setFonts("text-black");
      } else {
        setFonts("text-white");
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // activeStep prop 추가
  return (
    <Stepper
      index={activeStep}
      orientation="vertical"
      height="300px"
      gap="0"
      position="fixed"
      left="20px"
      top="300px"
      zIndex="100"
      className={font}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          {/* <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box> */}
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default SectionStepper;
