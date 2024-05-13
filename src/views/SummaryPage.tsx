import { useEffect } from "react";

import { addCart } from "api/index";
import BackButton from "components/BackButton/BackButton";
import { useCart, useCartDispatch } from "context/reducers/cartReducer";
import ConditionalRender from "components/ConditionalRender/ConditionalRender";

import "./SummaryPageStyles.css";

const SummaryPage = () => {
  const { cart, cartProducts } = useCart();
  const cartDispatch = useCartDispatch();

  // Adds a single quantity to the cart.
  const handleIncrement = (id: number) => () =>
    cartDispatch({ type: "ADD_TO_CART", payload: { id, quantity: 1 } });

  // Remove a single quantity from the cart.
  const handleDecrement = (id: number) => () =>
    cartDispatch({ type: "REMOVE_FROM_CART", payload: { id, quantity: 1 } });

  // Remove product entirely from the cart.
  const handleDelete = (id: number) => () =>
    cartDispatch({ type: "DELETE_PRODUCT", payload: id });

  // Update the cart state when the cart products are modidfied.
  useEffect(() => {
    const body = {
      merge: false,
      products: cartProducts,
    };

    addCart(body).then((res) =>
      cartDispatch({ type: "SET_CART", payload: res })
    );
  }, [cartProducts]);

  return (
    <div className="summary-page-container">
      <BackButton />
      <ConditionalRender
        predicate={cartProducts.length > 0}
        fallback={<div>Looks like your cart is empty!</div>}
      >
        <h1 className="text-center">Your cart</h1>
        <div className="summary-info-container">
          <h2 className="price-large">Total: ${cart.discountedTotal}</h2>
          <h2 className="price">
            Savings: ${cart.total - cart.discountedTotal}
          </h2>
          <p className="text-muted">
            Nr of products in cart: {cart.totalProducts}
          </p>
          <p className="text-muted">
            Total items in cart: {cart.totalQuantity}
          </p>
        </div>
        {cart.products.map((p) => (
          <div key={p.id} className="summary-list-container">
            <div className="list-item-thumbnail-container">
              <img className="list-item-thumbnail" src={p.thumbnail} />
            </div>
            <div className="list-details-container">
              <p className="text-bold">{p.title}</p>
              <span>
                <p className="text-bold">
                  Qty: <span className="text-muted">{p.quantity}</span>
                </p>
                <div className="product-qty-btns">
                  <div>
                    <button
                      className="qty-remove-btn"
                      disabled={p.quantity === 1}
                      onClick={handleDecrement(p.id)}
                    >
                      -
                    </button>
                    <button
                      className="qty-add-btn"
                      onClick={handleIncrement(p.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="qty-delete-btn"
                    onClick={handleDelete(p.id)}
                  >
                    Remove
                  </button>
                </div>
              </span>
            </div>
          </div>
        ))}
      </ConditionalRender>
    </div>
  );
};

export default SummaryPage;
