import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader/Loader";
const DefaultLayout = lazy(() => import("./Layouts/DefaultLayout"));
const IndexPage = lazy(() => import("./Pages/IndexPage/Index"));
const SearchUser = lazy(() => import("./Pages/SearchUser/SearchUser"));
const UserCard = lazy(() => import("./Pages/UserCard/UserCard"));
const NotFoundView = lazy(() => import("./Error/NotFound"));
const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<IndexPage />} />
          {/* Query parameters should not be included in the route path ( ? )  */}
          <Route path="/users" element={<SearchUser />} />
          <Route path="users/:name" element={<UserCard />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
