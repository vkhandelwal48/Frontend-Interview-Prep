import React, { useState, useEffect } from "react";

const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        try {
          const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
          const data = await res.json();
          setSuggestions(data.products);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        aria-label="Search products"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {suggestions.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};

export default AutoComplete;
