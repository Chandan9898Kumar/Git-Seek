import { useState, useEffect } from "react";
import { ProductList } from "../../Interface/Interface";
import styles from "./index.module.css";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";
const URL = "https://api.github.com/users";

const IndexPage = () => {
  const [userList, setUserList] = useState<ProductList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  //   NOTE : Here we have used Promise<void> instead of void, because :
  // 1. All async functions return Promises by default.
  // 2. TypeScript needs to know the type of value that the Promise will resolve to
  // 3. In this case, since we're not returning anything (just setting state), we use Promise<void>
  const FetchUserDetails = async (): Promise<void> => {
    setIsError(null);
    try {
      const response = await fetch(URL);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setUserList(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setIsError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDetails();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Something Went Wrong ...</p>;
  }

  return (
    <div className={styles.home}>
      {userList?.map((users) => {
        return (
          <Card
            key={users.id}
            avatarUrl={users.avatar_url}
            username={users.login}
            user={users.name}
          />
        );
      })}
    </div>
  );
};

export default IndexPage;
