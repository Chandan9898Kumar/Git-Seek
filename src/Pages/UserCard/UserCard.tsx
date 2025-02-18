import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import UserDetails from "../../Components/UserDetails/UserDetails";
import { UserDetailedInfo } from "../../Interface/UserCardInterface";
import styles from "./usercard.module.css";
import NotFoundView from '../../Error/NotFound'
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
    return <NotFoundView isError={isError}/>;
  }
console.log(isError,'isError')
  return (
    <div className={styles.user}>
      <div className={styles.userResults}>
        <UserDetails userInformation={useData} />
      </div>
      <button type="button" aria-label="Go Back" onClick={handleNavigateBack}>
        Back To Results
      </button>
    </div>
  );
};

export default UserCard;
