function Card3d() {
  return (
    <>
      <div className="card3d-set-container">
        <div className="card3d-container card3d-3">
          <div className="card3d-title">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>현명한 선택</h3>
            <h1>카드 조합 및 카드 추천</h1>
            <span>
              내 소비 내역을 기반으로 가장 적합한 카드를 추천 받아보세요
            </span>
          </div>
          <div className="card3d-img">
            <img
              src={
                process.env.PUBLIC_URL + "/img/3d-cardrecommand-section3.png"
              }
              className="card3d-img-individual"
            />
          </div>
        </div>
        <div className="card3d-container card3d-2">
          <div className="card3d-title">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>편리한 소비</h3>
            <h1>위치기반 카드 혜택 지도</h1>
            <span>
              내 주변 가장 많은 혜택을 받는 가맹점을 선택하고 추천카드로
              결제하세요
            </span>
          </div>
          <div className="card3d-img">
            <img
              src={process.env.PUBLIC_URL + "/img/3d-map-section3.png"}
              className="card3d-img-individual"
            />
          </div>
        </div>
        <div className="card3d-container card3d-1">
          <div className="card3d-title">
            <h3 style={{ color: "rgba(62, 191, 171, 1)" }}>현명한 소비</h3>
            <h1>실시간 소비 진단</h1>
            <span>내 소비에 대한 혜택 점수를 실시간으로 확인해보세요</span>
          </div>
          <div className="card3d-img">
            <img
              src={process.env.PUBLIC_URL + "/img/3d-medical-chart.png"}
              className="card3d-img-individual"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Card3d;
