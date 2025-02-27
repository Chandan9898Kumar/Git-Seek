import { useNavigate } from "react-router-dom";
import { memo, FC, MouseEvent } from "react";
import { motion } from "framer-motion";
import styles from "./card.module.css";

interface CardProps {
  key?: number;
  avatarUrl: string;
  username: string;
  user: string | undefined | null;
}

// Card animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5,
    },
  },
};

// Button animation variants
const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const Card: FC<CardProps> = ({ avatarUrl, username }) => {
  const navigate = useNavigate();

  const handleInfo = (event: MouseEvent<HTMLButtonElement>): void => {
    //  above i have used event but did not use it anywhere, so it throwing error : 'event' is defined but never used.
    //  to hide it i used : > 1. _event >  Using underscore prefix  OR  Below .
    void event; // This explicitly acknowledges the unused parameter.

    navigate(`/users/${username}`);
  };

  return (
    <motion.div
      className={styles.card}
      role="article"
      aria-label={`GitHub user card for ${username}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <div className={styles.info} role="contentinfo">
        <motion.div
          className={styles.userAndImg}
          aria-label="User information"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img
            src={avatarUrl}
            alt={`Profile picture of ${username}`}
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <p id={`username-${username}`}>{`@${username}`}</p>
        </motion.div>
      </div>
      <div className={styles.features} role="group" aria-label="User actions">
        <motion.a
          className={styles.profileBtn}
          target="_blank"
          href={`https://github.com/${username}`}
          rel="noreferrer"
          aria-label={`Visit ${username}'s GitHub profile`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span>Profile</span>
        </motion.a>

        <motion.button
          className={styles.infoBtn}
          type="button"
          aria-label={`View more information about ${username}`}
          onClick={handleInfo}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          More Info
        </motion.button>
      </div>
    </motion.div>
  );
};

export default memo(Card);
