import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({setLocationHandler}) {

  const [query, setQuery] = useState('');

  function handleClick() {
    console.log(query);
    setLocationHandler(query);
  }

  function keyPressCheck(event) {
    if (event.keyCode === 13) {
      setLocationHandler(query);
    }
  }

  return (
    <span className="searchbar">
      <input
        type="text"
        name="search"
        placeholder="Zoek een stad in Nederland"
        value={query}
        onKeyDown={keyPressCheck}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="button" onClick={handleClick}>
        Zoek
      </button>
    </span>
  );
};

export default SearchBar;
