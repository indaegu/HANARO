import "../style/Footer.css";
function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container">
          <nav className="footer-nav">
            <div className="footer-top-container">
              <span>회사소개   |</span>
              <span>경영공시   |</span>
              <span>웹이용약관   |</span>
              <span style={{ color: "white" }}>개인정보처리 방침</span>
              <span>|   위치기반서비스 이용약관   |</span>
            </div>
            <img
              className="footer-logo"
              src={process.env.PUBLIC_URL + "/img/logo192.png"}
              alt="Logo"
            />
          </nav>
          <address className="footer-address">
            <span>
              <strong>
                고객센터(유료) 국내 1800-0000 / 해외 82-1800-0000{" "}
              </strong>
            </span>
            <span>
              <strong>시각장애인 전용상담센터 1599-0000</strong>{" "}
            </span>
            <span>그룹사간 고객정보 제공내역 조회</span>
            <span>자주하는 질문</span>
            <span>인천광역시 서구 청라동 </span>
            <span>
              <b>개발자 성창민</b>
            </span>
            <span>
              <b>COPYRIGHTⓒ 2024 HanaRo. All RIGHTS RESERVED</b>
            </span>
          </address>
        </div>
      </footer>
    </>
  );
}
export default Footer;
