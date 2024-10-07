/*eslint-disable*/

// css
import "./style/App.css";

// dependencies
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// pages
import Land from "./pages/Land";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import MyCard from "./pages/MyCard";
import CardFind from "./pages/CardFind";
import BenefitMap from "./pages/BenefitMap";
import MyCardDetail from "./pages/MyCardDetail";
import NavbarMain from "./components/NavBarMain";
import Footer from "./components/Footer";
import CardRecommend from "./pages/CardRecommend";
import CardProduct from "./pages/CardProduct";
import CardProductDetail from "./pages/CardProductDetail";
import CardChartTop3 from "./pages/CardChartTop3";
import RecommendChoice from "./pages/RecommendChoice";
import RecommendTest from "./pages/RecommendTest";
import RecommendDataResult from "./pages/RecommendDataResult";
import RecommendSurveyResult from "./pages/RecommendSurveyResult";
import RecommendCertificateFrom from "./pages/RecommendCertificateForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootOutlet />}>
          <Route path="" element={<Main />} />
          <Route path="mycard" element={<MyCard />} />
          <Route path="mycard/:cardId" element={<MyCardDetail />} />
          <Route path="findcard" element={<CardFind />} />
          <Route path="findcard/:categoryId" element={<CardChartTop3 />} />
          <Route path="card-product" element={<CardProduct />} />
          <Route path="card-product/:cardId" element={<CardProductDetail />} />
          <Route path="cardrecommend" element={<CardRecommend />} />
          <Route
            path="cardrecommend/recommend-choice"
            element={<RecommendChoice />}
          />
          <Route
            path="cardrecommend/recommend-choice/test"
            element={<RecommendTest />}
          />
          <Route
            path="cardrecommend/recommend-choice/certificate-form"
            element={<RecommendCertificateFrom />}
          />
          <Route
            path="cardrecommend/recommend-choice/data-results"
            element={<RecommendDataResult />}
          />
          <Route
            path="cardrecommend/recommend-choice/survey-results"
            element={<RecommendSurveyResult />}
          />
        </Route>
        <Route path="map" element={<BenefitMap />} />
        <Route path="/land" element={<Land />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function RootOutlet() {
  return (
    <>
      <NavbarMain />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
