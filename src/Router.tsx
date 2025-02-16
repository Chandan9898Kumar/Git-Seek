import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import IndexPage from './Pages/IndexPage/Index'
import SearchUser from './Pages/SearchUser/SearchUser'
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
      <Route index element={<IndexPage />} />
      <Route path="/users/:name"  element={<SearchUser />}/>
      </Route>
    </Routes>
  );
};

export default Router;
