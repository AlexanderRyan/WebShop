import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const onBackClick = () => navigate(-1);
  return (
    <button className="back-btn" onClick={onBackClick}>
      Back
    </button>
  );
};

export default BackButton;
