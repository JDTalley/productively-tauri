"use client";
import { Config } from "./types";
import PomodoroTimer from "./PomodoroTimer";
import styles from "./pomodoro.module.css";

interface Props {
  config: Config;
}

function Pomodoro({ config }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.pomodoro}>
        <PomodoroTimer config={config as Config}></PomodoroTimer>
      </div>
    </div>
  );
}

export default Pomodoro;
