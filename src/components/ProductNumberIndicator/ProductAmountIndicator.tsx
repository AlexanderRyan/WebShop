import "./ProductAmountIndicatorStyles.css";

const ProductAmountIndicator = ({ amount }: { amount: number }) => {
  return (
    <div className="product-amount-indicator text-muted text-center">
      Showing {amount} / 100 items
    </div>
  );
};

export default ProductAmountIndicator;
