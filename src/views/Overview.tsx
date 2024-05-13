import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import SortMenu from "components/SortMenu/SortMenu";
import { getProducts, getSearchProducts } from "api/index";
import SearchBar from "components/SearchBar/SearchBar";
import ProductCard from "components/ProductCard/ProductCard";
import { OnChangeType, Product, SortOrder, SortType } from "types/types";
import SearchResultList from "components/SearchResultList/SearchResultList";
import ConditionalRender from "components/ConditionalRender/ConditionalRender";
import ProductAmountIndicator from "components/ProductNumberIndicator/ProductAmountIndicator";
import {
  useProductDispatch,
  useProducts,
} from "context/reducers/productReducer";

import "./OverviewStyles.css";

const Overview = () => {
  const { products, isFetching, shouldFetch } = useProducts();
  const dispatch = useProductDispatch();

  const [listedProducts, setListedProducts] = useState<Product[]>(products);
  const [hasFetchedAll, setHasFetchedAll] = useState(products.length === 100);
  const [sortType, setSortType] = useState<SortType>("rating");
  const [sortOrder, setSortOrder] = useState<SortOrder>("DESC");
  const [searchQuery, setSearchQuery] = useState("");

  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);

  // Observer to determine whether we've reached the bottom of the page.
  const observerRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && !displaySearchResult)
            dispatch({ type: "UPDATE_PRODUCTS" });
        });
      });

      observer.observe(node);
    }
  }, []);

  // Fetches the 10 next products once we've reached the bottom of the page, and adds them to the state.
  // If a product was previously added through the search function and is present in the state, it gets filtered out from the result.
  // Only calls the API if the total number of products is not yet fetched.
  useEffect(() => {
    if (shouldFetch && !hasFetchedAll) {
      dispatch({ type: "FETCHING_PRODUCTS" });

      getProducts(10, products.length).then((res) => {
        const newProducts = res.products.filter(
          filterOutExistingProducts(listedProducts)
        );

        const updatedState = [...listedProducts, ...newProducts];

        // This is a bit of an ugly way around having the products not shuffle
        // around their order in the list when new products are fetched.
        // ...pagination was probably a more pleasant alternative
        dispatch({ type: "ADD", payload: updatedState });
        setListedProducts(updatedState);

        if (products.length >= res.total) setHasFetchedAll(true);
      });
    }
  }, [shouldFetch, hasFetchedAll]);

  // Sort the visible list of products based on user selection.
  useEffect(() => {
    const sortedListedProducts = sortListOfProducts(listedProducts);
    const sortedResultProducts = sortListOfProducts(searchedProducts);

    setListedProducts(sortedListedProducts);
    setSearchedProducts(sortedResultProducts);
  }, [sortType, sortOrder]);

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setDisplaySearchResult(false);

    setSearchQuery(e.target.value);
  };

  // Updates the selected sorting.
  const handleChangeSort =
    (type: OnChangeType) => (e: ChangeEvent<HTMLInputElement>) => {
      switch (type) {
        case "change_order":
          if (!e.target.value) setSortOrder("DESC");
          setSortOrder(e.target.value as SortOrder);
          break;
        case "change_type":
          if (!e.target.value) setSortType("rating");
          setSortType(e.target.value as SortType);
          break;
      }
    };

  // On search submit, makes an API call for the searched query
  // and filters out the results that are already in the state.
  // New products are added to the state, as well as to the bottom of the product list.
  // Renders the search page as well.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getSearchProducts(searchQuery).then((res) => {
      const newProducts = res.products.filter(
        filterOutExistingProducts(products)
      );

      const updatedState = [...products, ...newProducts];

      dispatch({ type: "ADD", payload: updatedState });

      setDisplaySearchResult(true);
      setSearchedProducts(sortListOfProducts(res.products));
      setListedProducts([...listedProducts, ...newProducts]);
    });
  };

  // Function that sorts products based on selected properties.
  const sortListOfProducts = useCallback(
    (list: Product[]) => {
      switch (sortOrder) {
        case "ASC":
          return [...list].sort(sortOnProperty(sortType));
        case "DESC":
          return [...list].sort(sortOnProperty(sortType)).reverse();
      }
    },
    [sortOrder, sortType]
  );

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearch={handleOnSearch}
        onSubmit={handleSubmit}
      />
      <SortMenu
        sortOptions={["price", "rating", "discountPercentage", "stock"]}
        selectedOption={sortType}
        selectedOrder={sortOrder}
        onChange={handleChangeSort}
      />
      <ConditionalRender
        predicate={!displaySearchResult}
        fallback={<SearchResultList result={searchedProducts} />}
      >
        <div className="overview-list-container">
          {listedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <ProductAmountIndicator amount={listedProducts.length} />
        <div className="bottom-boundry" ref={observerRef} />
      </ConditionalRender>

      <ConditionalRender predicate={isFetching}>
        <div>Loading products...</div>
      </ConditionalRender>
    </div>
  );
};

const sortOnProperty = (key: SortType) => (a: Product, b: Product) =>
  a[key] - b[key];

const filterOutExistingProducts =
  (existingProducts: Product[]) => (fetchedProduct: Product) =>
    !existingProducts.some(
      (existingProduct) => existingProduct.id === fetchedProduct.id
    );

export default Overview;
