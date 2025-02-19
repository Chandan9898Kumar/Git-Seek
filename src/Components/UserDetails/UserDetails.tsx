import {
  Browser,
  Buildings,
  MapPin,
  TwitterLogo,
  Books,
  Users,
  UserPlus,
} from "phosphor-react";
import { FC, useMemo } from "react";
import { motion } from "framer-motion";
import { UserDetailedInfo } from "../../Interface/UserCardInterface";
import styles from "./details.module.css";

interface DetailsProps {
  userInformation: UserDetailedInfo;
}

const UserDetails: FC<DetailsProps> = (props) => {
  function convertDate(datetime: Date) {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.toLocaleString("default", {
      month: "short",
    });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  function displayCompany(company: string) {
    if (!company) {
      return <p>Not Available</p>;
    } else if (company.includes("@")) {
      return (
        <a
          href={`https://github.com/${company.slice(1)}`}
          target="_blank"
          rel="noreferrer"
        >
          {company}
        </a>
      );
    } else {
      return <p>{company}</p>;
    }
  }

  const joinDate = useMemo(() => {
    return convertDate(props.userInformation?.created_at);
  }, [props.userInformation?.created_at]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const scaleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={styles.userDetails}
      role="article"
      aria-label="GitHub User Profile"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={itemVariants}>
        <motion.div
          className={styles.headerImg}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={props.userInformation?.avatar_url}
            alt={`Profile picture of ${
              props.userInformation?.name ||
              props.userInformation?.login ||
              "User"
            }`}
            loading="lazy"
          />
        </motion.div>
        <motion.div className={styles.headerName} variants={itemVariants}>
          <motion.div className={styles.userName} variants={itemVariants}>
            <motion.h1 tabIndex={0}>
              {props.userInformation?.name || props.userInformation?.login}
            </motion.h1>
            <motion.a
              href={`https://github.com/${props.userInformation?.login}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${props.userInformation?.login}'s GitHub profile`}
              whileHover={{ scale: 1.05 }}
            >
              @{props.userInformation?.login}
            </motion.a>
          </motion.div>
          <motion.p
            tabIndex={0}
            aria-label={`Joined GitHub on ${joinDate}`}
            variants={itemVariants}
          >
            Joined {joinDate}
          </motion.p>
        </motion.div>
      </motion.header>

      <motion.main variants={itemVariants}>
        <motion.div
          className={styles.userBio}
          tabIndex={0}
          role="region"
          aria-label="User biography"
          variants={itemVariants}
        >
          {props.userInformation?.bio || "This profile has no bio."}
        </motion.div>

        <motion.div
          className={styles.userInfo}
          role="list"
          aria-label="User statistics"
          variants={scaleVariants}
        >
          <motion.div
            className={styles.userInfoItem}
            role="listitem"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Books size={24} weight="bold" aria-hidden="true" />
            </motion.div>
            <p id="repos-label">Repos</p>
            <strong aria-labelledby="repos-label" tabIndex={0}>
              {props.userInformation?.public_repos}
            </strong>
          </motion.div>

          <motion.div
            className={styles.userInfoItem}
            role="listitem"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users size={24} weight="bold" aria-hidden="true" />
            </motion.div>
            <p id="followers-label">Followers</p>
            <strong aria-labelledby="followers-label" tabIndex={0}>
              {props.userInformation?.followers}
            </strong>
          </motion.div>

          <motion.div
            className={styles.userInfoItem}
            role="listitem"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <UserPlus size={24} weight="bold" aria-hidden="true" />
            </motion.div>
            <p id="following-label">Following</p>
            <strong aria-labelledby="following-label" tabIndex={0}>
              {props.userInformation?.following}
            </strong>
          </motion.div>
        </motion.div>
      </motion.main>

      <motion.footer variants={itemVariants}>
        <motion.section
          className={styles.otherInfo}
          role="contentinfo"
          aria-label="Additional user information"
          variants={itemVariants}
        >
          <motion.div
            className={
              !props.userInformation?.location
                ? styles.infoNotAvailable
                : styles.otherInfoItem
            }
            role="complementary"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <MapPin size={24} aria-hidden="true" />
            <p
              tabIndex={0}
              aria-label={`Location: ${
                !props.userInformation?.location
                  ? "Not Available"
                  : props.userInformation?.location
              }`}
            >
              {!props.userInformation?.location
                ? "Not Available"
                : props.userInformation?.location}
            </p>
          </motion.div>

          <motion.div
            className={
              !props.userInformation?.blog
                ? styles.infoNotAvailable
                : styles.otherInfoItem
            }
            role="complementary"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <Browser size={24} aria-hidden="true" />
            {!props.userInformation?.blog ? (
              <p tabIndex={0} aria-label="Website: Not Available">
                Not Available
              </p>
            ) : (
              <motion.a
                href={props.userInformation.blog}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit user's website: ${props.userInformation.blog}`}
                whileHover={{ scale: 1.05 }}
              >
                {props.userInformation.blog}
              </motion.a>
            )}
          </motion.div>

          <motion.div
            className={
              !props.userInformation?.twitter_username
                ? styles.infoNotAvailable
                : styles.otherInfoItem
            }
            role="complementary"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <TwitterLogo size={24} aria-hidden="true" />
            {!props.userInformation?.twitter_username ? (
              <p tabIndex={0} aria-label="Twitter: Not Available">
                Not Available
              </p>
            ) : (
              <motion.a
                href={`https://twitter.com/${props.userInformation.twitter_username}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${props.userInformation.twitter_username}'s Twitter profile`}
                whileHover={{ scale: 1.05 }}
              >
                {props.userInformation.twitter_username}
              </motion.a>
            )}
          </motion.div>

          <motion.div
            className={styles.otherInfoItem}
            role="complementary"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <Buildings size={24} aria-hidden="true" />
            <p
              tabIndex={0}
              aria-label={`Company: ${
                props.userInformation?.company
                  ? displayCompany(props.userInformation.company)
                  : "Not Available"
              }`}
            >
              {props.userInformation?.company
                ? displayCompany(props.userInformation.company)
                : "Not Available"}
            </p>
          </motion.div>
        </motion.section>
      </motion.footer>
    </motion.div>
  );
};

export default UserDetails;
