import DrinkItem from './DrinkItem'; 

interface Drink {
  id: string;
  name: string;
  completed: boolean;
}

interface DrinkListProps {
  drinks: Drink[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks, onToggleComplete, onDelete }) => {
  return (
    <ul>
      {drinks.map((drink) => (
        <DrinkItem
          key={drink.id}
          drink={drink}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default DrinkList;