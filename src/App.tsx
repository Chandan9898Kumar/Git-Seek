import { useState } from "react";

import styles from "./App.module.css";

function App() {
  const [isDark, setIsDark] = useState<boolean>(true);

  function setDarkMode(darkMode: boolean): void {
    setIsDark(darkMode);
  }

  return (
    <div
      className={`${styles.app} ${isDark ? styles.darkTheme : styles.lightTheme}`}
    ></div>
  );
}

export default App;
