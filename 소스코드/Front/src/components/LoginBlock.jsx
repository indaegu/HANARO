import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 라이브러리 임포트
import { useDispatch, useSelector } from "react-redux";
import { setLoginSuccess } from "../store.js";

import "../style/Main.css";
import "../style/hover.css";

export default function LoginBlock() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로더 상태 추가

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setIsLoading(true); // 로그인 시도시 로더 활성화
    e.preventDefault();
    console.log("로그인 시도:", userId, password); // 나중에 삭제
    try {
      const response = await axios.post(
        "https://hana-ro-backend.site:8080/api/user/login",
        {
          userId: userId,
          password: password,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        // JWT 토큰을 Redux 스토어에 저장
        dispatch(setLoginSuccess({ token: response.data }));
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response);
      alert("로그인 실패. 다시 시도해주세요.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="loginblock-container-2">
        {isLoading ? (
          <span className="login-loader"></span>
        ) : (
          <>
            <h2 className="login-form-title">로그인</h2>
            <div className="login-form">
              <form>
                <div className="form-group">
                  <label htmlFor="userId" className="custom-label">
                    아이디
                  </label>
                  <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력해주세요"
                    className="custom-input"
                  />
                </div>
                <div className="form-group form-group-password">
                  <label htmlFor="password" className="custom-label">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                    className="custom-input"
                  />
                </div>
                <button onClick={handleLogin} className="login-button hvr-fade">
                  로그인
                </button>
              </form>
              <div className="links">
                <Link to="/idfind" className="hvr-underline-reveal">
                  아이디 찾기
                </Link>
                |
                <Link to="/passwordfind" className="hvr-underline-reveal">
                  비밀번호 찾기
                </Link>
                |
                <Link to="/signin" className="hvr-underline-reveal">
                  회원가입
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
