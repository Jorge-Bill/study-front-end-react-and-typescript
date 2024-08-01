import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

export interface Unit {
  unit: 'F' | 'C'
}

const WeatherList: React.FC = () => {
  const [unit, setUnit] = useState<Unit>({ unit: 'C' })
  const [favorites, setFavorites] = useState<Weather[]>([]);
  const [searchResults, setSearchResults] = useState<Weather[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searched = event.target.value.toLowerCase();
    setSearchValue(event.target.value);

    const filtered = weatherData.filter(city =>
      city.city.toLowerCase().includes(searched)
    );

    setSearchResults(filtered);
   };

  const handleClearSearch = () => { 
    setSearchResults([]);
    setSearchValue('')
  };

  const handleUnitChange = () => { 
    if (unit.unit === 'F') {
      setUnit({ unit: 'C' });

    } else {
      setUnit({ unit: 'F' });
    }
  };

  const handleAddFavorite = (cityId: number) => { 
    const cityToAdd = weatherData.find(city => city.id === cityId);

    if (cityToAdd && !favorites.some(fav => fav.id === cityId)) {
      setFavorites([...favorites, cityToAdd]);
    }
  };

  const handleRemoveFavorite = (cityId: number) => { 
    setFavorites(favorites.filter(city => city.id !== cityId));
  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
            value={searchValue}
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {(searchResults.length > 0 ? searchResults : weatherData).map((weather) => {
            const temperature = unit.unit === 'F' ? weather.temperature * 9 / 5 + 32 : weather.temperature;
            return (
              <WeatherCard
                key={weather.id}
                weather={{ ...weather, temperature }}
                unit={unit.unit}
                onAddFavorite={() => handleAddFavorite(weather.id)}
                onRemoveFavorite={() => handleRemoveFavorite(weather.id)}
                isFavorite={false}
              />
            );
          })}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {unit.unit === 'F' ? 'Celsius' : 'Fahrenheit'}
          </button>
        </section>
      </div>
      <h3>Favorite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
          {favorites.map((favorite) => {
            const temperature = unit.unit === 'F' ? favorite.temperature * 9 / 5 + 32 : favorite.temperature;
            return (
              <WeatherCard
                key={favorite.id}
                weather={{ ...favorite, temperature }}
                unit={unit.unit}
                onAddFavorite={() => handleAddFavorite(favorite.id)}
                onRemoveFavorite={() => handleRemoveFavorite(favorite.id)}
                isFavorite={true}
              />
            );
          })}
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
