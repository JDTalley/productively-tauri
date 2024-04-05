"use client";
import React from "react";
import { Config } from "./types";
import PomodoroTimer from "./PomodoroTimer";
import PomodoroConfig from "./PomodoroConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import styles from "./pomodoro.module.css";
import { useInvoke } from "../../hooks/useInvoke";

function Pomodoro() {
  const {
    data: config,
    isLoading,
    error,
    update,
  } = useInvoke("get_pomodoro_config", "set_pomodoro_config");
  const [isConfigActive, setIsConfigActive] = React.useState(false);

  function configButtonHandler() {
    setIsConfigActive(!isConfigActive);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pomodoro}>
        {!isConfigActive ? (
          <>
            <PomodoroTimer config={config as Config}></PomodoroTimer>
            <button
              className={styles.buttonConfig}
              name="Configure Pomodoro"
              onClick={configButtonHandler}
            >
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </button>
          </>
        ) : (
          <PomodoroConfig
            config={config as Config}
            update={update}
            setIsConfigActive={setIsConfigActive}
          ></PomodoroConfig>
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
