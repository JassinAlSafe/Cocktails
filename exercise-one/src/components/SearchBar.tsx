import { useState } from "react";
import axios from "axios";

interface SearchBarProps {
  onAddDrink: (drink: { id: string; name: string; completed: boolean }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddDrink }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = async () => {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    );
    const drink = response.data.drinks[0];
    if (drink) {
      onAddDrink({ id: drink.idDrink, name: drink.strDrink, completed: false });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Add new drink"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Add Drink</button>
    </div>
  );
};

export default SearchBar;
