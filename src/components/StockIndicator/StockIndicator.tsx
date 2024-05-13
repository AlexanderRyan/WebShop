type StockIndicatorProps = {
  amount: number;
};
const StockIndicator = ({ amount }: StockIndicatorProps) => {
  return (
    <div>
      <p className="text-muted">
        <span
          className={`availability-indicator ${getAvailabilityColor(amount)}`}
        />
        {amount} in stock
      </p>
    </div>
  );
};

const getAvailabilityColor = (stock: number) => {
  if (stock >= 50) return "high-stock";
  else if (stock < 50 && stock >= 25) return "medium-stock";
  else return "low-stock";
};

export default StockIndicator;
