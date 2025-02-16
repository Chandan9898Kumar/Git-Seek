import { useNavigate } from "react-router-dom";
import { memo, FC, MouseEvent } from "react";

import styles from "./card.module.css";

interface CardProps {
  key: number;
  avatarUrl: string;
  username: string;
  user: string | undefined;
}

const Card: FC<CardProps> = ({ avatarUrl, username, user }) => {
  const navigate = useNavigate();

  const handleInfo = (event: MouseEvent<HTMLButtonElement>): void => {};
  return (
    <div
      className={styles.card}
      role="article"
      aria-label={`GitHub user card for ${username}`}
    >
      <div className={styles.info} role="contentinfo">
        <div className={styles.userAndImg} aria-label="User information">
          <img
            src={avatarUrl}
            alt={`Profile picture of ${username}`}
            loading="lazy"
          />
          <p id={`username-${username}`}>{`@${username}`}</p>
        </div>
      </div>
      <div className={styles.features} role="group" aria-label="User actions">
        <a
          className={styles.profileBtn}
          target="_blank"
          href={`https://github.com/${username}`}
          rel="noreferrer"
          aria-label={`Visit ${username}'s GitHub profile`}
        >
          <span>Profile</span>
        </a>

        <button
          className={styles.infoBtn}
          type="button"
          aria-label={`View more information about ${username}`}
          onClick={handleInfo}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default memo(Card);
