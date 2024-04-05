import React from "react";
/**
 *
 * @param {seconds} initialTime Optional time in seconds to set the initial timer to
 * @returns time, setTime, timerRunning, setTimerRunning
 */
function useCountdownTime(initialTime: number = 60) {
  const [time, setTime] = React.useState(initialTime);
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

export default useCountdownTime;
