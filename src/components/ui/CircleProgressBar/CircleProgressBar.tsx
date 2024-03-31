"use client";
import { ReactNode } from "react";
import * as Progress from "@radix-ui/react-progress";
import styles from "./circleProgressBar.module.css";

interface Props {
  progress: number;
  max: number;
  children: ReactNode;
}

/**
 * CircleProgressBar
 * @prop percentComplete
 */
function CircleProgressBar({ progress, max, children }: Props) {
  const value = max - progress;

  const percent = (value / max) * 100;

  const progressStyle = {
    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(
      hsl(205, 62%, 49%) ${percent}%,
      hsl(205, 0%, 55%) 0
    )`,
  };

  return (
    <Progress.Root className={styles.progressRoot} value={value} max={max}>
      <Progress.Indicator
        className={styles.progressIndicator}
        style={progressStyle}
      >
        {children}
      </Progress.Indicator>
    </Progress.Root>
  );
}

export default CircleProgressBar;
