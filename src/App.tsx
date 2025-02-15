import { useCallback, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./Components/Header/Header";
function App() {
  const [isDark, setIsDark] = useState<boolean>(true);

  const setDarkMode = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark]);

  return (
    <div
      className={`${styles.app} ${
        isDark ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <BrowserRouter>
        <Header onClick={setDarkMode} darkMode={isDark} />
      </BrowserRouter>
    </div>
  );
}

export default App;
