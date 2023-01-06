import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Country } from "../types/types";

export const useCountries = () => {
  const { data: countries, isLoading } = useQuery<Country[]>(
    ["countries"],
    () =>
      fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,"
      ).then((d) => d.json())
  );

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const region = queries.get("region");
  const searchInput = queries.get("search") || "";

  const data = countries?.filter((country) => {
    const isCountryPartOfRegion = region ? country.region === region : true;
    const isCountryPartOfSearchQuery = searchInput
      ? country.name.official
          .toLowerCase()
          .search(searchInput.toLowerCase()) !== -1
      : true;

    return isCountryPartOfRegion && isCountryPartOfSearchQuery;
  });

  return { data, isLoading };
};
