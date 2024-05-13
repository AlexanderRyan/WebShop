import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { addCart } from "api/index";
import { CartBody } from "types/types";
import BackButton from "components/BackButton/BackButton";
import { useProducts } from "context/reducers/productReducer";
import StockIndicator from "components/StockIndicator/StockIndicator";
import { useCart, useCartDispatch } from "context/reducers/cartReducer";

import "./ProductDetailsPageStyles.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { cartProducts } = useCart();
  const cartDispatch = useCartDispatch();

  const product = products.find((p) => p.id === Number(id));

  // On add to cart click we update the state with the added product
  // and make a request to the cart api to get the cart.
  const onAddToCartClicked = () => {
    !!product &&
      cartDispatch({
        type: "ADD_TO_CART",
        payload: { id: product?.id, quantity: 1 },
      });
  };

  useEffect(() => {
    const body: CartBody = {
      merge: false,
      products: cartProducts,
    };

    addCart(body).then((res) =>
      cartDispatch({ type: "SET_CART", payload: res })
    );
  }, [cartProducts]);

  return (
    <div className="product-details-container">
      <BackButton />
      <div className="product-image-container">
        <img className="product-image" src={product?.thumbnail} />
      </div>
      <div className="product-info-container">
        <div className="product-info-top">
          <p>
            Category: <span className="text-muted">{product?.category}</span>
          </p>
          <StockIndicator amount={product?.stock!} />
        </div>

        <div className="product-title-brand">
          <h2>{product?.title}</h2>
          <h4 className="text-muted">{product?.brand}</h4>
        </div>

        <span className="discount-label">
          <p>{product?.discountPercentage} % OFF</p>
        </span>
        <p className="text-muted">
          Was ${getOriginalPrice(product?.price!, product?.discountPercentage!)}
        </p>
        <p className="price-large">NOW ${product?.price}</p>
        <p>{product?.description}</p>
      </div>
      <button className="add-to-cart-btn" onClick={onAddToCartClicked}>
        Add to cart
      </button>
    </div>
  );
};

const getOriginalPrice = (price: number, discount: number) =>
  Math.ceil((price * (100 + discount)) / 100);

export default ProductDetailsPage;
