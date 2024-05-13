import { useNavigate } from "react-router-dom";

import Logo from "components/Logo/Logo";
import CartIcon from "assets/shopping_cart.svg";
import { useCart } from "context/reducers/cartReducer";

import "./HeaderStyles.css";

const Header = () => {
  const navigate = useNavigate();
  const onCartIconClick = () => navigate("/summary");

  const { cart } = useCart();

  return (
    <header className="nav-header">
      <Logo />
      <button
        className={`cart-icon-btn ${
          cart.totalProducts > 0 ? "visible" : "hidden"
        }`}
        onClick={onCartIconClick}
      >
        <img className="cart-icon" src={CartIcon} alt="Shopping cart icon" />
      </button>
    </header>
  );
};

export default Header;
