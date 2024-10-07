import React, { useEffect, useRef, useState } from "react";

function RotatableImage({
  src,
  alt,
  className = "",
  style = {},
  rotationDirection = "vertical",
}) {
  const imgRef = useRef(null);
  const [isRotated, setIsRotated] = useState(false); // 회전 상태 추적

  useEffect(() => {
    const img = imgRef.current;

    const handleImageLoad = () => {
      if (!isRotated) {
        if (
          rotationDirection === "vertical" &&
          img.naturalHeight > img.naturalWidth
        ) {
          img.style.transform = "rotate(-90deg)";
          setIsRotated(true); // 이미지 회전 상태 저장
        } else if (
          rotationDirection === "horizontal" &&
          img.naturalWidth > img.naturalHeight
        ) {
          img.style.transform = "rotate(90deg)";
          setIsRotated(true); // 이미지 회전 상태 저장
        }
      }
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }

    return () => {
      img.removeEventListener("load", handleImageLoad);
    };
  }, [src, rotationDirection, isRotated]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
      }}
    />
  );
}

export default RotatableImage;
