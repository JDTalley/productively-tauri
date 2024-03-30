"use client";
import React from "react";
import { Config } from "./types";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import CircleProgressBar from "../ui/CircleProgressBar";
//import { roboto_mono } from '../../fonts';
import styles from "./timer.module.css";

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
        break;
      case Mode.SHORT:
        setMode(Mode.POM);
        setTime(config.pomodoro * 60);
        break;
      case Mode.LONG:
        setMode(Mode.POM);
        setTime(config.pomodoro * 60);
        // Reset interval after long break
        setInterval(1);
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
  let percentComplete = 0;
  let configTimeInSecs = 0;
  switch (mode) {
    case Mode.POM:
      configTimeInSecs = config.pomodoro * 60;
      break;
    case Mode.SHORT:
      configTimeInSecs = config.shortBreak * 60;
      break;
    case Mode.LONG:
      configTimeInSecs = config.longBreak * 60;
      break;
    default:
      console.log(`Incompatable Mode:${mode}`);
  }
  percentComplete = ((configTimeInSecs - time) / configTimeInSecs) * 100;

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
        <CircleProgressBar progress={percentComplete}>
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

/**
 *
 * @param {seconds} initialTime Optional time in seconds to set the initial timer to
 * @returns time, setTime, timerRunning, setTimerRunning
 */
function useCountdownTime(initialTime: number) {
  const [time, setTime] = React.useState(initialTime || 60);
  const [timerRunning, setTimerRunning] = React.useState(false);

  React.useEffect(() => {
    if (timerRunning) {
      const intervalId = window.setInterval(() => {
        setTime((oldTime) => {
          const newTime = oldTime - 1;
          if (newTime === 0) {
            setTimerRunning(false);
          }
          return newTime;
        });
      }, 1000);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [timerRunning]);

  return [time, setTime, timerRunning, setTimerRunning] as const;
}

export default PomodoroTimer;
