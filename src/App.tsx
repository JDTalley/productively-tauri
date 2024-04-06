import "./App.css";
import styles from "./app.module.css";
import SiteNav from "./components/ui/SiteNav";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import { useInvoke } from "./hooks/useInvoke";
import { Config as PomodoroConfig } from "./components/Pomodoro/types";
import React from "react";

function App() {
  const {
    data: pomodoroConfig,
    isLoading: pomodoroIsLoading,
    error: pomodoroError,
    update: pomodoroConfigUpdate,
  } = useInvoke("get_pomodoro_config", "set_pomodoro_config");
  const [configActive, setConfigActive] = React.useState(false);

  if (pomodoroIsLoading) {
    return <div>Loading...</div>;
  }

  if (pomodoroError) {
    return <div>Error</div>;
  }

  const config = {
    pomodoro: {
      config: pomodoroConfig as PomodoroConfig,
      update: pomodoroConfigUpdate,
    },
  };

  return (
    <div className={styles.wrapper}>
      <SiteNav setConfigActive={setConfigActive}></SiteNav>
      <div className={styles.container}>
        {!configActive ? (
          <Pomodoro config={pomodoroConfig as PomodoroConfig}></Pomodoro>
        ) : (
          <Settings config={config}></Settings>
        )}
      </div>
      <footer>2024</footer>
    </div>
  );
}

export default App;
