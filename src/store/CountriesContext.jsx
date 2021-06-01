import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const CountriesContext = createContext();

const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const region = queries.get("region");
  const searchInput = queries.get("search") || "";

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;"
      );
      const data = await response.json();

      setCountries(data);
      setIsLoading(false);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let data = countries.filter((country) => {
      const partOfRegion = region ? country.region === region : true;
      const partOfSearch = searchInput
        ? country.name.toLowerCase().search(searchInput.toLowerCase()) !== -1
        : true;

      return partOfRegion && partOfSearch;
    });

    setFilteredCountries(data);
  }, [countries, region, searchInput]);

  return (
    <CountriesContext.Provider value={[filteredCountries, isLoading]}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
