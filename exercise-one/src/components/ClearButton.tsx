import React from "react";

interface ClearButtonProps {
  onClear: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return <button onClick={onClear}>Clear All</button>;
};

export default ClearButton;
