import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Container from "../../../UI/Container";
import CountryCard from "./CountryCard";
import { CountriesContext } from "../../../store/CountriesContext";

const CountryCardsWrapper = styled(Container)`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 60px;
`;

const CountryCards = (props) => {
  const [paginatedCountries, setPaginatedCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] =
    useContext(CountriesContext);
  const [countries, setCountries] = useState([]);

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const pageNumber = queries.get("page_no");
  const region = queries.get("region");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag;"
      );
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, [setCountries]);

  useEffect(() => {
    let data = [...countries];
    if (region) {
      data = countries.filter((country) => country.region === region);
    }
    setFilteredCountries(data);

    if (pageNumber) data = data.slice(pageNumber * 8 - 8, pageNumber * 8);
    else data = data.slice(0, 8);
    setPaginatedCountries(data);
  }, [pageNumber, countries, region]);

  return (
    <CountryCardsWrapper>
      {paginatedCountries.slice(0, 8).map((country) => (
        <CountryCard
          key={country.name}
          country={{
            name: country.name,
            population: country.population,
            region: country.region,
            capital: country.capital,
            flag: country.flag,
          }}
        />
      ))}
    </CountryCardsWrapper>
  );
};

export default CountryCards;
