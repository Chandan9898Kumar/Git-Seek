import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import UserDetails from "../../Components/UserDetails/UserDetails";
import NotFoundView from "../../Error/NotFound";
import { UserDetailedInfo } from "../../Interface/UserCardInterface";
import styles from "./usercard.module.css";

const DefaultValue = {
  created_at: new Date(),
  avatar_url: "",
  company: "",
  name: "",
  login: "",
  bio: "",
  public_repos: 0,
  following: 0,
  followers: 0,
  twitter_username: "",
  location: "",
  blog: "",
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
} as const;

const buttonVariants = {
  initial: {
    scale: 1,
    backgroundColor: "#0366d6",
  },
  hover: {
    scale: 1.05,
    backgroundColor: "#0255b3",
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400,
    },
  },
  tap: {
    scale: 0.95,
    backgroundColor: "#024a99",
  },
} as const;

const iconVariants = {
  initial: { x: 0 },
  hover: {
    x: -4,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.6,
    },
  },
} as const;

const UserCard = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [useData, setUserData] = useState<UserDetailedInfo>(DefaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      setIsError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${name}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setUserData(result);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setIsError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [name]);

  const handleNavigateBack = (): void => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFoundView isError={isError} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.user}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className={styles.userResults}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.2,
              duration: 0.4,
            },
          }}
        >
          <UserDetails userInformation={useData} />
        </motion.div>
        <motion.button
          type="button"
          aria-label="Go Back"
          onClick={handleNavigateBack}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className={styles.backButton}
        >
          <motion.span className={styles.buttonContent} variants={iconVariants}>
            <ArrowLeft size={20} weight="bold" />
            Back To Results
          </motion.span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserCard;
