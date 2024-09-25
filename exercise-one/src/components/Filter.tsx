interface FilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("non-completed")}>Non-completed</button>
    </div>
  );
};

export default Filter;
