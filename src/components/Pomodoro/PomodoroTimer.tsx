"use client";
import React from "react";
import { Config } from "./types";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import CircleProgressBar from "../ui/CircleProgressBar";
import styles from "./timer.module.css";
import useCountdownTime from "../../hooks/useCountdownTime";

interface Props {
  config: Config;
}

/**
 * Enum for timer modes
 * @readonly
 * @enum
 */
enum Mode {
  POM = "Pomodoro",
  SHORT = "Short Break",
  LONG = "Long Break",
}

//const Modes = { POM: "Pomodoro", SHORT: "Short Break", LONG: "Long Break" };

/**
 * @param {*} config Object storing pomodoro config items {pomodoro, shortBreak, longBreak, interval}
 * @returns PomodoroTimer react component
 */
function PomodoroTimer({ config }: Props) {
  const [mode, setMode] = React.useState(Mode.POM);
  const [interval, setInterval] = React.useState(1);
  const [time, setTime, timerRunning, setTimerRunning] = useCountdownTime(
    config.pomodoro * 60
  );

  function nextStep(mode: Mode) {
    // Check current mode
    switch (mode) {
      case Mode.POM:
        // If less than configured intervals have been completed, short break
        if (interval < config.interval) {
          setMode(Mode.SHORT);
          setTime(config.shortBreak * 60);
          // Else long break
        } else {
          setMode(Mode.LONG);
          setTime(config.longBreak * 60);
        }
        // Progress interval
        setInterval(interval + 1);
        setTimerRunning(false);
        break;
      case Mode.SHORT:
        setMode(Mode.POM);
        setTime(config.pomodoro * 60);
        setTimerRunning(false);
        break;
      case Mode.LONG:
        setMode(Mode.POM);
        setTime(config.pomodoro * 60);
        // Reset interval after long break
        setInterval(1);
        setTimerRunning(false);
        break;
      default:
        console.log(`Incompatable Mode:${mode}`);
    }
  }

  // If timer hits zero, check for next step
  if (time === 0) {
    nextStep(mode);
  }

  // Get minutes and seconds for displaying timer
  const minutes = Math.floor(time / 60);
  const seconds = time - Math.floor(time / 60) * 60;

  // Get percentage of timer completion for circle progress bar
  function getConfigTime(mode: Mode, config: Config) {
    switch (mode) {
      case Mode.POM:
        return config.pomodoro * 60;
      case Mode.SHORT:
        return config.shortBreak * 60;
      case Mode.LONG:
        return config.longBreak * 60;
      default:
        console.log(`Incompatable Mode:${mode}`);
        return 60;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        <ProgressBar
          progress={((interval - 1) / config.interval) * 100}
        ></ProgressBar>
        <div className={styles.stepButtonGroup}>
          <button
            className={
              mode === Mode.POM
                ? `${styles.selected} ${styles.stepButton}`
                : `${styles.stepButton}`
            }
            name="Select Pomodoro"
            onClick={() => {
              setMode(Mode.POM);
              setTime(config.pomodoro * 60);
            }}
          >
            {Mode.POM}
          </button>
          <button
            className={
              mode === Mode.SHORT
                ? `${styles.selected} ${styles.stepButton}`
                : `${styles.stepButton}`
            }
            name="Select Short Break"
            onClick={() => {
              setMode(Mode.SHORT);
              setTime(config.shortBreak * 60);
            }}
          >
            {Mode.SHORT}
          </button>
          <button
            className={
              mode === Mode.LONG
                ? `${styles.selected} ${styles.stepButton}`
                : `${styles.stepButton}`
            }
            name="Select Long Break"
            onClick={() => {
              setMode(Mode.LONG);
              setTime(config.longBreak * 60);
            }}
          >
            {Mode.LONG}
          </button>
        </div>
      </div>
      <div className={styles.circleContainer}>
        <CircleProgressBar progress={time} max={getConfigTime(mode, config)}>
          <div className={styles.timerText}>
            {padNumber(minutes)}:{padNumber(seconds)}
          </div>
        </CircleProgressBar>
      </div>
      <div>
        <Button
          name="Toggle Timer"
          style="primary"
          onClick={() => setTimerRunning(!timerRunning)}
        >
          {timerRunning ? "Stop" : "Start"}
        </Button>
        <Button name="Next Step" style="primary" onClick={() => nextStep(mode)}>
          {"Next"}
        </Button>
      </div>
    </div>
  );
}

/* Helper Functions */
// Function takes a number and adds padding to match format 00:00
const padNumber = (number: number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
};

export default PomodoroTimer;
