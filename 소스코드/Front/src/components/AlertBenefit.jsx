import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowDropright } from "react-icons/io";
import AnimatedNumber from "./AnimatedNumber";
import { useSelector } from "react-redux";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RotatableImage from "./RotatableImage";

function AlertBenefit() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  const [benefitData, setBenefitData] = useState({
    amount: "",
    paymentName: "",
    pastBenefit: "",
    futureBenefit: "",
    pastCardName: "",
    futureCardName: "",
    pastCardImgUrl: "",
    futureCardImgUrl: "",
    paymentCategory: "",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("https://hana-ro-backend.site:8080/api/login-block/benefit-alert", {
        userId: `${user.id}`,
        token: token,
      })
      .then((response) => {
        const { data } = response.data;
        setBenefitData({
          amount: data.amount,
          paymentName: data.paymentName,
          pastBenefit: data.pastBenefit,
          futureBenefit: data.futureBenefit,
          pastCardName: data.pastCardName,
          futureCardName: data.futureCardName,
          pastCardImgUrl: data.pastCardImgUrl,
          futureCardImgUrl: data.futureCardImgUrl,
          paymentCategory: data.paymentCategory,
        });
        setTimeout(() => {
          setIsLoading(false); // 데이터를 모두 불러온 후 0.5초 뒤에 로딩 상태를 false로 설정
        }, 500); // 0.5초 대기
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="alertbenefit-container">
        {isLoading ? (
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
          <>
            <div className="alertbenefit-top">
              <div className="alertbenefit-top-top">
                <h1>
                  <strong>혜택을 놓쳤어요...  </strong>
                </h1>
                <Popover placement="right-end">
                  <PopoverTrigger>
                    <IoMdInformationCircleOutline
                      size={38}
                      style={{ opacity: "0.6", cursor: "pointer" }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="custom-popover-content-2"
                    style={{
                      width: "21rem", // Popover 크기를 키움
                      height: "9rem",
                      padding: "20px", // 내부 패딩 추가
                      fontSize: "1rem",
                      backgroundColor: "rgba(255, 255, 255,0.9)",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div style={{ marginBottom: "15px" }}>
                        <h5>
                          <strong>놓친혜택이란?</strong>
                        </h5>
                      </div>
                      <p style={{ color: "#21897E", fontWeight: "bold" }}>
                        손님이 보유한 모든 카드로 결제에 대한
                        <br /> 시뮬레이션 진행 후, 최적의 시나리오를
                        <br /> 알려드려요!
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <span style={{ marginTop: "1rem", fontSize: "1.3rem" }}>
                다음{" "}
                <strong style={{ fontSize: "1.4rem" }}>
                  {benefitData.paymentCategory}
                </strong>{" "}
                결제에는{" "}
                <strong style={{ fontSize: "1.6rem" }}>
                  {benefitData.futureCardName}
                </strong>
                을 사용해보세요!
              </span>
            </div>

            <div className="alertbenefit-card-container">
              <div className="alertbenefit-pastcard-container">
                <h4>결제카드</h4>
                <div className="alertbenefit-img-container">
                  <RotatableImage
                    src={benefitData.pastCardImgUrl}
                    alt={`${benefitData.pastCardImgUrl} 이미지`}
                    className="alertbenefit-card-img-individual"
                    style={{}}
                    rotationDirection="vertical" // 또는 "vertical", "horizontal"
                  />
                </div>
                <span className="alertbenefit-card-name-past">
                  <strong>{benefitData.pastCardName}</strong>
                </span>
              </div>
              <IoMdArrowDropright style={{ fontSize: "70px", color: "gray" }} />
              <div className="alertbenefit-futurecard-container">
                <h4 style={{ color: "rgb(0, 100, 255, 0.8)" }}>
                  <strong>추천카드</strong>
                </h4>
                <div className="alertbenefit-img-container">
                  <RotatableImage
                    src={benefitData.futureCardImgUrl}
                    alt={`${benefitData.futureCardImgUrl} 이미지`}
                    className="alertbenefit-card-img-individual"
                    style={{}}
                    rotationDirection="vertical" // 또는 "vertical"
                  />
                </div>
                <span className="alertbenefit-card-name">
                  <strong>{benefitData.futureCardName}</strong>
                </span>
              </div>
            </div>
            <div className="alertbenefit-text-container">
              <span className="alertbenefit-text-title">
                {benefitData.paymentName}&nbsp;&nbsp;
                <span style={{ fontWeight: "bold" }}>
                  <AnimatedNumber value={benefitData.amount} />
                </span>
              </span>
              <div className="alertbenefit-price-container">
                <span
                  className="alertbenefit-price-past-benefit"
                  style={{ color: "gray" }}
                >
                  <span>기존 혜택</span>
                  <AnimatedNumber value={benefitData.pastBenefit} />{" "}
                </span>
                <IoMdArrowDropright
                  style={{ fontSize: "30px", color: "gray" }}
                />
                <span
                  className="alertbenefit-price-future-benefit"
                  style={{ color: "rgb(8, 111, 238)" }}
                >
                  <span>예상 혜택</span>
                  <AnimatedNumber value={benefitData.futureBenefit} />
                </span>
              </div>
            </div>
            {/* <Box position="relative" padding="5">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            <strong style={{ fontSize: "1.5rem" }}> AI 피드백</strong>
          </AbsoluteCenter>
        </Box> */}
            <div className="alertbenefit-ai-answer-container"></div>
          </>
        )}
      </div>
    </>
  );
}

export default AlertBenefit;
