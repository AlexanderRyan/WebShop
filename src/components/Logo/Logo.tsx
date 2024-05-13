import "./LogoStyles.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-image-container">
        <img
          className="logo-img"
          src="app_logo.png"
          alt="Store credit company logo"
        />
      </div>
      <div className="logo-heading-container">
        <h1 className="">StoreCredit.com</h1>
      </div>
    </div>
  );
};

export default Logo;
