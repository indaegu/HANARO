import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import AnimatedNumber from "./AnimatedNumber";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

function formatNumber(num) {
  return parseInt(num).toLocaleString();
}

function amountBenefitRatio(item) {
  return (parseInt(item.benefit) / parseInt(item.amount)) * 100;
}

function BenefitBestWorst() {
  const [price, setPrice] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [lowerThree, setLowerThree] = useState([]);
  const [upperThree, setUpperThree] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  console.log(token);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "https://hana-ro-backend.site:8080/api/login-block/benefit-bestworst",
        {
          userId: `${user.id}`,
          token: token,
        }
      )
      .then((response) => {
        const data = response.data.data;
        setData(data);
        setPrice(data.amount);
        setBenefit(data.benefit);

        const sortedData = [...data.paymentItemDataList].sort(
          (a, b) => amountBenefitRatio(a) - amountBenefitRatio(b)
        );
        setLowerThree(sortedData.slice(0, 3));
        setUpperThree(sortedData.slice(-3).reverse());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="benefitbestworst-container">
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
            {" "}
            <div className="benefitbestworst-top">
              <span>{data.month}월 소비</span>
              {/* <Link to="/chart" style={{ fontSize: "1.35rem" }}>
                소비 내역
                <IoIosArrowForward />
              </Link> */}
            </div>
            <div className="benefitbestworst-middle">
              <div className="benefitbestworst-price">
                <AnimatedNumber value={price} />
              </div>
              <div className="benefitbestworst-benefit">
                받은 혜택 <AnimatedNumber value={benefit} />
              </div>
            </div>
            <div className="benefitbestworst-slidebar">
              <Tabs position="relative" variant="unstyled">
                <TabList>
                  <Tab fontSize="1.5rem">혜택 아쉬운</Tab>
                  <Tab fontSize="1.5rem">혜택 잘받은</Tab>
                </TabList>
                <TabIndicator
                  mt=""
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    {lowerThree.map((item, index) => (
                      <div
                        key={index}
                        className="payment-item-container"
                        style={{ fontSize: "1.5rem" }}
                      >
                        <div className="payment-item-category">
                          {item.category}
                        </div>
                        <div className="payment-item-content-container">
                          <div className="payment-item-content-price">
                            {formatNumber(item.amount)}원
                          </div>
                          <div className="payment-item-content-benefit-bad">
                            {formatNumber(item.benefit)}원{" "}
                            {amountBenefitRatio(item).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {upperThree.map((item, index) => (
                      <div
                        key={index}
                        className="payment-item-container"
                        style={{ fontSize: "1.5rem" }}
                      >
                        <div className="payment-item-category">
                          {item.category}
                        </div>
                        <div className="payment-item-content-container">
                          <div className="payment-item-content-price">
                            {formatNumber(item.amount)}원
                          </div>
                          <div className="payment-item-content-benefit-good">
                            {formatNumber(item.benefit)}원{" "}
                            {amountBenefitRatio(item).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default BenefitBestWorst;
