import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full my-8 rounded-[40px] origin-top will-change-transform ${itemClassName}`}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemStackDistance = 60,
  stackPosition = "20%",
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const rafRef = useRef(null);
  const lenisRef = useRef(null);
  const lastYRef = useRef([]);
  const completedRef = useRef(false);

  const parsePercentage = (value, height) =>
    typeof value === "string" ? (parseFloat(value) / 100) * height : value;

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const vh = window.innerHeight;
    const stackPx = parsePercentage(stackPosition, vh);

    cardsRef.current.forEach((card, i) => {
      const cardTop = cardOffsetsRef.current[i];
      const start = cardTop - stackPx - itemStackDistance * i;
      const end = cardOffsetsRef.current.at(-1) - vh / 2;

      let y = 0;
      if (scrollTop >= start && scrollTop <= end) {
        y = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > end) {
        y = end - cardTop + stackPx + itemStackDistance * i;
      }

      y = Math.max(0, Math.round(y));

      if (lastYRef.current[i] !== y) {
        card.style.transform = `translate3d(0, ${y}px, 0)`;
        lastYRef.current[i] = y;
      }

      if (i === cardsRef.current.length - 1) {
        const active = scrollTop >= start && scrollTop <= end;
        if (active && !completedRef.current) {
          completedRef.current = true;
          onStackComplete?.();
        }
        if (!active) completedRef.current = false;
      }
    });
  }, [itemStackDistance, stackPosition, onStackComplete]);

  const onScroll = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    }
  };

  useLayoutEffect(() => {
    const cards = Array.from(document.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    cardOffsetsRef.current = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translate3d(0,0,0)";
    });

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1
    });

    lenis.on("scroll", onScroll);

    const raf = time => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenisRef.current = lenis;
    update();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafRef.current);
    };
  }, [itemDistance, update]);

  return (
    <div ref={scrollerRef} className={`relative w-full ${className}`}>
      <div className="scroll-stack-inner pt-[5vh] px-6 pb-[25vh]">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
