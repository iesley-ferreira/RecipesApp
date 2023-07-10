import { useState } from 'react';

function SeachIcon() {
  const [showInput, setShowInput] = useState(false);

  const handleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="search">
      <button onClick={ handleInput }>
        {showInput && <input type="text" data-testid="search-input" />}
        <img src="searchIcon.svg" alt="search icon" data-testid="search-top-btn" />
      </button>
    </div>
  );
}

export default SeachIcon;
