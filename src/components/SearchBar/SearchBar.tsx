import { ChangeEvent, FormEvent } from "react";
import "./SearchBarStyles.css";

type SearchBarProps = {
  searchQuery: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ searchQuery, onSearch, onSubmit }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          className="search-bar-input"
          type="search"
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search for products, categories, brands etc..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
