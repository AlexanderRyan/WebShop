import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Product, ProductState } from "types/types";

// See cartReducer.tsx,
// This is the same but for the productState.

type AddAction = { type: "ADD"; payload: Product[] };
type SetAction = { type: "SET_SELECTED"; payload: number };
type FetchAction = { type: "FETCHING_PRODUCTS" };
type LoadingAction = { type: "UPDATE_PRODUCTS" };
type Action = AddAction | SetAction | FetchAction | LoadingAction;

export const ProductContext = createContext<ProductState | undefined>(
  undefined
);
export const ProductDispatchContext = createContext<
  Dispatch<Action> | undefined
>(undefined);

const createInitialState = (): ProductState => ({
  products: [],
  selectedProductId: null,
  isFetching: false,
  shouldFetch: false,
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [productState, dispatch] = useReducer(
    productReducer,
    null,
    createInitialState
  );

  return (
    <ProductContext.Provider value={productState}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("Product context must be used inside provider");

  return context;
};
export const useProductDispatch = () => {
  const context = useContext(ProductDispatchContext);

  if (!context)
    throw new Error("Dispatch context must be used inside provider");

  return context;
};

const productReducer = (state: ProductState, action: Action): ProductState => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        products: action.payload,
        isFetching: false,
        shouldFetch: false,
      };
    case "SET_SELECTED":
      return { ...state, selectedProductId: action.payload };
    case "FETCHING_PRODUCTS":
      return { ...state, isFetching: true };
    case "UPDATE_PRODUCTS":
      return { ...state, shouldFetch: true };
  }
};
