import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { ProductList } from "../../Interface/Interface";
import styles from "./search.module.css";

const SearchUser = () => {
  const { name } = useParams();
  const [totalCountUsers, setTotalCountUsers] = useState<number>();
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

  return (
    <main className={styles.home} role="main">
      <div className={styles.usersCount} aria-live="polite">
        <p>
          <span aria-label="Total users found">{totalCountUsers || 0}</span>{" "}
          users found /{" "}
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
    </main>
  );
};

export default SearchUser;
