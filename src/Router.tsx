import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import IndexPage from './Pages/IndexPage/Index'
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
      <Route index element={<IndexPage />} />
      
      </Route>
    </Routes>
  );
};

export default Router;
