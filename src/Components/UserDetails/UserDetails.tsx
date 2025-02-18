import { Browser, Buildings, MapPin, TwitterLogo } from "phosphor-react";
import { FC, useMemo } from "react";
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

  return (
    <div
      className={styles.userDetails}
      role="article"
      aria-label="GitHub User Profile"
    >
      <header>
        <div className={styles.headerImg}>
          <img
            src={props.userInformation?.avatar_url}
            alt={`Profile picture of ${
              props.userInformation?.name ||
              props.userInformation?.login ||
              "User"
            }`}
            loading="lazy"
          />
        </div>
        <div className={styles.headerName}>
          <div className={styles.userName}>
            <h1 tabIndex={0}>
              {props.userInformation?.name || props.userInformation?.login}
            </h1>
            <a
              href={`https://github.com/${props.userInformation?.login}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${props.userInformation?.login}'s GitHub profile`}
            >
              @{props.userInformation?.login}
            </a>
          </div>
          <p tabIndex={0} aria-label={`Joined GitHub on ${joinDate}`}>
            Joined {joinDate}
          </p>
        </div>
      </header>
      <main>
        <div
          className={styles.userBio}
          tabIndex={0}
          role="region"
          aria-label="User biography"
        >
          {props.userInformation?.bio || "This profile has no bio."}
        </div>
        <div
          className={styles.userInfo}
          role="list"
          aria-label="User statistics"
        >
          <div className={styles.userInfoItem} role="listitem">
            <p id="repos-label">Repos</p>
            <strong aria-labelledby="repos-label" tabIndex={0}>
              {props.userInformation?.public_repos}
            </strong>
          </div>
          <div className={styles.userInfoItem} role="listitem">
            <p id="followers-label">Followers</p>
            <strong aria-labelledby="followers-label" tabIndex={0}>
              {props.userInformation?.followers}
            </strong>
          </div>
          <div className={styles.userInfoItem} role="listitem">
            <p id="following-label">Following</p>
            <strong aria-labelledby="following-label" tabIndex={0}>
              {props.userInformation?.following}
            </strong>
          </div>
        </div>
      </main>
      <footer>
        <section
          className={styles.otherInfo}
          role="contentinfo"
          aria-label="Additional user information"
        >
          <div
            className={
              !props.userInformation?.location
                ? styles.infoNotAvailable
                : styles.otherInfoItem
            }
            role="complementary"
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
          </div>
          <div
            className={
              !props.userInformation?.blog
                ? styles.infoNotAvailable
                : styles.otherInfoItem
            }
            role="complementary"
          >
            <Browser size={24} aria-hidden="true" />
            {!props.userInformation?.blog ? (
              <p tabIndex={0} aria-label="Website: Not Available">
                Not Available
              </p>
            ) : (
              <a
                href={props.userInformation.blog}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit user's website: ${props.userInformation.blog}`}
              >
                {props.userInformation.blog}
              </a>
            )}
          </div>
          <div
            className={
              !props.userInformation?.twitter_username
                ? styles.infoNotAvailable
                : styles.otherInfoItem
            }
            role="complementary"
          >
            <TwitterLogo size={24} aria-hidden="true" />
            {!props.userInformation?.twitter_username ? (
              <p tabIndex={0} aria-label="Twitter: Not Available">
                Not Available
              </p>
            ) : (
              <a
                href={`https://twitter.com/${props.userInformation.twitter_username}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${props.userInformation.twitter_username}'s Twitter profile`}
              >
                {props.userInformation.twitter_username}
              </a>
            )}
          </div>
          <div className={styles.otherInfoItem} role="complementary">
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
          </div>
        </section>
      </footer>
    </div>
  );
};

export default UserDetails;
