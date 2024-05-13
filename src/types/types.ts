import { SORT_ORDERS } from "constants/index";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductState = {
  products: Product[];
  selectedProductId: number | null;
  isFetching: boolean;
  shouldFetch: boolean;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CartState = {
  cart: CartResponse;
  cartProducts: CartProduct[];
};

export type CartResponseProduct = Product & { quantity: number };

export type CartResponse = {
  id: number;
  products: CartResponseProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  quantity: number;
};

export type CartProduct = Pick<CartResponse, "id" | "quantity">;

export type CartBody = {
  merge: boolean;
  products: CartProduct[];
};

export type SortType = keyof Pick<
  Product,
  "discountPercentage" | "price" | "rating" | "stock"
>;
export type SortOrder = (typeof SORT_ORDERS)[number];
export type OnChangeType = "change_order" | "change_type";
