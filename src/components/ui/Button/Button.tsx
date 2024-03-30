"use client";
import React, { ReactNode } from "react";
import styles from "./button.module.css";

interface Props {
  name: string;
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style: string;
}

function Button({ name, children, onClick, style }: Props) {
  switch (style) {
    case "primary":
      return (
        <button className={styles.primaryBtn} name={name} onClick={onClick}>
          {children}
        </button>
      );
    case "danger":
      return (
        <button className={styles.dangerBtn} name={name} onClick={onClick}>
          {children}
        </button>
      );
    default:
      return (
        <button className={styles.primaryBtn} name={name} onClick={onClick}>
          {children}
        </button>
      );
  }
}

export default Button;
