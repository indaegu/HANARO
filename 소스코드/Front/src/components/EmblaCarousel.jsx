import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../components/EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "../components/EmblaCarouselDotButtons";
import "../style/embla.css";
import RotatableImage from "./RotatableImage";
import { FaCrown } from "react-icons/fa"; // React Icons에서 왕관 아이콘 가져오기

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel = (props) => {
  const { data, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [sortedCards, setSortedCards] = useState([]);

  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (data && data.cardDetailList) {
      const sortedData = [...data.cardDetailList].sort(
        (a, b) => b.point - a.point
      );
      setSortedCards(sortedData);
    }
  }, [data]);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__content");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {sortedCards.map((card, index) => {
            const crownColor =
              index === 0 ? "gold" : index === 1 ? "silver" : "#cd7f32";
            return (
              <div
                className={`embla__slide embla__slide--rank${index + 1}`}
                key={index}
              >
                <div className="embla__slide__content">
                  <div className="embla__image-container">
                    <RotatableImage
                      src={card.cardImgUrl}
                      alt={`${card.cardName} 이미지`}
                      className={`embla__image embla__image--rank${index + 1}`}
                      style={{}}
                      rotationDirection="horizontal" // 또는 "vertical", "horizontal"
                    />
                    <FaCrown
                      style={{
                        position: "absolute",
                        top: "-50px",
                        right: "80px",
                        fontSize: "60px",
                        zIndex: "200",
                        color: crownColor,
                      }}
                    />
                  </div>

                  <h3>{card.cardName}</h3>
                  {card.cardBenefitList.slice(0, 3).map((benefit, idx) => (
                    <div key={idx}>{benefit.cardBenefit}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
