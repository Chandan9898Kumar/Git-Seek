import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { ProductList } from "../../Interface/Interface";
import styles from "./search.module.css";
import NoResults from "../../Components/ResultNotFound/NoResult";
import Loader from "../../Components/Loader/Loader";
const SearchUser = () => {
  const { name } = useParams();
  const [totalCountUsers, setTotalCountUsers] = useState<number | null>(null);
  const [userList, setUserList] = useState<ProductList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const FetchUserDetails = async (): Promise<void> => {
      setIsError(null);
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${name}`
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setUserList(result.items);
        setTotalCountUsers(result.total_count);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setIsError(message);
      } finally {
        setIsLoading(false);
      }
    };

    FetchUserDetails();
  }, [name]);

  if (isLoading) {
    return <Loader />;
  }

  if (!totalCountUsers || isError) {
    return (
      <NoResults
        message={
          isError
            ? isError
            : `${totalCountUsers} users found / ${userList.length} users displayed`
        }
      />
    );
  }

  return (
    <section  className={styles.home} role="section">
      <div className={styles.usersCount} aria-live="polite">
        <p>
          <span aria-label="Total users found">{totalCountUsers}</span> users
          found /{" "}
          <span aria-label="Users currently displayed">{userList.length}</span>{" "}
          users displayed
        </p>
      </div>
      <div
        className={styles.usersResult}
        role="region"
        aria-label="Search Results"
      >
        {userList?.map((user) => {
          return (
            <Card
              key={user.id}
              avatarUrl={user.avatar_url}
              username={user.login}
              user={name}
              aria-label={`User profile for ${user.login}`}
            />
          );
        })}
      </div>
    </section >
  );
};

export default SearchUser;
