"use client";
import React from "react";
import { Config } from "./types";
import PomodoroTimer from "./PomodoroTimer";
import Button from "../ui/Button";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import styles from "./pomodoro.module.css";

const defaultConfig: Config = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 10,
  interval: 4,
};

function Pomodoro() {
  const [config, setConfig] = React.useState(defaultConfig);
  const [configForm, setConfigForm] = React.useState(config);
  const [isConfigActive, setIsConfigActive] = React.useState(false);

  return (
    <div className={styles.container}>
      {!isConfigActive ? (
        <div className={styles.pomodoro}>
          <PomodoroTimer config={config}></PomodoroTimer>
          <button
            className={styles.buttonConfig}
            name="Configure Pomodoro"
            onClick={() => setIsConfigActive(true)}
          >
            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
          </button>
        </div>
      ) : (
        <div className={styles.pomodoro}>
          <div className={styles.config}>
            <div className={styles.subheader}>
              <h3>Settings</h3>
            </div>
            <Separator.Root decorative className={styles.bottomBorder} />
            <div className={styles.configGroup}>
              <div className={styles.subheader}>
                <h4>Time (minutes)</h4>
              </div>
              <div className={styles.configGroupInline}>
                <div className={styles.configItemInline}>
                  <Label.Root className={styles.labelInline} htmlFor="pomodoro">
                    Pomdoro
                  </Label.Root>
                  <input
                    className={styles.inputNumber}
                    id="pomodoro"
                    name="Pomodoro"
                    type="number"
                    value={configForm.pomodoro}
                    onChange={(e) => {
                      setConfigForm({
                        ...configForm,
                        pomodoro: e.target.valueAsNumber,
                      });
                    }}
                  ></input>
                </div>
                <div className={styles.configItemInline}>
                  <Label.Root
                    className={styles.labelInline}
                    htmlFor="shortBreak"
                  >
                    Short Break
                  </Label.Root>
                  <input
                    className={styles.inputNumber}
                    id="shortBreak"
                    name="Short Break"
                    type="number"
                    value={configForm.shortBreak}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        shortBreak: e.target.valueAsNumber,
                      })
                    }
                  ></input>
                </div>
                <div className={styles.configItemInline}>
                  <Label.Root
                    className={styles.labelInline}
                    htmlFor="longBreak"
                  >
                    Long Break
                  </Label.Root>
                  <input
                    className={styles.inputNumber}
                    id="longBreak"
                    name="Long Break"
                    type="number"
                    value={configForm.longBreak}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        longBreak: e.target.valueAsNumber,
                      })
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className={styles.configGroup}>
              <div className={styles.configItemInline}>
                <div className={styles.subheader}>
                  <h4>Interval</h4>
                </div>
                <Label.Root htmlFor="interval">Long Break</Label.Root>
                <input
                  className={styles.inputNumber}
                  id="interval"
                  name="Long Break Interval"
                  type="number"
                  value={configForm.interval}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      interval: e.target.valueAsNumber,
                    })
                  }
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonSpacing}>
              <Button
                name="Set pomodoro configuration to default"
                onClick={() => setConfigForm(defaultConfig)}
                style="primary"
              >
                Default
              </Button>
            </div>
            <div className={styles.buttonSpacing}>
              <Button
                name="Save pomodoro configuration changes"
                onClick={() => {
                  setConfig(configForm);
                  setIsConfigActive(false);
                }}
                style="primary"
              >
                Save
              </Button>
              <Button
                name="Cancel pomodoro configuration changes"
                onClick={() => {
                  setConfigForm(config);
                  setIsConfigActive(false);
                }}
                style="danger"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
