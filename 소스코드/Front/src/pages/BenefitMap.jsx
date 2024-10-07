import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import NavbarMain from "../components/NavBarMain";
import "../style/BenefitMap.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineStorefront, MdMyLocation } from "react-icons/md";
import { disassemble } from "es-hangul"; // es-hangul의 disassemble 함수 import
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import RotatableImage from "../components/RotatableImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCustomDisclosure } from "../hook/useCustomDisclosure";
import AnimatedNumber from "../components/AnimatedNumber";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const { naver } = window; // window.naver로 네이버 객체를 참조

export default function BenefitMap() {
  const { isOpen, onOpen, onClose, modalConfig } = useCustomDisclosure();
  // 필요한 상태 추가
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const mapElement = useRef(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [map, setMap] = useState(null);
  const [centerCoords, setCenterCoords] = useState({
    lat: 37.4773531,
    lng: 126.8626263,
  });
  const [storeData, setStoreData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markers, setMarkers] = useState([]); // 마커 상태 추가

  const [distanceIndex, setDistanceIndex] = useState(1); // 기본값은 1km
  const [distance, setDistance] = useState(1);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const distanceOptions = [
    { label: "500m", value: 0.5 },
    { label: "1km", value: 1 },
    { label: "3km", value: 3 },
    { label: "제한없음", value: 6341 },
  ];

  const fetchData = async () => {
    if (!map) return; // map이 없으면 실행하지 않음

    try {
      console.log("fetchData 실행");

      // 기존 마커 제거
      clearMarkers();

      const response = await axios.post(
        "https://hana-ro-backend.site:8080/api/benefit-map/map",
        {
          token: token,
          latitude: centerCoords.lat,
          longitude: centerCoords.lng,
          distance: distance,
          category: category,
        }
      );

      if (response.data.success) {
        setStoreData(response.data.data);
        const newMarkers = [];

        response.data.data.forEach((store) => {
          const markerContentHtml = ReactDOMServer.renderToString(
            <MarkerContent name={store.name} icon={store.iconImgUrl} />
          );

          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(store.latitude, store.longitude),
            map: map,
            icon: {
              content: markerContentHtml,
              size: new naver.maps.Size(100, 30),
              scaledSize: new naver.maps.Size(100, 30),
              anchor: new naver.maps.Point(50, 15),
            },
            title: store.name,
          });

          naver.maps.Event.addListener(marker, "click", () => {
            map.setCenter(marker.getPosition());

            handleStoreClick(store);
          });

          newMarkers.push(marker);
        });

        // 마커 상태 업데이트 (기존 마커를 대체)
        setMarkers(newMarkers);
      } else {
        Swal.fire({
          title: "데이터 조회 실패",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    } catch (error) {
      console.error("Error fetching store data", error);
      Swal.fire({
        title: "오류 발생",
        text: "가맹점 데이터를 불러오는 도중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  useEffect(() => {
    if (mapElement.current && naver && !map) {
      const mapOptions = {
        center: new naver.maps.LatLng(centerCoords.lat, centerCoords.lng),
        zoom: 15,
        mapTypeId: naver.maps.MapTypeId.NORMAL,
      };

      const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
      setMap(mapInstance);

      naver.maps.Event.addListener(mapInstance, "center_changed", () => {
        const center = mapInstance.getCenter();
        const newCoords = {
          lat: center.lat(),
          lng: center.lng(),
        };
        setCenterCoords(newCoords);
      });

      // 지도에서 클릭한 위치의 좌표 출력하는 이벤트 리스너 추가
      naver.maps.Event.addListener(mapInstance, "click", (e) => {
        const latlng = e.coord; // 클릭한 위치의 좌표
        const lat = latlng.lat(); // 위도
        const lng = latlng.lng(); // 경도

        console.log(`Clicked Location - Latitude: ${lat}, Longitude: ${lng}`);
      });

      // 위치 정보 가져오기 등 필요한 추가 설정
    }
  }, [mapElement.current, naver]);

  useEffect(() => {
    if (map) {
      fetchData();
    }
  }, [map, category, distance]); // map 또는 category가 변경될 때마다 fetchData 호출

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  // 추천 카드 뽑아내는 로직
  const handleStoreClick = async (store) => {
    setIsLoading(true); // 데이터 로딩 시작

    const url = `https://hana-ro-backend.site:8080/api/benefit-map/recommend-card`;
    try {
      const response = await axios.post(url, {
        token: token,
        userId: user.id,
        storeId: store.id,
        storeCategory: store.category,
      });

      const recommendedCardsDTO = response.data.data;
      setRecommendedCards(recommendedCardsDTO); // 추천 카드 상태 업데이트
      setSelectedStore(store); // 선택된 가맹점 상태 업데이트

      setIsLoading(false); // 데이터 로딩 종료
      onOpen(); // Modal 열기
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다.", error.response);
      setIsLoading(false); // 데이터 로딩 종료
    }
  };

  function StoreInfo({ isOpen, onClose, store, recommendedCards }) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {store?.name == null ? "추천카드" : store.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <div className="benefitmap-loading-container">
                <img
                  src={process.env.PUBLIC_URL + "/img/img_loading.gif"}
                  alt="로딩 중"
                />
                <br />
                <div style={{ color: "black", fontSize: "1.1rem" }}>
                  잠시만 기다려주세요...
                </div>
              </div>
            ) : recommendedCards &&
              recommendedCards.benefitMapRecommendCardList &&
              recommendedCards.benefitMapRecommendCardList?.length > 0 ? (
              <div>
                <div className="benefitmap-modal-title-section">
                  {" "}
                  <strong>{recommendedCards.categoryName}</strong> 카테고리에선
                  평균{" "}
                  <strong>
                    {" "}
                    <AnimatedNumber
                      value={recommendedCards.potentialApprovalAmount}
                    />
                  </strong>
                  <br />
                  결제하셨네요!
                  <Popover placement="right-end">
                    <PopoverTrigger>
                      <IoMdInformationCircleOutline
                        size={30}
                        style={{
                          position: "relative",
                          opacity: "0.6",
                          cursor: "pointer",
                          display: "inline",
                          marginLeft: "0.5rem",
                          zIndex: "10000",
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className="custom-popover-content-3"
                      style={{
                        width: "19rem", // Popover 크기를 키움
                        height: "9rem",
                        padding: "20px", // 내부 패딩 추가
                        fontSize: "1rem",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div style={{ marginBottom: "15px" }}>
                          <h5>
                            <strong>
                              <span style={{ color: "#21897E" }}>
                                결제 카드 추천
                              </span>
                            </strong>
                          </h5>
                        </div>
                        <p>
                          손님이 보유한 모든 카드로 결제에 대한
                          <br /> 시뮬레이션 진행 후,{" "}
                          <strong style={{ color: "#21897E" }}>
                            최적의 결제 카드
                          </strong>
                          를
                          <br /> 알려드려요!
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation={true}
                  pagination={{ clickable: true }}
                >
                  {recommendedCards.benefitMapRecommendCardList.map(
                    (card, index) => (
                      <SwiperSlide key={card.cardId}>
                        <div className="benefitmap-card-item">
                          <div className="benefitmap-card-img-container">
                            <RotatableImage
                              src={card.cardImgUrl}
                              alt={`${card.cardName} 이미지`}
                              className="benefitmap-card-image"
                              style={{}}
                              rotationDirection="vertical" // 또는 "vertical", horizontal
                            />
                          </div>
                          <div className="benefitmap-card-info">
                            <h3 className="benefitmap-card-name">
                              {card.cardName}
                            </h3>

                            <p className="benefitmap-card-benefit">
                              {card.benefitDescription}
                            </p>
                            <p>
                              <strong>
                                {" "}
                                예상 혜택 금액 :{" "}
                                {Math.round(
                                  card.potentialBenefitAmount
                                ).toLocaleString()}
                                원
                              </strong>
                            </p>
                            <p className="benefitmap-card-usage">
                              사용한 혜택 금액:{" "}
                              {Math.round(
                                card.usedBenefitAmount
                              ).toLocaleString()}
                              원
                            </p>
                            <p className="benefitmap-card-remaining">
                              남은 혜택 금액:{" "}
                              {card.remainingBenefitAmount > 99999999
                                ? "혜택 한도 없음"
                                : `${Math.round(
                                    card.remainingBenefitAmount
                                  ).toLocaleString()}원`}
                            </p>

                            <p></p>
                            {index === 0 && (
                              <div className="benefitmap-best-badge">BEST</div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>
            ) : (
              <p>추천할 카드가 없습니다.</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  const handleModalSearch = (filteredStores) => {
    if (map) {
      const store = filteredStores[0];
      const location = new naver.maps.LatLng(store.latitude, store.longitude);
      map.setCenter(location);
      map.setZoom(16);
      handleStoreClick(store);
    }
    closeSearchModal();
  };

  const openSearchModal = () => {
    setIsModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsModalOpen(false);
  };

  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      // const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
      //   navigator.userAgent
      // );
      const options = {
        enableHighAccuracy: true, // 모바일 기기인 경우 고정밀 위치 요청
        maximumAge: 0, // 캐시된 위치 정보 사용 안 함
        timeout: 5000, // 5초 내에 위치 정보를 가져오지 못하면 에러
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          if (map) {
            map.setCenter(location);
            map.setZoom(15);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          Swal.fire({
            title: "위치 정보 오류",
            text: "현재 위치를 가져올 수 없습니다.",
            icon: "error",
            confirmButtonText: "확인",
          });
        },
        options
      );
    } else {
      Swal.fire({
        title: "Geolocation 지원 불가",
        text: "이 브라우저는 위치 정보를 지원하지 않습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  const clearMarkers = () => {
    // 기존 마커 삭제
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]); // 마커 상태 초기화
  };

  const handleCategoryClick = (categoryCode) => {
    setCategory(categoryCode);
  };
  const handleDistanceChange = (selectedIndex) => {
    setDistanceIndex(selectedIndex);
    setDistance(distanceOptions[selectedIndex].value);
  };

  return (
    <>
      <NavbarMain />
      <div className="benefitmap-container ">
        <div className="search-bar">
          <div
            className="searchbar-input-button-container"
            onClick={openSearchModal}
          >
            <input
              type="text"
              placeholder="가맹점 또는 주소 검색"
              className="search-input-map"
              readOnly
            />
            <button className="search-button-map">검색</button>
          </div>
          <div className="searchbar-filter-container">
            <div
              className="searchbar-filter-convenience"
              onClick={() => handleCategoryClick("CONVENIENCE_MERCHANT")}
            >
              <img
                src="https://map.pstatic.net/resource/api/v2/image/maps/around-category/store_category_pc.png?version=13"
                alt=""
              />
              편의점
            </div>
            <div
              className="searchbar-filter-cafe"
              onClick={() => handleCategoryClick("CAFE")}
            >
              <img
                src="	https://map.pstatic.net/resource/api/v2/image/maps/around-category/cafe_category_pc.png?version=13"
                alt=""
              />
              커피
            </div>
            <div
              className="searchbar-filter-mart"
              onClick={() => handleCategoryClick("MART_MERCHANT")}
            >
              <img
                src="https://map.pstatic.net/resource/api/v2/image/maps/around-category/mart_category_pc.png?version=13"
                alt=""
              />
              마트
            </div>
            <div
              className="searchbar-filter-fuel"
              onClick={() => handleCategoryClick("FUEL_MERCHANT")}
            >
              <img
                src="	https://map.pstatic.net/resource/api/v2/image/maps/around-category/oil_category_pc.png?version=13"
                alt=""
              />
              주유
            </div>
          </div>
        </div>
        <div
          id="map"
          ref={mapElement}
          style={{ width: "100%", height: "100vh" }}
        ></div>
        {/* 거리 선택 슬라이더 */}
        <Box
          position="fixed"
          bottom="6.5rem"
          left="1rem"
          zIndex="999"
          h="160px"
          display="flex"
          alignItems="center"
        >
          <Slider
            orientation="vertical"
            min={0}
            max={distanceOptions.length - 1}
            step={1}
            value={distanceIndex}
            onChange={handleDistanceChange}
            h="100%"
          >
            {distanceOptions.map((option, index) => (
              <SliderMark
                value={index}
                key={index}
                ml="19px"
                fontSize="16px"
                w="40"
                h="3"
                color={distanceIndex === index ? "#00907f" : "#666"}
              >
                {option.label}
              </SliderMark>
            ))}
            <SliderTrack bg="#ddd">
              <SliderFilledTrack bg="#00907f" />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
        </Box>
        <button className="my-location-button" onClick={moveToCurrentLocation}>
          <MdMyLocation size={24} />
        </button>
        <div className={`rollup-menu ${isMenuActive ? "active" : ""}`}>
          <button className="rollup-button" onClick={toggleMenu}>
            {isMenuActive ? (
              <IoIosArrowDown size={35} />
            ) : (
              <IoIosArrowUp size={35} />
            )}
          </button>
          <div className="rollup-content">
            <StoreList stores={storeData} onStoreClick={handleStoreClick} />
          </div>
        </div>
        {isModalOpen && (
          <SearchModal
            stores={storeData}
            onSearch={handleModalSearch}
            onClose={closeSearchModal}
          />
        )}
      </div>
      <StoreInfo
        isOpen={isOpen}
        onClose={onClose}
        store={selectedStore}
        recommendedCards={recommendedCards}
        isLoading={isLoading}
      />
    </>
  );
}

function StoreList({ stores, onStoreClick }) {
  return (
    <div className="storelist-container">
      {stores.map((store) => (
        <div
          key={store.id}
          className="storelist-item"
          onClick={() => onStoreClick(store)}
        >
          <img
            src={store.storeImgUrl}
            alt={store.name}
            className="store-image"
          />
          <div className="store-info">
            <div className="store-info-inner">
              <h3 className="store-name">{store.name}</h3>
              <p className="store-category">{store.category}</p>
            </div>
            <p className="store-description">{store.detail.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MarkerContent({ icon, name }) {
  return (
    <div className="marker-content">
      <div className="marker-icon">
        <img src={icon} alt="대체 이미지" className="marker-icon-img" />
      </div>
      <div className="marker-name">{name}</div>
    </div>
  );
}

function SearchModal({ stores, onSearch, onClose }) {
  const [query, setQuery] = useState("");

  const includesChosung = (text, query) => {
    const disassembledText = Object.values(disassemble(text)).join("");
    const disassembledQuery = Object.values(disassemble(query)).join("");
    return disassembledText.includes(disassembledQuery);
  };

  const handleSearch = () => {
    const filteredStores = stores.filter(
      (store) =>
        includesChosung(store.name, query) ||
        includesChosung(store.detail.address, query)
    );
    if (filteredStores.length > 0) {
      onSearch(filteredStores);
    } else {
      Swal.fire({
        title: "검색 결과 없음",
        text: "해당 검색어와 일치하는 가맹점이 없습니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-modal">
      <div className="search-modal-content">
        <button className="search-modal-close" onClick={onClose}>
          닫기
        </button>
        <div className="search-modal-search-input-button-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="가맹점 또는 주소 검색"
            className="search-modal-input"
          />
          <button onClick={handleSearch} className="search-modal-button">
            검색
          </button>
        </div>

        <div className="search-results">
          {stores
            .filter(
              (store) =>
                includesChosung(store.name, query) ||
                includesChosung(store.detail.address, query)
            )
            .map((store) => (
              <div
                key={store.id}
                className="search-result-item"
                onClick={() => {
                  onSearch([store]);
                }}
              >
                <p
                  style={{
                    fontSize: "1.3rem",
                    marginBottom: "0.1rem",
                    fontFamily: "notosans",
                  }}
                >
                  {store.name}
                </p>
                <p style={{ marginBottom: "0.1rem" }}>{store.detail.address}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
