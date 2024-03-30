"use client";
import { ReactNode } from "react";
import styles from "./circleProgressBar.module.css";

interface Props {
  progress: number;
  children: ReactNode;
}

/**
 * CircleProgressBar
 * @prop percentComplete
 */
function CircleProgressBar({ progress, children }: Props) {
  const progressStyle = {
    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(
      hsl(205, 62%, 49%) ${progress}%,
      hsl(205, 0%, 55%) 0
    )`,
  };
  return (
    <div style={progressStyle} className={styles.container}>
      {children}
    </div>
  );
}

export default CircleProgressBar;
