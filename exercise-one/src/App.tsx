import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header';
import DrinkList from './components/DrinkList';
import SearchBar from "./components/SearchBar";
import Filter from './components/Filter';
import ClearButton from './components/ClearButton';
import './App.css'

interface Drink {
  id: string;
  name: string;
  completed: boolean;
}

interface DrinkAPIResponse {
  drinks: { idDrink: string; strDrink: string }[];
}

const App: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get<DrinkAPIResponse>(
          'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
        );
        console.log(response.data.drinks);
        setDrinks(
          response.data.drinks.map((drink) => ({
            id: drink.idDrink,
            name: drink.strDrink,
            completed: false,
          }))
        );
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };
    fetchDrinks();
  }, []);

  const addDrink = (drink: Drink) => {
    if (drinks.some((d) => d.id === drink.id)) {
      alert('Drink already exists');
      return;
    }
    setDrinks([...drinks, drink]);
  };

  const toggleComplete = (id: string) => {
    setDrinks(
      drinks.map((drink) =>
        drink.id === id ? { ...drink, completed: !drink.completed } : drink
      )
    );
  };

  const deleteDrink = (id: string) => {
    setDrinks(drinks.filter((drink) => drink.id !== id));
  };

  const clearDrinks = () => {
    setDrinks([]);
  };

  const filteredDrinks = drinks.filter((drink) => {
    switch (filter) {
      case 'completed':
        return drink.completed;
      case 'non-completed':
        return !drink.completed;
      default:
        return true;
    }
  });

  return (
    <div>
      <Header />
      <SearchBar onAddDrink={addDrink} />
      <Filter filter={filter} setFilter={setFilter} />
      <DrinkList drinks={filteredDrinks} onToggleComplete={toggleComplete} onDelete={deleteDrink} />
      <ClearButton onClear={clearDrinks} />
    </div>
  );
};

export default App;

