import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
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
  PopoverAnchor,
  Button,
  ButtonGroup,
  Portal,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

import { CiCreditCard1 } from "react-icons/ci";
import {
  FaMagnifyingGlass,
  FaPersonWalkingDashedLineArrowRight,
} from "react-icons/fa6";
import { FaRegListAlt } from "react-icons/fa";

import { FaRegMap } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store.js";

function Navbar() {
  const dispatch = useDispatch();

  let [font, setFonts] = useState("text-white");
  let [logoColor, setLogoColor] = useState("white-image");
  let [hamburgerColor, setHamburgerColor] = useState("white-image");
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logout()); // Redux store에서 로그아웃 처리
    navigate("/"); // 홈페이지로 리디렉션
  };

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치에 따라 폰트 색상을 변경
      if (window.scrollY >= window.innerHeight && window.scrollY < 3000) {
        setFonts("text-black");
        setLogoColor("");
        setHamburgerColor("");
      } else if (window.scrollY > 3000) {
        setFonts("text-white");
        setLogoColor("white-image");
        setHamburgerColor("white-image");
      } else {
        setFonts("text-white");
        setLogoColor("white-image");
        setHamburgerColor("white-image");
      }
    };
    console.log(window.scrollY);
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  let navigate = useNavigate();
  return (
    <nav className="navbar-land">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          className={"logo-img " + logoColor}
          src={process.env.PUBLIC_URL + "./img/logo192.png"}
          alt="Logo"
        />
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
          <Link to="/login" className={"nav-link " + font}>
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
  );
}

export function Hamburger() {
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={process.env.PUBLIC_URL + "./img/hamburgerImg.png"}
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
  const [imageSrc, setImageSrc] = useState(
    process.env.PUBLIC_URL + "/img/hamburgerImg.png"
  );

  return (
    <>
      <img
        ref={btnRef}
        onClick={onOpen}
        src={imageSrc}
        alt="Logo"
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
          <DrawerHeader>성하나님 안녕하세요!</DrawerHeader>

          <DrawerBody display="flex" flexDirection="column">
            <Button mb={3}>내 정보</Button>
            <Button mb={3}>자산 연결 관리</Button>
            <Button mb={3}>카드 목록 관리</Button>
            <Button mb={3}>고객센터</Button>
            <Button mb={3}>공지사항</Button>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function NavLinkImage(props, { font }) {
  const [hover, setHover] = useState(false);
  const icons = [
    <CiCreditCard1 size="50" style={{ opacity: hover ? 1 : 0 }} />,
    <FaRegListAlt size="30" style={{ opacity: hover ? 1 : 0 }} />,
    <FaRegMap size="30" className={font} style={{ opacity: hover ? 1 : 0 }} />,
    <RiLoginBoxLine size="30" style={{ opacity: hover ? 1 : 0 }} />,
  ];
  return (
    <div
      className="nav-link"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ opacity: hover ? 0 : 1 }}>{props.text}</span>
      {icons[props.icon]}
    </div>
  );
}

export default Navbar;
