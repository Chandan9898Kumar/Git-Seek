import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import IndexPage from "./Pages/IndexPage/Index";
import SearchUser from "./Pages/SearchUser/SearchUser";
import UserCard from "./Pages/UserCard/UserCard";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<IndexPage />} />
        {/* Query parameters should not be included in the route path ( ? )  */}
        <Route path="/users" element={<SearchUser />} />
        <Route path="users/:name" element={<UserCard />} />
      </Route>
    </Routes>
  );
};

export default Router;
