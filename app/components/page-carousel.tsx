"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const GAP = 16;
const INACTIVE_OPACITY = 0.8;
const SWIPE_THRESHOLD = 0.3;
const EDGE_RESISTANCE = 0.3;
const TRANSITION = "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const OPACITY_TRANSITION = "opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";

interface PageCarouselProps {
  index: number;
  onNavigate: (i: number) => void;
  children: React.ReactNode;
}

export default function PageCarousel({ index, onNavigate, children }: PageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const slides = React.Children.toArray(children);

  const indexRef = useRef(index);
  useEffect(() => { indexRef.current = index; }, [index]);

  // Tracks the intended destination, updated synchronously in goToIndex so touch
  // handlers always have the correct base position even before React re-renders.
  const destRef = useRef(index);
  useEffect(() => { destRef.current = index; }, [index]);

  const slideWidthRef = useRef(slideWidth);
  useEffect(() => { slideWidthRef.current = slideWidth; }, [slideWidth]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setSlideWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToIndex = useCallback((i: number) => {
    if (i >= 0 && i < slides.length) {
      destRef.current = i; // sync update so touch handlers see new dest immediately
      onNavigate(i);
    }
  }, [onNavigate, slides.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") goToIndex(destRef.current - 1);
      if (e.key === "ArrowRight") goToIndex(destRef.current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goToIndex]);

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    let startX = 0;
    let startY = 0;
    let isHorizontal: boolean | null = null;
    let dragBaseX = 0; // actual mid-animation position when drag started

    const destBaseX = () => -(destRef.current * (slideWidthRef.current + GAP));

    const slideEls = () => Array.from(track.children) as HTMLElement[];

    const setOpacities = (activeOpacity: number, targetIdx: number, targetOpacity: number) => {
      slideEls().forEach((el, i) => {
        if (i === destRef.current) el.style.opacity = String(activeOpacity);
        else if (i === targetIdx) el.style.opacity = String(targetOpacity);
        else el.style.opacity = String(INACTIVE_OPACITY);
      });
    };

    const restoreOpacities = () => {
      slideEls().forEach((el, i) => {
        el.style.transition = OPACITY_TRANSITION;
        el.style.opacity = i === destRef.current ? "1" : String(INACTIVE_OPACITY);
      });
    };

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isHorizontal = null;

      // Read actual mid-animation position before disabling transition —
      // without this, setting transition:none snaps the element to its animation target.
      const matrix = new DOMMatrix(getComputedStyle(track).transform);
      dragBaseX = matrix.m41;
      track.style.transition = "none";
      track.style.transform = `translateX(${dragBaseX}px)`;
      slideEls().forEach(el => { el.style.transition = "none"; });
    };

    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (isHorizontal === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isHorizontal = Math.abs(dx) > Math.abs(dy);
        if (!isHorizontal) {
          track.style.transition = TRANSITION;
          slideEls().forEach(el => { el.style.transition = OPACITY_TRANSITION; });
        }
      }
      if (!isHorizontal) return;
      e.preventDefault();

      const atStart = destRef.current === 0 && dx > 0;
      const atEnd = destRef.current === slides.length - 1 && dx < 0;
      const effectiveDx = (atStart || atEnd) ? dx * EDGE_RESISTANCE : dx;

      track.style.transform = `translateX(${dragBaseX + effectiveDx}px)`;

      // Opacity: proportion of how far the drag is from the destination position
      const dist = Math.abs((dragBaseX + effectiveDx) - destBaseX());
      const progress = Math.min(dist / slideWidthRef.current, 1);
      const targetIdx = (dragBaseX + effectiveDx) < destBaseX()
        ? destRef.current + 1
        : destRef.current - 1;
      setOpacities(1 - progress * (1 - INACTIVE_OPACITY), targetIdx, INACTIVE_OPACITY + progress * (1 - INACTIVE_OPACITY));
    };

    const onEnd = (e: TouchEvent) => {
      if (!isHorizontal) return;
      const dx = e.changedTouches[0].clientX - startX;
      const threshold = slideWidthRef.current * SWIPE_THRESHOLD;

      track.style.transition = TRANSITION;
      slideEls().forEach(el => { el.style.transition = OPACITY_TRANSITION; });

      if (Math.abs(dx) > threshold) {
        const newIndex = dx < 0 ? destRef.current + 1 : destRef.current - 1;
        if (newIndex >= 0 && newIndex < slides.length) {
          goToIndex(newIndex);
          return;
        }
      }
      track.style.transform = `translateX(${destBaseX()}px)`;
      restoreOpacities();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [goToIndex, slides.length]);

  const translateX = slideWidth > 0 ? -(index * (slideWidth + GAP)) : 0;

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 overflow-hidden sm:overflow-visible"
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          gap: GAP,
          transform: `translateX(${translateX}px)`,
          transition: slideWidth > 0 ? TRANSITION : "none",
          willChange: "transform",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="shrink-0 h-full"
            style={{
              width: slideWidth > 0 ? slideWidth : "100%",
              opacity: i === index ? 1 : INACTIVE_OPACITY,
              transition: OPACITY_TRANSITION,
            }}
          >
            <div className="h-full overflow-y-auto no-scrollbar pt-2">
              {slide}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
