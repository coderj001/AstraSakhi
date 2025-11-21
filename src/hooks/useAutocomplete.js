import { useState, useCallback } from 'react';
import apiService from '../services/api';
import { debounce } from '../utils/debounce';

export const useAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (key) => {
    if (key.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiService.getCitySuggestions(key);
      setSuggestions(result.data || []);
    } catch (err) {
      setError(err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const onInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  const onSuggestionClick = (suggestion) => {
    setInputValue(`${suggestion.name}, ${suggestion.state}, ${suggestion.countryName}`);
    setSuggestions([]);
  };

  return {
    inputValue,
    suggestions,
    loading,
    error,
    onInputChange,
    onSuggestionClick,
  };
};
