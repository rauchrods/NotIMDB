import { type Dispatch, type SetStateAction } from "react";

type SearchProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="" />
        <input
          type="text"
          placeholder="Search throught Millions of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default Search;
