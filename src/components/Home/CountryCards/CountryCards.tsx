import { useLocation } from "react-router";
import styled from "styled-components";
import { useCountries } from "../../../hooks/useCountries";
import { Country } from "../../../types/types";
import Container from "../../../UI/Container";
import CountryCard from "./CountryCard";

const CountryCardsWrapper = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 20px;
  gap: 60px;

  @media screen and (max-width: 1200px) {
    gap: 20px;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 60px;
  }
`;

const ResultsInfo = styled.p`
  text-align: center;
  margin-top: 40px;
`;

const CountryCards = () => {
  const { data: countries } = useCountries();

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const pageNumber = +(queries.get("page_no") || 1);

  const data = pageNumber
    ? countries?.slice(pageNumber * 8 - 8, pageNumber * 8)
    : countries?.slice(0, 8);

  return (
    <>
      <CountryCardsWrapper>
        {data?.map((country: Country) => (
          <CountryCard
            key={country.name.common}
            country={{
              name: country.name.common,
              population: country.population,
              region: country.region,
              capital: country.capital[0],
              flags: country.flags,
            }}
          />
        ))}
      </CountryCardsWrapper>
      <ResultsInfo>{countries?.length} results found</ResultsInfo>
    </>
  );
};

export default CountryCards;
