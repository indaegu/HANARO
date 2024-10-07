import "../style/App.css";
import "../style/Main.css";
import "animate.css";
import LoginBlock from "../components/LoginBlock";
import MiniMenu from "../components/MiniMenu";
import ADSwipe from "../components/ADSwipe";
import LoginBlockLogin from "../components/LoginBlockLogin";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NewCardSwipe from "../components/NewCardSwipe";

function Main() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.user.isLoading); // 로딩 상태 추가

  // 로드시 스크롤을 최상단으로 이동 시킴
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="main-back ">
        <div className={"main-container "}>
          {/* <Card3d></Card3d> */}
          <div className="main-inner-container main-inner-top page-enter ">
            {/* <Card3dSwipe /> */}
            <ADSwipe />
            {!isLoading && (isLoggedIn ? <LoginBlockLogin /> : <LoginBlock />)}
          </div>
          <div className="main-inner-container animate__animated animate__fadeIn">
            <NewCardSwipe />
          </div>

          <div className="main-title animate__animated animate__fadeIn">
            {/* <h2>빠른메뉴</h2> */}
          </div>
          <div className="main-inner-container animate__animated animate__fadeIn">
            <MiniMenu></MiniMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
