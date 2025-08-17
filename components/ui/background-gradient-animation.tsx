"use client";

// Installation: npx shadcn@latest add https://ui.aceternity.com/registry/background-gradient-animation.json

import { useState, type CSSProperties } from "react";
import clsx from "clsx";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: CSSProperties["mixBlendMode"];
  interactive?: boolean;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function BackgroundGradientAnimation({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  interactive = true,
  className,
  containerClassName,
  children,
}: BackgroundGradientAnimationProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden",
        containerClassName,
      )}
      style={{
        background: `linear-gradient(to bottom right, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
      onMouseMove={
        interactive
          ? (e) => {
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();

              setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
          : undefined
      }
    >
      <div
        className={clsx("absolute inset-0 opacity-60", className)}
        style={{ mixBlendMode: blendingValue }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: size, height: size }}
        >
          <span
            className="absolute left-1/2 top-0 h-1/3 w-1/3 -translate-x-1/2 rounded-full blur-3xl animate-first"
            style={{ backgroundColor: `rgba(${firstColor},0.7)` }}
          />
          <span
            className="absolute right-0 top-1/2 h-1/3 w-1/3 -translate-y-1/2 rounded-full blur-3xl animate-second"
            style={{ backgroundColor: `rgba(${secondColor},0.7)` }}
          />
          <span
            className="absolute left-0 top-1/2 h-1/3 w-1/3 -translate-y-1/2 rounded-full blur-3xl animate-third"
            style={{ backgroundColor: `rgba(${thirdColor},0.7)` }}
          />
          <span
            className="absolute left-1/2 bottom-0 h-1/3 w-1/3 -translate-x-1/2 rounded-full blur-3xl animate-fourth"
            style={{ backgroundColor: `rgba(${fourthColor},0.7)` }}
          />
          <span
            className="absolute right-0 bottom-0 h-1/3 w-1/3 rounded-full blur-3xl animate-fifth"
            style={{ backgroundColor: `rgba(${fifthColor},0.7)` }}
          />
        </div>
      </div>
      {interactive && (
        <div
          className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-transform duration-300"
          style={{
            background: `radial-gradient(circle at center, rgba(${pointerColor},0.4), transparent 70%)`,
            transform: `translate(${coords.x}px, ${coords.y}px)`,
          }}
        />
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
