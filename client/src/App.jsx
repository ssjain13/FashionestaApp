import { Alert, AlertIcon, Box, Progress } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { fetchCategories, fetchProducts } from "./api";

import { Pageheader } from "./components/Pageheader";
import { AdminPage } from "./pages/AdminPage";
import { Login } from "./pages/Login";
import { SuccessPage } from "./pages/SuccessPage";
import { Inventory } from "./pages/Inventory";
import { ProductForm } from "./components/admin/ProductForm";
import { CategoryForm } from "./components/admin/CategoryForm";
import { Dashboard } from "./components/admin/Dashboard";
import { CategoryDashboard } from "./components/admin/CategoryDashboard";
import { Register } from "./components/admin/Register";

function App() {
  const selectorData = useSelector((state) => state.categories);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { loading, error, filteredData } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <Pageheader />
      <Routes>
        <Route path="/" element={<AdminPage />}></Route>

        <Route
          path="/viewProducts"
          element={<Dashboard categories={selectorData.categories} />}
        />

        <Route
          path="/viewCategories"
          element={<CategoryDashboard categories={selectorData.categories} />}
        />

        <Route path="/create" element={<Inventory />} />
        <Route path="/createCategory" element={<CategoryForm />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/edit" element={<ProductForm />} />
        <Route path="/category/edit" element={<CategoryForm />} />

        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
