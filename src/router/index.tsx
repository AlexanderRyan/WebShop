import { BrowserRouter, Route, Routes } from "react-router-dom";

import Overview from "views/Overview";
import SummaryPage from "views/SummaryPage";
import AppLayout from "components/AppLayout/AppLayout";
import ProductDetailsPage from "views/ProductDetailsPage";

const AppRouter = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
