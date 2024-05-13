import { Product } from "types/types";
import ProductCard from "components/ProductCard/ProductCard";
import ConditionalRender from "components/ConditionalRender/ConditionalRender";
import ProductAmountIndicator from "components/ProductNumberIndicator/ProductAmountIndicator";

import "./SearchResultListStyles.css";

type SearchResultListProps = {
  result: Product[];
};

const SearchResultList = ({ result }: SearchResultListProps) => {
  return (
    <ConditionalRender
      predicate={result.length > 0}
      fallback={<NoSearchResults />}
    >
      <div className="overview-list-container">
        {result.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ProductAmountIndicator amount={result.length} />
    </ConditionalRender>
  );
};

const NoSearchResults = () => {
  return (
    <div className="no-search-result-container">
      <h2 className="text-center">No products matched your search result!</h2>
    </div>
  );
};

export default SearchResultList;
