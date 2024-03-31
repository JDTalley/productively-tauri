import "./App.css";
import styles from "./app.module.css";
import Pomodoro from "./components/Pomodoro";

function App() {
  return (
    <div className={styles.container}>
      <Pomodoro />
    </div>
  );
}

export default App;
