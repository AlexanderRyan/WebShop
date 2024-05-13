import { Link } from "react-router-dom";

import { Product } from "types/types";
import StockIndicator from "components/StockIndicator/StockIndicator";

import "./ProductCardStyles.css";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`products/${product.id}`}>
      <div className="product-card-container">
        <div className="product-card-image-container">
          <img
            className="product-card-image"
            src={product.thumbnail}
            width={100}
            height={100}
            loading="lazy"
          />
        </div>

        <div className="product-card-details">
          <p className="product-card-title">
            {product.brand} - {product.title}
          </p>
          <div className="product-card-price-info">
            <span className="discount-label">
              <p>SALE: {product.discountPercentage} %</p>
            </span>
            <p className="price-large">${product.price}</p>
          </div>
          <StockIndicator amount={product.stock} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
