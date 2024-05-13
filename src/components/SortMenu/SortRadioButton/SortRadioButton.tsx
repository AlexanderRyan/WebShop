import { ChangeEvent } from "react";

type RadioButtonProps = {
  option: string;
  name: string;
  label: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const SortRadioButton = ({
  option,
  name,
  label,
  isChecked,
  onChange,
}: RadioButtonProps) => {
  return (
    <div className="input-container">
      <input
        id={option}
        type="radio"
        name={name}
        value={option}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={option}>{label}</label>
    </div>
  );
};

export default SortRadioButton;
