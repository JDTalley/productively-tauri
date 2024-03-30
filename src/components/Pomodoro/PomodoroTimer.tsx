'use client';
import React from 'react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import CircleProgressBar from '../ui/CircleProgressBar';
//import { roboto_mono } from '../../fonts';
import styles from './timer.module.css';

/**
 * Enum for timer modes
 * @readonly
 * @enum
 */
const Modes = { POM: 'Pomodoro', SHORT: 'Short Break', LONG: 'Long Break' };

/**
 * @param {*} config Object storing pomodoro config items {pomodoro, shortBreak, longBreak, interval}
 * @returns PomodoroTimer react component
 */
function PomodoroTimer({ config }) {
  const [mode, setMode] = React.useState(Modes.POM);
  const [interval, setInterval] = React.useState(1);
  const [time, setTime, timerRunning, setTimerRunning] = useCountdownTime(
    config.pomodoro * 60
  );

  // If timer hits zero, check for next step
  if (time === 0) {
    // Check current mode
    switch (mode) {
      case Modes.POM:
        // If less than configured intervals have been completed, short break
        if (interval < config.interval) {
          setMode(Modes.SHORT);
          setTime(config.shortBreak * 60);
          // Else long break
        } else {
          setMode(Modes.LONG);
          setTime(config.longBreak * 60);
        }
        // Progress interval
        setInterval(interval + 1);
        break;
      case Modes.SHORT:
        setMode(Modes.POM);
        setTime(config.pomodoro * 60);
        break;
      case Modes.LONG:
        setMode(Modes.POM);
        setTime(config.pomodoro * 60);
        // Reset interval after long break
        setInterval(1);
        break;
      default:
        console.log(`Incompatable Mode:${mode}`);
    }
  }

  // Get minutes and seconds for displaying timer
  const minutes = Math.floor(time / 60);
  const seconds = time - Math.floor(time / 60) * 60;

  // Get percentage of timer completion for circle progress bar
  let percentComplete = 0;
  let configTimeInSecs = 0;
  switch (mode) {
    case Modes.POM:
      configTimeInSecs = config.pomodoro * 60;
      break;
    case Modes.SHORT:
      configTimeInSecs = config.shortBreak * 60;
      break;
    case Modes.LONG:
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
          $progress={((interval - 1) / config.interval) * 100}
        ></ProgressBar>
        <div className={styles.stepButtonGroup}>
          <div className={styles.stepButton}
            name='Select Pomodoro'
            onClick={() => {
              setMode(Modes.POM);
              setTime(config.pomodoro * 60);
            }}
            //$selected={mode === Modes.POM}
          >
            {Modes.POM}
          </div>
          <div className={styles.stepButton}
            name='Select Short Break'
            onClick={() => {
              setMode(Modes.SHORT);
              setTime(config.shortBreak * 60);
            }}
            //$selected={mode === Modes.SHORT}
          >
            {Modes.SHORT}
          </div>
          <div className={styles.stepButton}
            name='Select Long Break'
            onClick={() => {
              setMode(Modes.LONG);
              setTime(config.longBreak * 60);
            }}
            //$selected={mode === Modes.LONG}
          >
            {Modes.LONG}
          </div>
        </div>
      </div>
      <div className={styles.circleContainer}>
        <CircleProgressBar progress={percentComplete}>
          <div className={styles.timerText}>
            {padNumber(minutes)}:{padNumber(seconds)}
          </div>
        </CircleProgressBar>
      </div>
      <Button
        name='Toggle Timer'
        onClick={() => setTimerRunning(!timerRunning)}
      >
        {timerRunning ? 'Stop' : 'Start'}
      </Button>
    </div>
  );
}

/* Helper Functions */
// Function takes a number and adds padding to match format 00:00
const padNumber = (number) => {
  if (number < 10) {
    return '0' + number;
  } else {
    return number;
  }
};

/**
 *
 * @param {seconds} initialTime Optional time in seconds to set the initial timer to
 * @returns time, setTime, timerRunning, setTimerRunning
 */
function useCountdownTime(initialTime) {
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

  return [time, setTime, timerRunning, setTimerRunning];
}

export default PomodoroTimer;
