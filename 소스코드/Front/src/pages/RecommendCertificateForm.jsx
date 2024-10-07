import { useEffect, useState } from "react";
import "../style/RecommendCertificateForm.css";
import "../style/loading.css";
import { Divider } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecommendCertificateFrom() {
  const [isNotAuthenticated, setIsNotAuthenticated] = useState(true);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  // 해당 요청을 통해서 OAuth 서버로부터 로그인 폼을 받아온다.
  const handleFinalAction = () => {
    // OAuth2 서버로 Authorization Code 요청 URL 생성
    const authorizationUrl = `https://hana-ro-backend.site:8080/auth/start`;

    // 새 브라우저 창 열기 설정
    const width = 650;
    const height = 650;
    const left = window.screen.width / 5 - width / 2; // window.screen 사용
    const top = window.screen.height / 2 - height / 2; // window.screen 사용
    const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=yes`;

    // OAuth2 인증을 위한 새 창 열기
    window.open(authorizationUrl, "Authenticate", windowFeatures);
  };

  const netxStep = () => {
    console.log("넘겨받은 data 출력" + data.status);
    console.log("넘겨받은 data 출력" + data.approvals);
    if (data.status === "success") {
      navigate(`/cardrecommend/recommend-choice/data-results`, {
        state: {
          responseData: data.approvals, // 서버에서 받은 데이터를 state로 넘기기
        },
      });
    } else {
      navigate(`/cardrecommend/recommend-choice/data-results`);
    }
  };

  // 부모 창에서 자식 창으로부터 메시지를 수신
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMessage = (event) => {
      // 인증 성공 처리
      if (event.data.status === "success") {
        console.log("인증 성공:", event.data);
        setData(event.data);
        // 인증 성공 시 상태 변경
        setTimeout(() => {
          setIsNotAuthenticated(false);
        }, 500);
      }
    };

    window.addEventListener("message", handleMessage);

    // 컴포넌트 언마운트 시 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <div className="recommend-certificate-form-container">
        {isNotAuthenticated ? (
          <div className="recommend-certificate-form-title fade-in show">
            <div className="recommend-certificate-form-title1">추가 인증</div>
            <div className="recommend-certificate-form-title2">
              더욱 정확한 결과를 위해선{" "}
              <strong>모든 금융사의 결제 데이터</strong>가 필요해요.
            </div>
            <div className="recommend-certificate-form-title2">
              추가 인증을 통해 모든 결제 내역을 불러오거나, 기존의 결제 내역으로
              바로 시작해보세요!
            </div>
          </div>
        ) : (
          <div className="recommend-certificate-form-title fade-in show">
            <div className="recommend-certificate-form-title1">인증 완료</div>
            <div className="recommend-certificate-form-title2">
              인증이 완료되었어요!
            </div>
            <div className="recommend-certificate-form-title2">
              아래 추천 받기를 통해 추천을 받아보세요!
            </div>
          </div>
        )}

        <div className="recommend-certificate-form-loader-container">
          {isNotAuthenticated ? (
            <span className="loader2 fade-in show"></span>
          ) : (
            <div className="auth-complete fade-in show">
              <svg viewBox="0 0 52 52">
                <path d="M14 27 l8 8 l16 -16" />
              </svg>
            </div>
          )}
        </div>
        <div className="recommend-certificate-form-button-container">
          {" "}
          {isNotAuthenticated ? (
            <>
              {" "}
              <button
                className="recommend-certificate-form-button fade-in show"
                onClick={() => {
                  handleFinalAction();
                }}
              >
                인증하기
              </button>
              <button
                className="recommend-certificate-form-button fade-in show"
                onClick={() => {
                  netxStep();
                }}
              >
                바로 진행하기
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                className="recommend-certificate-form-button fade-in show "
                onClick={() => {
                  netxStep();
                }}
              >
                상세추천받기
              </button>
              <button
                className="recommend-certificate-form-button fade-in show"
                onClick={() => {
                  netxStep();
                }}
              >
                바로 진행하기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
