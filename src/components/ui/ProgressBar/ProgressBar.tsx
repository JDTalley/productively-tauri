'use client';
import styles from './progressBar.module.css';

/**
 * ProgressBar
 * @prop percentComplete
 */
function ProgressBar ({progress, children}) {
  const progressStyle = {
    background: `linear-gradient(
      to right,
      hsl(205, 62%, 49%) ${progress}%,
      hsl(205, 0%, 55%) 0
    )`
  }

  return (
    <div style={progressStyle} className={styles.container}>
      {children}
    </div>
  )
}

export default ProgressBar;
