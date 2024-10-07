import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/App.css"; // 스타일을 위한 CSS 파일
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { FiThumbsUp } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegListAlt } from "react-icons/fa";

import { FaRegMap } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store.js";

function NavbarMain() {
  const dispatch = useDispatch();
  let [font] = useState("text-black");
  let [logoColor] = useState("image"); // black-image로 하면 흑백 로고로 변경됨, 기존은 비워둬도 됨
  let [hamburgerColor] = useState("black-image");
  const user = useSelector((state) => state.user.userInfo);
  const location = useLocation();
  const currentPath = location.pathname;
  const [backgroundColor, setBackgroundColor] = useState("");

  const [showText1, setShowText1] = useState(true); // 첫 번째 텍스트를 보여줄지 여부를 관리
  const [fadeClass, setFadeClass] = useState("fade-in"); // 애니메이션 클래스 관리

  useEffect(() => {
    // 4초마다 텍스트와 애니메이션 클래스 변경
    const interval = setInterval(() => {
      setFadeClass("fade-out"); // 먼저 텍스트를 서서히 사라지게 함
      setTimeout(() => {
        setShowText1((prev) => !prev); // 텍스트를 교체
        setFadeClass("fade-in"); // 새로운 텍스트를 서서히 나타나게 함
      }, 1000); // 1초 후에 텍스트를 교체하고 애니메이션 변경
    }, 4000); // 4초마다 반복

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  let navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // 홈페이지로 리디렉션
    dispatch(logout()); // Redux store에서 로그아웃 처리
  };

  return (
    <>
      <div className="navbar-top-wrapper">
        <div className="navbar-top-main">
          <div
            className="navbar-top-section1"
            onClick={() => {
              window.location.href =
                "https://www.hanacard.co.kr/OPH30000000N.web?_frame=no&schID=pcd&mID=OPH30000000C&";
            }}
          >
            하나카드 홈페이지
          </div>
          <div className="navbar-top-section2">
            <div> {user ? <>{user.name}님  |</> : <>회원가입  |</>}</div>
            <div>고객센터  |</div>
            <div>공지사항</div>
          </div>
        </div>
      </div>
      <div className={"navbar-wrapper " + backgroundColor}>
        <nav className={"navbar-main " + backgroundColor}>
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className={"logo-img " + logoColor}
              src={process.env.PUBLIC_URL + "/img/logo192.png"}
              alt="Logo"
            />
            <span className={`logo-text ${fadeClass}`}>
              {showText1 ? "하나로" : "Hanaro"}
            </span>
          </div>
          <div className="nav-menu">
            <Link to="/mycard" className={"nav-link " + font}>
              <NavLinkImage
                text="내 카드"
                font={font}
                icon={0}
                isActive={currentPath === "/mycard"}
              />
            </Link>
            <Link to="/findcard" className={"nav-link " + font}>
              <NavLinkImage
                text="카드 차트"
                icon={1}
                isActive={currentPath === "/findcard"}
              />
            </Link>
            <Link to="/cardrecommend" className={"nav-link " + font}>
              <NavLinkImage
                text="카드 추천"
                icon={2}
                isActive={currentPath === "/cardrecommend"}
              />
            </Link>
            <Link to="/map" className={"nav-link " + font}>
              <NavLinkImage
                text="혜택 지도"
                icon={3}
                isActive={currentPath === "/map"}
              />
            </Link>
            {user ? (
              <Link onClick={handleLogout} className={"nav-link " + font}>
                <NavLinkImage
                  text="로그아웃"
                  icon={4}
                  isActive={currentPath === "/asdasd"}
                />
              </Link>
            ) : (
              <Link to="/" className={"nav-link " + font}>
                <NavLinkImage
                  text="로그인"
                  icon={4}
                  isActive={currentPath === "/asdasd"}
                />
              </Link>
            )}
          </div>
          <div className={"hamburger-menu " + hamburgerColor}>
            <HamburgerDrawer />
          </div>
        </nav>
      </div>
    </>
  );
}

export function Hamburger() {
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={process.env.PUBLIC_URL + "/img/hamburgerImg.png"}
          alt="Logo"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>성하나님 안녕하세요!</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody></PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export function HamburgerDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [imageSrc] = useState(process.env.PUBLIC_URL + "/img/hamburgerImg.png");
  const user = useSelector((state) => state.user.userInfo); // Redux store에서 사용자 정보 가져오기
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/"); // 홈페이지로 리디렉션
    dispatch(logout()); // Redux store에서 로그아웃 처리
  };
  return (
    <>
      <img
        ref={btnRef}
        onClick={onOpen}
        src={imageSrc}
        alt="Menu"
        className="hamburger-menu"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {user
              ? `안녕하세요, ${user.name}님!`
              : "로그인 후 이용 가능합니다."}
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column">
            {user ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/mycard");
                  }}
                  mb={3}
                >
                  내 카드
                </Button>
                <Button
                  onClick={() => {
                    navigate("/findcard");
                  }}
                  mb={3}
                >
                  카드 차트
                </Button>
                <Button
                  onClick={() => {
                    navigate("/cardrecommend");
                  }}
                  mb={3}
                >
                  카드 추천
                </Button>
                <Button
                  onClick={() => {
                    navigate("/map");
                  }}
                  mb={3}
                >
                  혜택지도
                </Button>
                <Button
                  onClick={() => {
                    handleLogout();
                  }}
                  mb={3}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Button onClick={() => (window.location.href = "/")}>
                로그인 하기
              </Button>
            )}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function NavLinkImage(props, { font }) {
  const [hover, setHover] = useState(false);
  const linkClass = props.isActive ? "active-link" : "";
  const icons = [
    <CiCreditCard1
      size="50"
      style={{ opacity: hover ? 1 : 0 }}
      className={`${linkClass}`}
    />,
    <FaRegListAlt
      size="30"
      style={{ opacity: hover ? 1 : 0 }}
      className={`${linkClass}`}
    />,
    <FiThumbsUp
      size="30"
      style={{ opacity: hover ? 1 : 0 }}
      className={`${linkClass}`}
    />,
    <FaRegMap
      size="30"
      style={{ opacity: hover ? 1 : 0 }}
      className={`${linkClass} font`}
    />,
    <RiLoginBoxLine
      size="30"
      style={{ opacity: hover ? 1 : 0 }}
      className={`${linkClass}`}
    />,
  ];
  return (
    <div
      className={`nav-link ${linkClass}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ opacity: hover ? 0 : 1 }}>{props.text}</span>
      {icons[props.icon]}
    </div>
  );
}

export default NavbarMain;
