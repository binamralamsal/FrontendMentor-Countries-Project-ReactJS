import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { CountriesContext } from "../../../store/CountriesContext";
import Container from "../../../UI/Container";
import CountryCard from "./CountryCard";

const CountryCardsWrapper = styled(Container)`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 60px;
`;

const CountryCards = () => {
  const [paginatedCountries, setPaginatedCountries] = useState([]);
  const countries = useContext(CountriesContext);

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const pageNumber = queries.get("page_no");

  useEffect(() => {
    let data = [...countries];

    if (pageNumber) data = data.slice(pageNumber * 8 - 8, pageNumber * 8);
    else data = data.slice(0, 8);
    setPaginatedCountries(data);
  }, [pageNumber, countries]);

  return (
    <CountryCardsWrapper>
      {paginatedCountries.map((country) => (
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
