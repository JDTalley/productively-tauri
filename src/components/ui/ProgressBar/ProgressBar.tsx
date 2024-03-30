"use client";
import { ReactNode } from "react";
import styles from "./progressBar.module.css";

interface Props {
  progress: number;
}

/**
 * ProgressBar
 * @prop percentComplete
 */
function ProgressBar({ progress }: Props) {
  const progressStyle = {
    background: `linear-gradient(
      to right,
      hsl(205, 62%, 49%) ${progress}%,
      hsl(205, 0%, 55%) 0
    )`,
  };

  return <div style={progressStyle} className={styles.container}></div>;
}

export default ProgressBar;
