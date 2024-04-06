"use client";
import React from "react";
import { Config } from "../Pomodoro/types";
import PomodoroConfig from "./PomodoroConfig";

interface Props {
  config: {
    pomodoro: {
      config: Config;
      update: any;
    };
  };
}

function Settings({ config }: Props) {
  return (
    <div>
      <h1>Settings</h1>
      <PomodoroConfig
        config={config.pomodoro.config}
        update={config.pomodoro.update}
      ></PomodoroConfig>
    </div>
  );
}

export default Settings;
