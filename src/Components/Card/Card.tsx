import {  useNavigate } from "react-router-dom";
import { memo, FC } from "react";

import styles from "./card.module.css";

interface CardProps {
  key: number;
  src: string;
  username: string;
  user: string | undefined;
}

const Card: FC<CardProps> = ({ src, username, user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.userAndImg}>
          <img src={src} alt={username} loading="lazy" />
          <p>{`@${username}`}</p>
        </div>
      </div>
      <form className={styles.features}>
        <a
          className={styles.profileBtn}
          target="_blank"
          href={`https://github.com/${username}`}
          rel="noreferrer"
        >
        Profile
        </a>

        <button className={styles.infoBtn}>More Info</button>
      </form>
    </div>
  );
};

export default memo(Card);
