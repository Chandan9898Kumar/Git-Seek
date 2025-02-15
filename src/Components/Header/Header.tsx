import { FC,memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import { Moon, Sun } from "phosphor-react";

interface HeaderProps {
  onClick: () => void;
  darkMode: boolean;
}

const Header: FC<HeaderProps> = ({ onClick, darkMode }) => {
  return (
    <header role="banner">
      <div className={styles.header}>
        <NavLink to="/" aria-label="Git Seek Home">
          <strong>Git Seek</strong>
        </NavLink>
        <button
          className={styles.theme}
          onClick={onClick}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          type="button"
        >
          <p id="theme-text">{darkMode ? "light" : "dark"}</p>
          <span className={styles.light} hidden={!darkMode} aria-hidden="true">
            <Sun size={20} />
          </span>
          <span className={styles.dark} hidden={!!darkMode} aria-hidden="true">
            <Moon size={20} />
          </span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
