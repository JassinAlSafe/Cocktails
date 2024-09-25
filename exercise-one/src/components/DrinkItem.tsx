import React from 'react';

interface Drink {
  id: string;
  name: string;
  completed: boolean;
}

interface DrinkItemProps {
  drink: Drink;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const DrinkItem: React.FC<DrinkItemProps> = ({ drink, onToggleComplete, onDelete }) => {
  return (
    <li>
      <span
        style={{ textDecoration: drink.completed ? 'line-through' : 'none' }}
        onClick={() => onToggleComplete(drink.id)}
      >
        {drink.name}
      </span>
      <button onClick={() => onDelete(drink.id)}>Delete</button>
    </li>
  );
};

export default DrinkItem;