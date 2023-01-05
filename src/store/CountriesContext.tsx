import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Country } from "../types/types";

export const CountriesContext = createContext<{
  filteredCountries: Country[];
  isLoading: boolean;
}>({
  filteredCountries: [],
  isLoading: true,
});

const CountriesProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const region = queries.get("region");
  const searchInput = queries.get("search") || "";

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,"
      );
      const data = (await response.json()) as Country[];

      setCountries(data);
      setIsLoading(false);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let data = countries.filter((country) => {
      const partOfRegion = region ? country.region === region : true;
      const partOfSearch = searchInput
        ? country.name.official
            .toLowerCase()
            .search(searchInput.toLowerCase()) !== -1
        : true;

      return partOfRegion && partOfSearch;
    });

    setFilteredCountries(data);
  }, [countries, region, searchInput]);

  return (
    <CountriesContext.Provider value={{ filteredCountries, isLoading }}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
