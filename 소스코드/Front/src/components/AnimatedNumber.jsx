import React from "react";
import CountUp from "react-countup";

function AnimatedNumber({ value }) {
  return (
    <CountUp
      start={value * 0.8}
      // start={value - 300}
      end={value}
      duration={2}
      separator=","
      decimals={value % 1 === 0 ? 0 : 0} // 소수점 처리
      decimal="."
      prefix=""
      suffix="원"
    />
  );
}

export default AnimatedNumber;
