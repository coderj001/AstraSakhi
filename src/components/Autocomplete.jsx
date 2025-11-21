import React from 'react';

const Autocomplete = ({ suggestions, onInputChange, onSuggestionClick, inputValue, loading }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter birth place"
      />
      {loading && <div className="p-2">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => onSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.name}, {suggestion.state}, {suggestion.countryName}
            </li>
          ))}
        </ul>
      )}
      {!loading && suggestions.length === 0 && inputValue && (
        <div className="p-2">No results found</div>
      )}
    </div>
  );
};

export default Autocomplete;
