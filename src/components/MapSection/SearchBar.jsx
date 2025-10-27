import React, { useRef, useEffect } from "react";

const SearchBar = ({ onLocationSelected }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      fields: ["geometry", "formatted_address", "name"],
      types: ["geocode"]
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      onLocationSelected({ lat, lng });
    });
  }, []);

  return (
    <div className="search-bar-wrapper">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search a location (e.g. Mamilla Jerusalem)"
        className="search-bar-input"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
