import React from "react";
import CountUp from "react-countup";

function AnimatedNumberCount({ value }) {
  return (
    <CountUp
      start={value * 0.1}
      // start={value - 300}
      end={value}
      duration={2}
      separator=","
      decimals={value % 1 === 0 ? 0 : 2} // 소수점 처리
      decimal="."
      prefix=""
      suffix=""
    />
  );
}

export default AnimatedNumberCount;
