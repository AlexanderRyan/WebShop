import { useEffect } from "react";

import { getProducts } from "./api";
import AppRouter from "./router";

import "./App.css";
import {
  useProductDispatch,
  useProducts,
} from "context/reducers/productReducer";
import ConditionalRender from "./components/ConditionalRender/ConditionalRender";

function App() {
  const dispatch = useProductDispatch();
  const { products } = useProducts();

  // Fetches initial products & adds them to the state.
  useEffect(() => {
    // This would ideally be done with a useMobile hook or something, but to keep it short
    // I've gone with this quick and dirty approach instead.
    // For smaller devices, we fetch 10 initial products and for large, 20.
    const initialProductAmount = window.innerWidth > 600 ? 20 : 10;

    dispatch({ type: "FETCHING_PRODUCTS" });
    getProducts(initialProductAmount, 0).then((res) => {
      dispatch({ type: "ADD", payload: res.products });
    });
  }, []);

  return (
    <ConditionalRender predicate={products.length > 0}>
      <AppRouter />
    </ConditionalRender>
  );
}

export default App;
