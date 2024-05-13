import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { CartProduct, CartResponse, CartState } from "types/types";

// Reducer action types
type AddAction = { type: "ADD_TO_CART"; payload: CartProduct };
type RemovevAction = { type: "REMOVE_FROM_CART"; payload: CartProduct };
type SetAction = { type: "SET_CART"; payload: CartResponse };
type DeleteAction = { type: "DELETE_PRODUCT"; payload: number };
type Action = AddAction | SetAction | RemovevAction | DeleteAction;

// Context for the cart state, so it's accessible throughout the application.
const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

// Sets up the initial cart state
const createInitialState = (): CartState => ({
  cart: {
    id: 0,
    userId: 1,
    products: [],
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
    discountedTotal: 0,
    quantity: 0,
  },
  cartProducts: [],
});

// The actual provider component that enables children to access the state.
// As long as the useCart hook is used inside of it.
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    null,
    createInitialState
  );

  return (
    <CartContext.Provider value={cartState}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

// Cart & CartDispatch hooks that exposes the the context to children of the provider.
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("Cart context must be used inside provider");

  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);

  if (!context)
    throw new Error("Dispatch context must be used inside provider");

  return context;
};

// Reducers for managing the cart state by adding, removing products and updating the cart after
// successful response from the cart API.
const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const product = state.cartProducts.find(
        (p) => p.id === action.payload.id
      );

      if (!product) {
        const newProducts = [...state.cartProducts];
        newProducts.push(action.payload);

        return {
          ...state,
          cartProducts: newProducts,
        };
      } else {
        const updateProducts = state.cartProducts.map((p) =>
          p.id === action.payload.id
            ? { ...p, quantity: p.quantity + action.payload.quantity }
            : p
        );
        return {
          ...state,
          cartProducts: updateProducts,
        };
      }
    case "REMOVE_FROM_CART":
      const updateProducts = state.cartProducts.map((p) =>
        p.id === action.payload.id
          ? { ...p, quantity: p.quantity - action.payload.quantity }
          : p
      );

      return {
        ...state,
        cartProducts: updateProducts,
      };

    case "SET_CART":
      return { cart: action.payload, cartProducts: state.cartProducts };

    case "DELETE_PRODUCT":
      const updatedProducts = state.cartProducts.filter(
        (p) => p.id !== action.payload
      );
      return {
        ...state,
        cartProducts: updatedProducts,
      };
  }
};
