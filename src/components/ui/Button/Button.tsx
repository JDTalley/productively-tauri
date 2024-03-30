'use client';
import React from 'react';
import styles from './button.module.css';

function Button({ name, children, onClick, style }) {
  switch (style) {
    case 'primary':
      return (
        <button className={styles.primaryBtn} name={name} onClick={onClick}>
          {children}
        </button>
      );
    case 'danger':
      return (
        <button className={styles.dangerBtn}  name={name} onClick={onClick}>
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
