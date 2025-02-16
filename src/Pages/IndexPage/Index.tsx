import { useState, useEffect } from "react";

import styles from "./index.module.css";
import Card from "../../Components/Card/Card";
const URL = "https://api.github.com/users";

interface Product {
  id: number;
  avatar_url: string;
  login: string;
}

interface ProductOptional {
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  user_view_type: string;
  name:string
}

type ProductList= Product & Partial<ProductOptional>

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

  console.log(isLoading,isError);
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
