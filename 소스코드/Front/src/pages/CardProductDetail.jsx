import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/CardProductDetail.css";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";

export default function CardProductDetail() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    axios
      .get(
        `https://hana-ro-backend.site:8080/api/card-find/card-product?cardId=${cardId}`
      )
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          setCardDetails(response.data.data);
          console.log(response.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "예기치 못한 에러가 발생했습니다...",
            text:
              response.data.message ||
              "예기치 못한 에러가 발생했습니다.. 나중에 다시 시도해주세요",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
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
  }, [cardId, navigate]);

  return (
    <div className="cardproductdetail-back">
      <div className="cardproductdetail-container page-enter">
        {" "}
        {isLoading ? (
          <span className="login-loader"></span>
        ) : (
          <>
            <div className="cardproductdetail-section cardproductdetail-section1">
              <div className="cardproductdetail-img-buuton-container">
                <img
                  className="cardproductdetail-section-card-img"
                  src={cardDetails.cardImgUrl}
                  alt={cardDetails.cardImgUrl}
                />
                <div
                  className="cardproductdetail-apply-button hvr-back-pulse"
                  onClick={() => {
                    window.open(
                      cardDetails.cardApplyUrl,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  카드 신청하기
                </div>
              </div>

              <div className="cardproductdetail-section1-info">
                <div className="cardproductdetail-card-name">
                  {cardDetails.cardName}
                </div>
                <div className="cardproductdetail-card-description">
                  {cardDetails.cardDescription}
                </div>
                <div className="cardproductdetaill-major-benefit-list-container">
                  <ul>
                    {cardDetails.majorBenefitList.map((benefit, index) => (
                      <li
                        key={index}
                        className="cardproductdetaill-major-benefit"
                      >
                        <img
                          src={benefit.benefitIconImgUrl}
                          alt={benefit.benefitTitle}
                        />
                        <strong>{benefit.benefitTitle}:</strong>{" "}
                        {benefit.benefitDescription}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="cardproductdetail-annualfee-container">
                  <strong>연회비</strong>
                  {cardDetails.annualFeeList.map((annualFee, index) => (
                    <div className="cardproductdetail-annualfee">
                      {annualFee.annulFeeDescription}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cardproductdetail-section2-big">
              <div className="cardproductdetail-section2-top">
                <h3>
                  <strong>카드혜택</strong>
                </h3>
                <div
                  className="cardproductdetail-section2-top"
                  onClick={() => {
                    onOpen();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{cardDetails.cardName}</strong>의 상세 혜택과 약관을
                  확인해보세요
                  <IoIosArrowForward
                    className="hvr-icon"
                    style={{}}
                  ></IoIosArrowForward>
                </div>
              </div>
              <div className="cardproductdetail-section cardproductdetail-section2">
                <Accordion allowToggle>
                  {cardDetails.detailedBenefitList.map(
                    (detailBenefit, index) => (
                      <AccordionItem key={index}>
                        <h2>
                          <AccordionButton>
                            <img
                              src={detailBenefit.detailBenefitIconImgUrl}
                              alt=""
                              style={{ width: "2.5rem" }}
                            />
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              style={{ fontSize: "1.2rem", padding: "0.6rem" }}
                            >
                              {detailBenefit.detailBenefitTitle}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {detailBenefit.detailBenefitDescription}
                        </AccordionPanel>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>
            </div>
            <div className="cardproductdetail-section3-big">
              <div className="cardproductdetail-section2-top">
                <h3>
                  <strong>이용안내</strong>
                </h3>
                <div
                  className="cardproductdetail-section2-top"
                  onClick={() => {
                    onOpen();
                  }}
                  style={{ cursor: "pointer" }}
                ></div>
              </div>
              <div className="cardproductdetail-section cardproductdetail-section3">
                {" "}
                <Accordion allowToggle>
                  {cardDetails.useInstructionList.map(
                    (useInstruction, index) => (
                      <AccordionItem key={index}>
                        <h2>
                          <AccordionButton>
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              style={{ fontSize: "1.2rem", padding: "0.6rem" }}
                            >
                              {useInstruction.useInstructionTitle}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} style={{ padding: "1.9rem" }}>
                          {useInstruction.useInstructionDescription}
                        </AccordionPanel>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>
            </div>
            <div className="cardproductdetail-section3-big">
              <h3>
                <strong>유의사항</strong>
              </h3>
              <div
                className="cardproductdetail-section2-top"
                onClick={() => {
                  onOpen();
                }}
                style={{ cursor: "pointer" }}
              ></div>
              <div className="cardproductdetail-section cardproductdetail-section3">
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          style={{ fontSize: "1.2rem", padding: "0.6rem" }}
                        >
                          {"[공통] 유의사항"}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      style={{
                        padding: "1rem",
                        fontSize: "1rem",
                        lineHeight: "1.6",
                      }}
                    >
                      <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
                        <ul
                          style={{
                            listStyleType: "disc",
                            paddingLeft: "3.5rem",
                          }}
                        >
                          <li>
                            필요 이상의 신용카드 발급 및 사용은 개인신용평점이나
                            이용한도 등에 영향을 미칠 수 있습니다.
                          </li>
                          <li>
                            <strong>
                              카드 발급 신청 시 상품설명서 및 상품 약관을 반드시
                              확인하시기 바랍니다.
                            </strong>
                          </li>
                          <li>
                            신용카드 발급이 부적정한 경우(개인 신용평점 낮음 등)
                            카드발급이 제한될 수 있습니다.
                          </li>
                          <li>
                            카드이용대금과 이에 수반되는 모든 수수료를 지정된
                            대금 결제일에 상환하여야 합니다.
                          </li>
                          <li>
                            금융소비자는 해당상품 또는 서비스에 대하여 설명을
                            받을 권리가 있습니다.
                          </li>
                          <li>
                            본 상품설명서는 법령 및 내부통제기준에 따른 절차를
                            거쳐 제공됩니다.
                          </li>
                          <li>
                            상환능력에 비해 신용카드 사용액이 과도할 경우,
                            귀하의 개인신용평점이 하락할 수 있습니다.
                          </li>
                          <li>
                            개인신용평점 하락 시 금융거래와 관련된 불이익이
                            발생할 수 있습니다.
                          </li>
                          <li>
                            일정기간 원리금을 연체할 경우, 모든 원리금을 변제할
                            의무가 발생할 수 있습니다.
                          </li>
                          <li>
                            연체이자율(약정이율+최대 3%)은 회원별·이용상품별로
                            차등 적용되며, 법정 최고금리(20%)를 초과하지
                            않습니다.
                          </li>
                          <li>
                            연체 발생 시점에 약정이율이 없는 경우:
                            <ul
                              style={{
                                listStyleType: "disc",
                                paddingLeft: "3.5rem",
                              }}
                            >
                              <li>
                                일시불 거래 연체 시: 거래발생 시점의
                                최소기간(2개월) 유이자 할부금리
                              </li>
                              <li>
                                무이자 할부 거래 연체 시: 거래발생 시점의 동일한
                                할부 계약기간의 유이자 할부금리
                              </li>
                              <li>
                                그 외의 경우: 약정이율은 상법상 상사법정이율과
                                상호금융 가계자금대출금리* 중 높은 금리 적용
                                <br />* 한국은행에서 매월 발표하는 가장 최근의
                                비은행 금융기관 가중평균대출금리(신규대출 기준)
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="cardproductdetail-bottom-container">
                <div className="cardproductdetail-bottom-cardreleasedate">
                  카드 출시일 : {cardDetails.cardReleaseDate}
                </div>
                <div className="cardproductdetail-bottom-compliancereview">
                  {cardDetails.complianceReview}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW="50%" minH="90%">
          <ModalHeader>{cardDetails?.cardName} 혜택 및 약관</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {cardDetails ? (
              <iframe
                id="frame"
                src={cardDetails.cardProductPdfUrl}
                width="100%"
                height="600px"
                title="Card Benefits PDF"
              ></iframe>
            ) : (
              <span className="login-loader"></span>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
