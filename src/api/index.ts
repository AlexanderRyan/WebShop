import { API_BASE_URL, REQUEST_HEADER } from "src/constants";
import { CartBody, CartResponse, ProductResponse } from "types/types";

// Generic function for fetch requests where the returned promise type can be defined.
const baseFetch = <T>(
  endPoint: RequestInfo | URL,
  init?: RequestInit
): Promise<T> =>
  fetch(`${API_BASE_URL}/${endPoint}`, init).then((res) => res.json());

// An object to create customizable functions for specific endpoints.
const api = {
  get: <T>(endPoint: string) => baseFetch<T>(endPoint),
  post: <T>(endPoint: string, body: CartBody) =>
    baseFetch<T>(endPoint, {
      method: "PUT",
      headers: REQUEST_HEADER,
      body: JSON.stringify(body),
    }),
};

// Functions that fetch from specific endpoints with the type of the returned promised defined.
export const getProducts = (limit: number = 0, skip: number = 0) =>
  api.get<ProductResponse>(`products/?limit=${limit}&skip=${skip}`);

export const getSearchProducts = (searchQuery: string) =>
  api.get<ProductResponse>(`products/search?q=${searchQuery}&limit=0&skip=0`);

export const addCart = (body: CartBody) =>
  api.post<CartResponse>("carts/1", body);
