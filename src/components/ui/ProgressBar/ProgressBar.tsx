"use client";
import styles from "./progressBar.module.css";
import * as Progress from "@radix-ui/react-progress";

interface Props {
  progress: number;
}

/**
 * ProgressBar
 * @prop percentComplete
 */
function ProgressBar({ progress }: Props) {
  return (
    <Progress.Root className={styles.progressRoot} value={progress}>
      <Progress.Indicator
        className={styles.progressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      ></Progress.Indicator>
    </Progress.Root>
  );
}

export default ProgressBar;
