import { ChangeEvent, useState } from "react";

import { SORT_ORDERS } from "constants/index";
import { OnChangeType, SortOrder, SortType } from "types/types";
import SortRadioButton from "./SortRadioButton/SortRadioButton";

import "./SortMenuStyles.css";

type SortMenuProps = {
  sortOptions: string[];
  selectedOption: SortType;
  selectedOrder: SortOrder;
  onChange: (type: OnChangeType) => (e: ChangeEvent<HTMLInputElement>) => void;
};

const SortMenu = ({
  sortOptions,
  selectedOption,
  selectedOrder,
  onChange,
}: SortMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = () => setIsOpen(!isOpen);

  return (
    <div className="sort-menu">
      <button onClick={handleOnClick}>
        {isOpen ? "Hide filters" : "Show filters"}
      </button>
      <fieldset
        className={`expanding-menu ${isOpen ? "menu-open" : "menu-closed"}`}
      >
        <legend>Sort on:</legend>
        {sortOptions.map((option) => (
          <SortRadioButton
            key={option}
            option={option}
            name={"sort-type"}
            isChecked={selectedOption === option}
            label={option}
            onChange={onChange("change_type")}
          />
        ))}
        <div className="sort-order-group">
          <fieldset>
            <legend>Sort by:</legend>

            {SORT_ORDERS.map((option) => (
              <SortRadioButton
                key={option}
                option={option}
                isChecked={selectedOrder === option}
                name="sort-order"
                label={option === "ASC" ? "Low to high" : "High to low"}
                onChange={onChange("change_order")}
              />
            ))}
          </fieldset>
        </div>
      </fieldset>
    </div>
  );
};

export default SortMenu;
