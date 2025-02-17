import { useState, useEffect } from "react";

import styles from "./usercard.module.css";

import { useParams, NavLink } from "react-router-dom";

const UserCard = () => {
  const name = useParams();
  const [useData, setUserData] = useState([]);
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

  console.log(useData,'useData',name)

  return (
    <div className={styles.user}>
      <div className={styles.userResults}>
        {/* <UserDetails user={userData} /> */}
      </div>
      {/* <NavLink
        to={name !== "undefined" ? `/users/${name}` : `/`}
        title="Index"
      >
        <button>Back To Results</button>
      </NavLink> */}
    </div>
  );
};

export default UserCard;
